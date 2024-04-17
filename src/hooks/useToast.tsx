import { App } from "antd";
import ErrorIcon from "../assets/icons/ErrorIcon";
import SuccessRecordIcon from "../assets/icons/SuccessRecordIcon";

export const useToast = () => {
  const { notification } = App.useApp();
  const error = (message: string) => {
    notification.error({
      message: (
        <span className="text-[#EC1E1E] ml-6 sm:text-sm md:text-[18px] font-light absolute top-[40%] ">{`${message}`}</span>
      ),
      placement: "topRight",
      className:
        "!bg-white !text-white font-[gilroy-medium] h-[90px] rounded-md relative",
      //   icon: <img className="h-[25px] w-[25px]" src={errorIcon} alt="" />,
      icon: <ErrorIcon />,
    });
  };
  const success = (message: string) => {
    notification.success({
      message: (
        <span className="text-[#5EDC11] ml-6 sm:text-sm md:text-[18px] font-light absolute top-[40%]">{`${message}`}</span>
      ),
      placement: "topRight",
      className:
        "!bg-white !text-white font-[gilroy-medium] h-[90px] rounded-md relative",
      icon: <SuccessRecordIcon />,

      //   icon: <img className="h-[25px] w-[25px]" src={successIcon} alt="" />,
    });
  };
  const warning = (message: string) => {
    notification.info({
      message: (
        <span className="text-[#F47B23] ml-6 sm:text-sm md:text-[15px] font-light absolute top-[30%] mr-[3rem]">{`${message}`}</span>
      ),
      placement: "topRight",
      className:
        " !bg-white !text-white font-[gilroy-medium] min-h-[102px] rounded-md relative",

      //   icon: <img className="h-[25px] w-[25px]" src={warningIcon} alt="" />,
    });
  };
  return { error, success, warning };
};
