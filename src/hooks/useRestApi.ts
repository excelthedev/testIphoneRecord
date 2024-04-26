import { globalApi } from "../store/api/api.config";
import { useAppDispatch } from "../store/hooks";

export const useResetApiState = () => {
  const dispatch = useAppDispatch();

  return () => dispatch(globalApi.util.resetApiState());
};
