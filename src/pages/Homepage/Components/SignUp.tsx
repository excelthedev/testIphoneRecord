import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Popover,
  Radio,
  Select,
} from "antd";
import { ROUTES } from "../../../utils/routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formConfig } from "../../../utils/helpers";
import SubmitButton from "../../../components/SubmitButton";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { endpoints } from "../../../store/api/endpoints";
import EmailSentSuccessful from "../../../components/EmailSentSuccessful";
import Term from "./Term";
import useFieldRequest from "../../../hooks/useFieldRequest";
import { useAppSelector } from "../../../store/hooks";
import useAuthPostData from "../../../hooks/useAuthPostData";
import { useToast } from "../../../hooks/useToast";
import GrayChecker from "../../../assets/icons/GrayChecker";
import GreenChecker from "../../../assets/icons/GreenChecker";
import RedChecker from "../../../assets/icons/RedChecker";
import { useGetDataQuery } from "../../../store/api/api.config";

type statesType = {
  id: number;
  iso2: string;
  name: string;
}[];

const SignUp = () => {
  const { data } = useGetDataQuery({
    getUrl: endpoints.auth.accent,
  });

  const [states, setStates] = useState<statesType>([]);

  const state = useAppSelector((state) => {
    return state.app;
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setRequest } = useFieldRequest();

  const [openTermModal, setOpenTermModal] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [getStatesLoading, setGetStatesIsLoading] = useState<boolean>(false);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().startOf("day");
  };
  const { onAuthPostData, result } = useAuthPostData();
  const { error, success } = useToast();

  useEffect(() => {
    if ("data" in result) {
      const apiResponse = result.data;
      if (apiResponse.responseCode === 200) {
        success(apiResponse.responseMessage);
        setOpenSuccessModal(true);
      } else {
        error(apiResponse.responseMessage);
      }
    }
    if (result.isError) {
      error(result.error?.data?.responseMessage);
    }
  }, [result]);

  const headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "S3k2QzhWQ294QUh1clV2dW1BdzdtZGtNS0JZb0REblBLMU12S1pRZQ=="
  );
  const countryBaseUrl = "https://api.countrystatecity.in/v1/countries";
  const getStates = async () => {
    if (!navigator.onLine) return;
    try {
      setGetStatesIsLoading(true);
      const response = await fetch(`${countryBaseUrl}/${"NG"}/states`, {
        method: "GET",
        headers: headers,
        redirect: "follow",
      });
      const result = await response.json();
      setStates(result);
      setGetStatesIsLoading(false);
    } catch (error) {
      setGetStatesIsLoading(false);
      return console.log("error", error);
    }
  };
  useEffect(() => {
    getStates();
  }, [result]);

  const contentData = [
    {
      text: "Minimum number of characters: 8",
      img:
        state?.request?.password === "" ? (
          <GrayChecker />
        ) : state?.request?.password === undefined ? (
          <GrayChecker />
        ) : state?.request?.password.length > 7 ? (
          <GreenChecker />
        ) : (
          <RedChecker />
        ),
    },
    {
      text: "Contains a capital letter",
      img:
        state?.request?.password === "" ? (
          <GrayChecker />
        ) : state?.request?.password === undefined ? (
          <GrayChecker />
        ) : state?.request?.password.match(/[A-Z]/) ? (
          <GreenChecker />
        ) : (
          <RedChecker />
        ),
    },

    {
      text: "Contains a lowercase letter",
      img:
        state?.request?.password === "" ? (
          <GrayChecker />
        ) : state?.request?.password === undefined ? (
          <GrayChecker />
        ) : state?.request?.password.match(/[a-z]/) ? (
          <GreenChecker />
        ) : (
          <RedChecker />
        ),
    },
    {
      text: "Contains a number",
      img:
        state?.request?.password === "" ? (
          <GrayChecker />
        ) : state?.request?.password === undefined ? (
          <GrayChecker />
        ) : state?.request?.password.match(/\d/) ? (
          <GreenChecker />
        ) : (
          <RedChecker />
        ),
    },
    {
      text: "Includes a special character",
      img:
        state?.request?.password === "" ? (
          <GrayChecker />
        ) : state?.request?.password === undefined ? (
          <GrayChecker />
        ) : state?.request?.password.match(
            /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/
          ) ? (
          <GreenChecker />
        ) : (
          <RedChecker />
        ),
    },
  ];
  const content = (
    <div className="grid gap-3">
      {contentData.map((item, index) => (
        <span key={index} className="flex items-center gap-3">
          {item.img}
          <p>{item.text}</p>
        </span>
      ))}
    </div>
  );

  return (
    <div>
      {openSuccessModal && (
        <EmailSentSuccessful
          openModal={openSuccessModal}
          setOpenModal={setOpenSuccessModal}
          message="A verification mail has been sent to your email."
        />
      )}

      {openTermModal && (
        <Term openModal={openTermModal} setOpenModal={setOpenTermModal} />
      )}

      <Form
        scrollToFirstError={true}
        form={form}
        {...formConfig}
        onFinish={() =>
          onAuthPostData(endpoints.auth.register, {
            firstname: state.request?.firstname,
            lastname: state.request?.lastname,
            email: state.request?.email,
            password: state.request?.password,
            gender: state.request?.gender,
            accent: state.request?.accent,
            tribe: state.request?.tribe,
            ethnicity: state.request?.ethnicity,
            consent: state.request?.consent,
            dateOfBirth: state.request?.dateOfBirth,
          })
        }
        fields={[
          {
            name: "firstname",
            value: state.request?.firstname,
          },
          {
            name: "lastname",
            value: state.request?.lastname,
          },
          {
            name: "email",
            value: state.request?.email,
          },
          {
            name: "password",
            value: state.request?.password,
          },
          {
            name: "gender",
            value: state.request?.gender,
          },
          {
            name: "accent",
            value: state.request?.accent,
          },
          {
            name: "tribe",
            value: state.request?.tribe,
          },
          {
            name: "ethnicity",
            value: state.request?.ethnicity,
          },
          {
            name: "consent",
            value: state.request?.consent,
          },
        ]}
      >
        <p className="font-[gilroy-medium] text-[#333333] font-normal text-2xl text-center mt-1 mb-6">
          Create your account
        </p>
        <p className="font-[gilroy-medium] text-[#333333] font-normal text-lg text-center">
          Sign up with your email address
        </p>
        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              First name
            </span>
          }
          name={"firstname"}
          rules={[{ required: true, message: "First name is required" }]}
        >
          <Input
            className="w-full py-4 rounded-xl placeholder:font-[gilroy-regular] placeholder:font-normal placeholder:text-[#666666] placeholder:text-base"
            placeholder="Enter your first name"
            onChange={(e) => {
              setRequest("firstname", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              Last name
            </span>
          }
          name={"lastname"}
          rules={[{ required: true, message: "Last name is required" }]}
        >
          <Input
            className="w-full py-4 rounded-xl placeholder:font-[gilroy-regular] placeholder:font-normal placeholder:text-[#666666] placeholder:text-base"
            placeholder="Enter your last name"
            onChange={(e) => {
              setRequest("lastname", e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              Email
            </span>
          }
          name={"email"}
          hasFeedback
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
        <Popover content={content} trigger="hover" placement="top">
          <Form.Item
            hasFeedback
            label={
              <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
                Password
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
              placeholder="Enter your password"
              onChange={(e) => {
                setRequest("password", e.target.value);
              }}
            />
          </Form.Item>
          <p className=" font-[gilroy-regular] text-[#666666] mt-[-1rem]">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
        </Popover>

        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              What's your gender?
            </span>
          }
          rules={[
            {
              required: true,
              message: "Gender is required",
            },
          ]}
          name={"gender"}
        >
          <Radio.Group
            onChange={(e) => {
              setRequest("gender", e.target.value);
            }}
          >
            <Radio
              className="font-[gilroy-medium] text-base font-normal  "
              value={"female"}
            >
              Female
            </Radio>
            <Radio
              className="font-[gilroy-medium] text-base font-normal "
              value={"male"}
            >
              Male
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              What's your date of birth?
            </span>
          }
          name={"dateOfBirth"}
          rules={[{ required: true, message: "Date of birth is required" }]}
        >
          <DatePicker
            size="large"
            className="w-full !py-4"
            onChange={(_, e) => {
              setRequest("dateOfBirth", e);
            }}
            disabledDate={disabledDate}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              Accent
            </span>
          }
          name="accent"
          rules={[{ required: true, message: "Please select your accent" }]}
        >
          <Select
            placeholder="Select your accent"
            onChange={(value) => {
              setRequest("accent", value);
            }}
          >
            {data?.data.map((accent: string, index: number) => (
              <Select.Option key={index} value={accent}>
                {accent}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              Tribe
            </span>
          }
          name={"tribe"}
          rules={[{ required: true, message: "Tribe is required" }]}
        >
          <Select
            placeholder="Select your tribe"
            onChange={(e) => {
              setRequest("tribe", e);
            }}
          >
            <Select.Option>Select your tribe</Select.Option>
            <Select.Option value="yoruba">Yoruba</Select.Option>
            <Select.Option value="hausa">Hausa</Select.Option>
            <Select.Option value="igbo">Igbo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              Ethnicity
            </span>
          }
          name={"ethnicity"}
          rules={[{ required: true, message: "Ethnicity is required" }]}
        >
          <Input
            className="w-full py-4 rounded-xl placeholder:font-[gilroy-regular] placeholder:font-normal placeholder:text-[#666666] placeholder:text-base"
            placeholder="Enter your ethnicity e.g Calabar, Fulani, Ijebu"
            onChange={(e) => {
              setRequest("ethnicity", e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name={"consent"}
          rules={[
            { required: true, message: "Please accept terms and condition" },
          ]}
        >
          <div className="flex items-center justify-center w-full gap-4">
            <Checkbox
              id="accept"
              checked={state.request?.consent === true}
              onChange={(e) => {
                setRequest("consent", e.target.checked);
              }}
            />
            <p className=" font-[gilroy-regular] text-[#666666] font-medium text-base">
              By creating an account, you agree to the{" "}
              <span
                className="underline font-[gilroy-medium] text-black cursor-pointer"
                onClick={() => {
                  setOpenTermModal(true);
                }}
              >
                Terms of use/Privacy Policy
              </span>
            </p>
          </div>
        </Form.Item>

        <SubmitButton
          htmlType="submit"
          block
          form={form}
          loading={result.isLoading}
          name={<span className="font-[gilroy-medium] text-lg">Sign up</span>}
        />
        <p className="font-[gilroy-regular] text-base font-medium text-center">
          Already have an account?{"  "}
          <span
            className="font-[gilroy-bold] font-semibold cursor-pointer"
            onClick={() => {
              navigate(ROUTES.HOMEPAGE);
            }}
          >
            Log in
          </span>
        </p>
      </Form>
    </div>
  );
};

export default SignUp;
