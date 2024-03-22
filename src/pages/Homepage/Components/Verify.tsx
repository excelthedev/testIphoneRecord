import SuccessIcon from "../../../assets/icons/SuccessIcon";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetDataQuery } from "../../../store";
import { endpoints } from "../../../store/api/endpoints";
import { Spin } from "antd";
import { ROUTES } from "../../../utils/routes";
import Button from "../../../components/Button";
import { useToast } from "../../../hooks/useToast";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("userid");
  const { data, isLoading, isFetching, isSuccess } = useGetDataQuery({
    getUrl: `${endpoints.auth.verifyUser}/${paramValue}`,
  });

  const { error, success } = useToast();

  useEffect(() => {
    if (!paramValue) {
      navigate(ROUTES.HOMEPAGE, { replace: true });
    }
    if (isSuccess) {
      success(data?.responseMessage);
    }
    if (data?.isError) {
      error(data?.responseMessage);
    }
  }, [data, isSuccess, navigate, paramValue]);

  return (
    <Spin spinning={isLoading || isFetching}>
      {isSuccess === true && (
        <div className="flex flex-col items-center justify-center min-h-[100svh] font-[gilroy-medium] text-base text-[#333333] ">
          <SuccessIcon />
          <p className="my-4">{data?.responseMessage}</p>
          <Button
            onClick={() => {
              navigate(ROUTES.HOMEPAGE, { replace: true });
            }}
            className="!mt-4 bg-[#3483A7] text-white"
          >
            Proceed to Login
          </Button>
        </div>
      )}
    </Spin>
  );
};

export default Verify;
