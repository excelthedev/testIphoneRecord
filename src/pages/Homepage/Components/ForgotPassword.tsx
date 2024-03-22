import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import EmailSentSuccessful from "../../../components/EmailSentSuccessful";
import { formConfig } from "../../../utils/helpers";
import useFieldRequest from "../../../hooks/useFieldRequest";
import { useAppSelector } from "../../../store/hooks";
import useAuthPostData from "../../../hooks/useAuthPostData";
import { useToast } from "../../../hooks/useToast";
import SubmitButton from "../../../components/SubmitButton";
import { endpoints } from "../../../store/api/endpoints";

const ForgotPassword = () => {
  const [openModal, setOpenModal] = useState(false);
  const state = useAppSelector((state) => {
    return state.app;
  });
  const { setRequest } = useFieldRequest();
  const { onAuthPostData, result } = useAuthPostData();
  const { error, success } = useToast();
  const [form] = Form.useForm();

  useEffect(() => {
    if ("data" in result) {
      const apiResponse = result.data;
      if (apiResponse.responseCode === 200) {
        success(apiResponse.responseMessage);
        setOpenModal(true);
      } else {
        error(apiResponse.responseMessage);
      }
    }
    if (result.isError) {
      error(result.error?.data?.responseMessage);
    }
  }, [result]);
  return (
    <>
      <Form
        {...formConfig}
        form={form}
        onFinish={() =>
          onAuthPostData(endpoints.auth.forgotPassword, state.request)
        }
      >
        <p className="font-[gilroy-medium] text-[#333333] font-normal text-2xl text-center mt-1 mb-6">
          Forgot Password
        </p>
        <p className="font-[gilroy-medium] text-[#333333] font-normal text-lg text-center">
          Enter your registered email to reset your password
        </p>
        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              Email
            </span>
          }
          name={"email"}
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input
            className="w-full py-4 rounded-xl placeholder:font-[gilroy-regular] placeholder:font-normal placeholder:text-[#666666] placeholder:text-base"
            placeholder="Enter your email address"
            onChange={(e) => {
              setRequest("email", e.target.value);
            }}
          />
        </Form.Item>

        <SubmitButton
          htmlType="submit"
          block
          form={form}
          loading={result.isLoading}
          name={
            <span className="font-[gilroy-medium] text-lg">
              Request a reset link
            </span>
          }
        />
      </Form>
      <EmailSentSuccessful openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default ForgotPassword;
