import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import { formConfig } from "../../../utils/helpers";
import { useAppSelector } from "../../../store/hooks";
import useFieldRequest from "../../../hooks/useFieldRequest";
import SubmitButton from "../../../components/SubmitButton";
import useAuth from "../../../hooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => {
    return state.app;
  });

  const { setRequest } = useFieldRequest();
  const [form] = Form.useForm();
  const { onLogin, loading } = useAuth();

  return (
    <div className="flex flex-col justify-center gap-7">
      <div className=" flex  flex-col gap-6">
        <p className="font-[gilroy-medium] text-[#333333] font-normal text-xl text-center ">
          Welcome back
        </p>
        <p className="font-[gilroy-medium] text-[#333333] font-normal text-lg text-center">
          Login into your account
        </p>
      </div>
      <Form
        form={form}
        {...formConfig}
        onFinish={() => onLogin()}
        fields={[
          {
            name: "email",
            value: state.request?.email,
          },
          {
            name: "password",
            value: state.request?.password,
          },
        ]}
        className="w-full place-content-center gap-6 flex flex-col "
      >
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
        <Form.Item
          label={
            <span className="text-[#333333] text-base font-[gilroy-medium] font-normal">
              Password
            </span>
          }
          name={"password"}
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            className="w-full py-4 rounded-xl placeholder:font-[gilroy-regular] placeholder:font-normal placeholder:text-[#666666] placeholder:!text-base"
            placeholder="Enter your password"
            onChange={(e) => {
              setRequest("password", e.target.value);
            }}
          />
        </Form.Item>
        <div className="flex items-center justify-end whitespace-nowra ">
          <p
            className="text-[#333333] text-center text-sm sm:text-base font-[gilroy-medium] font-normal mt-[-1rem] cursor-pointer underline mb-4 "
            onClick={() => {
              navigate(ROUTES.FORGOT_PASSWORD);
            }}
          >
            Forget your password?
          </p>
        </div>

        <SubmitButton
          loading={loading}
          htmlType="submit"
          block
          form={form}
          name={<span className="font-[gilroy-medium] text-lg">Log in</span>}
        />

        <p className="font-[gilroy-regular] text-base font-medium text-center">
          Don't have an account?{"  "}
          <span
            className="font-[gilroy-bold] font-semibold cursor-pointer"
            onClick={() => {
              navigate(ROUTES.SIGNUP);
            }}
          >
            Sign up
          </span>
        </p>
      </Form>
    </div>
  );
};

export default Login;
