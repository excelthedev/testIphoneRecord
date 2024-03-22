/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAllAppState } from "../store/slice/app-slice";

const useFieldRequest = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.app;
  });
  const setRequest = useCallback(
    (key: string, value: any, options?: any[], key2?: string) => {
      dispatch(
        setAllAppState({
          ...state,
          request: {
            ...state.request,
            [key]: value,
            [key2?.length ? (key2 as string) : (undefined as any)]:
              options?.filter((x) => x?.id === value)[0]?.id,
          },
        })
      );
    },
    [dispatch, state]
  );

  return {
    setRequest,
  };
};

export default useFieldRequest;
