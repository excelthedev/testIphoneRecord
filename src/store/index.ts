import {
  configureStore,
  combineReducers,
  Action,
  ThunkAction,
} from "@reduxjs/toolkit";
import { appReducer, setAllAppState, setAppState } from "./slice/app-slice";
import {
  globalApi,
  useAuthPostDataMutation,
  useGetDataQuery,
  usePostDataMutation,
  useUpdateDataMutation,
} from "./api/api.config";

const rootReducer = combineReducers({
  app: appReducer,
  [globalApi.reducerPath]: globalApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,

  devTools: import.meta.env.PROD === false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(globalApi.middleware);
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export {
  setAppState,
  setAllAppState,
  useAuthPostDataMutation,
  useGetDataQuery,
  usePostDataMutation,
  useUpdateDataMutation,
};
