import { useCallback } from "react";
import { setAllAppState } from "../store/slice/app-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
const useSetRequest = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.app;
  });
  const setFieldChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key: string, value: any) => {
      dispatch(
        setAllAppState({
          ...state,
          request: {
            ...state.request,
            [key]: value,
          },
        })
      );
    },
    [dispatch, state]
  );
  return {
    setFieldChange,
  };
};

export default useSetRequest;
