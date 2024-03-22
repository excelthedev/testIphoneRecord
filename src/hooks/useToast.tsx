import { App } from "antd";

export const useToast = () => {
  const { notification } = App.useApp();
  const error = (message: string) => {
    notification.error({
      message: <span className="text-white">{`${message}`}</span>,
      placement: "topRight",
      className: "!bg-red-600 !text-white",
      //   icon: <img className="h-[25px] w-[25px]" src={errorIcon} alt="" />,
    });
  };
  const success = (message: string) => {
    notification.success({
      message: <span className="text-white">{`${message}`}</span>,
      placement: "topRight",
      className: "!bg-[#02C567] !text-white",
      //   icon: <img className="h-[25px] w-[25px]" src={successIcon} alt="" />,
    });
  };
  const warning = (message: string) => {
    notification.info({
      message: <span className="text-white">{`${message}`}</span>,
      placement: "topRight",
      className: "!bg-[#F47B23] !text-white",
      //   icon: <img className="h-[25px] w-[25px]" src={warningIcon} alt="" />,
    });
  };
  return { error, success, warning };
};
