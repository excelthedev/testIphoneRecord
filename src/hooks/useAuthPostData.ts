/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useAuthPostDataMutation } from "../store";
import { useAppSelector } from "../store/hooks";

const useAuthPostData = () => {
const state = useAppSelector((state)=>{
  return state.app
})
  const [authPostData, result]: any = useAuthPostDataMutation();

  const onAuthPostData = useCallback(async (endpoint: string, request: any) => {
    await authPostData({
      ...state,
      postUrl: endpoint,
      request,
    });
  }, []);
  
  return { onAuthPostData, result }
};

export default useAuthPostData;
