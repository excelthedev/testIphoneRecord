import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { PageModal } from "../../../components/Modal";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import LangEasyLogo from "../../../assets/Logos/LangeasyLogo/LangEasyLogo";
import { ROUTES } from "../../../utils/routes";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessIcon from "../../../assets/icons/SuccessIcon";
import { formConfig } from "../../../utils/helpers";
import useFieldRequest from "../../../hooks/useFieldRequest";
import { useAppSelector } from "../../../store/hooks";
import SubmitButton from "../../../components/SubmitButton";
import { endpoints } from "../../../store/api/endpoints";
import { useUpdateDataMutation } from "../../../store";
import { useToast } from "../../../hooks/useToast";

const ResetPassword = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("token");
  const state = useAppSelector((state) => {
    return state.app;
  });
  const { setRequest } = useFieldRequest();
  const [form] = Form.useForm();
  const [updateDataHandler, result] = useUpdateDataMutation();
  const { error, success } = useToast();

  useEffect(() => {
    if (!paramValue) {
      navigate(ROUTES.HOMEPAGE, { replace: true });
    }
    if ("data" in result) {
      const apiResponse = result.data;
      if (apiResponse.responseCode === 200) {
        success(apiResponse.responseMessage);
        navigate(ROUTES.HOMEPAGE);
      } else {
        error(apiResponse.responseMessage);
      }
    }
  }, [result]);

  return (
    <>
      <Form
        {...formConfig}
        form={form}
        fields={[
          {
            name: "password",
            value: state.request?.password,
          },
          {
            name: "newPassword",
            value: state.request?.newPassword,
          },
        ]}
        onFinish={() =>
          updateDataHandler({
            postUrl: endpoints.auth.resetPassword,
            request: {
              resetToken: paramValue,
              password: state.request.password,
            },
          })
        }
      >
        <p className="font-[gilroy-medium] text-[#333333] font-normal text-2xl text-center mt-1 mb-6">
          Reset Password
        </p>
        <p className="font-[gilroy-medium] text-[#333333] font-normal text-lg text-center">
          Set a new password
        </p>
        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              New Password
            </span>
          }
          name={"password"}
          rules={[
            {
              required: true,
              message: "Password is required",
            },
            {
              min: 8,
              message: "Password must have a minimum length of 8",
            },
            {
              pattern: new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
              ),
              message:
                "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
            },
          ]}
        >
          <Input.Password
            className="w-full py-4 rounded-xl placeholder:font-[gilroy-regular] placeholder:font-normal placeholder:text-[#666666] placeholder:text-base"
            placeholder="Enter new password"
            onChange={(e) => {
              setRequest("password", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              Confirm Password
            </span>
          }
          name={"newPassword"}
        
          dependencies={["password"]}
        >
          <Input.Password
            className="w-full py-4 rounded-xl placeholder:font-[gilroy-regular] placeholder:font-normal placeholder:text-[#666666] placeholder:text-base"
            placeholder="Confirm new password"
            onChange={(e) => {
              setRequest("newPassword", e.target.value);
            }}
          />
        </Form.Item>

        <SubmitButton
          htmlType="submit"
          block
          form={form}
          loading={result.isLoading}
          name={
            <span className="font-[gilroy-medium] text-lg">Reset Password</span>
          }
        />
      </Form>
      <PageModal
        openModal={openModal}
        handleCancel={() => {
          setOpenModal(!openModal);
        }}
        modalFooter={null}
        closable={false}
        maskClosable={false}
        modalWith="60rem"
      >
        <div className="min-h-[25rem] grid ">
          <div className="flex flex-col items-center justify-center ">
            <LangEasyLogo />
            <p className=" font-[gilroy-medium] text-[1.5rem] text-[#333333]">
              Password Reset
            </p>
            <div className="flex flex-col items-center justify-center mt-5">
              <SuccessIcon />
              <p className=" font-[gilroy-medium] text-base text-[#333333] mt-3 font-normal">
                Your password has been successfully reset. Click below to log
                in.
              </p>
            </div>
          </div>
          <div
            className="flex items-center justify-center gap-3 cursor-pointer"
            onClick={() => {
              navigate(ROUTES.HOMEPAGE);
            }}
          >
            <ArrowIcon />
            <p className="font-[gilroy-regular] text-[#333333] font-normal">
              Back to log in
            </p>
          </div>
        </div>
      </PageModal>
    </>
  );
};

export default ResetPassword;
