/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FORM_METHODS, RESPONSE_CODE } from "../../utils/helpers";
import { Encryption } from "../../utils/encryption";
import { State } from "../../types/state";
import { ROUTES } from "../../utils/routes";

export const baseUrl = import.meta.env.VITE_APP_BASE_URL;
export const userToken = () => {
  if (
    sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN) &&
    sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN)?.length
  ) {
    return JSON.parse(
      Encryption.decrypt(
        sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN) as string
      )
    );
  }
  sessionStorage.clear();
  window.location.href = ROUTES.HOMEPAGE;
  return;
};
type BaseQueryType = ReturnType<typeof fetchBaseQuery>;
export const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args, api, extraOptions) => {
    const result: any = await baseQuery(args, api, extraOptions);
    if (
      result.error &&
      result.error.status ===
        (RESPONSE_CODE.unAuthorized || RESPONSE_CODE.invalidToken)
    ) {
      sessionStorage.clear();
      window.location.href = ROUTES.HOMEPAGE;
    }
    return result;
  };
export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if (
      sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN) &&
      sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN)?.length
    ) {
      headers.set("Authorization", `Bearer ${userToken()}`);
      headers.set("Content-Type", "application/json");
      return headers;
    }
  },
});
export const globalApi = createApi({
  reducerPath: "globalApi",
  baseQuery: baseQueryWithReauth(baseQuery),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["GetData", "GetDialogueData"],
  endpoints: (builder) => ({
    getData: builder.query({
      query: (data) => {
        return {
          url: data.getUrl,
        };
      },
      providesTags: ["GetData"],
    }),
    getDialogueData: builder.query({
      query: (data) => {
        return {
          url: data.getUrl,
        };
      },
      providesTags: ["GetDialogueData"],
    }),
    getDataOnClick: builder.query({
      query: (data) => {
        return {
          url: data.getUrl,
        };
      },
    }),
    postData: builder.mutation({
      query: (data: State.AppState | any) => {
        return {
          url: data.postUrl,
          method: FORM_METHODS.POST,
          body: data.request,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "GetDialogueData", id: arg.id },
      ],
    }),
    updateData: builder.mutation({
      query: (data: State.AppState | any) => {
        return {
          url: data.postUrl,
          method: FORM_METHODS.PUT,
          body: data.request,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "GetData", id: arg.id },
      ],
    }),

    authPostData: builder.mutation({
      query: (data: State.AppState) => {
        return {
          url: data.postUrl,
          method: FORM_METHODS.POST,
          body: data.request,
        };
      },
    }),
  }),
});
export const {
  useGetDataQuery,
  useGetDialogueDataQuery,
  useLazyGetDialogueDataQuery,
  useLazyGetDataQuery,
  usePostDataMutation,
  useGetDataOnClickQuery,
  useLazyGetDataOnClickQuery,
  useUpdateDataMutation,
  useAuthPostDataMutation,
} = globalApi;
