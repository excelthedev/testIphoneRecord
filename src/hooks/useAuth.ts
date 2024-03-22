/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useToast } from "./useToast";

import { useNavigate } from "react-router-dom";
import { Encryption } from "../utils/encryption";
import { ROUTES } from "../utils/routes";
import {
  // useLazyGetDataQuery,
  usePostDataMutation,
} from "../store/api/api.config";
import { useAppSelector } from "../store/hooks";
import { endpoints } from "../store/api/endpoints";
const useAuth = () => {
  const state = useAppSelector((state) => {
    return state.app;
  });
  const [authPostData, authPostDataResponse] = usePostDataMutation();
  // const [getUserData, getUserDataResponse] = useLazyGetDataQuery();
  const { error, success } = useToast();
  const navigate = useNavigate();
  const onLogin = useCallback(async () => {
    try {
      const response: any = await authPostData({
        ...state,
        postUrl: endpoints.auth.login,
        request: {
          email: state.request?.email,
          password: state.request?.password,
        },
      });

      if ("data" in response) {
        const apiResponse = response.data;
        if (apiResponse?.responseCode === 200) {
          success(apiResponse.responseMessage);
        }
        if (apiResponse?.responseCode !== 200) {
          error(apiResponse.responseMessage);
        } else {
          sessionStorage.setItem(
            import.meta.env.VITE_APP_TOKEN,
            Encryption.encrypt(apiResponse?.data?.token as string)
          );
          navigate(ROUTES.DASHBOARD, { replace: true });

          // try {
          //   const getUserInfo = await getUserData({
          //     ...state,
          //     getUrl: endpoints.user.getUserInfo,
          //   });
          //   if ("data" in getUserInfo) {
          //     const userResponse = getUserInfo.data;
          //     if (userResponse.responseCode === 200) {
          //       sessionStorage.setItem(
          //         import.meta.env.VITE_APP_USER_INFO,
          //         Encryption.encrypt(userResponse.data as any)
          //       );
          //       // success(userResponse.responseMessage);
          //       return navigate(ROUTES.DASHBOARD, {
          //         replace: true,
          //       });
          //     }
          //   }
          // } catch (err: any) {
          //   error(err?.message);
          // }
        }
      }
    } catch (err: any) {
      error(err?.message);
    }
  }, [authPostData, error, navigate, success]);
  return {
    onLogin,
    loading:
      authPostDataResponse.isLoading 
      // getUserDataResponse.isLoading ||
      // getUserDataResponse.isFetching,
  };
};
export default useAuth;
