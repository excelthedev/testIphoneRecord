/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProps } from "antd";
import { jwtDecode } from "jwt-decode";
import { Encryption } from "./encryption";

export type FORM_ACTION =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "READ"
  | "GET_DATA_BY_POST_METHOD";

export const formConfig: FormProps = {
  autoComplete: "off",
  layout: "vertical",
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  // requiredMark: "optional",
};

export const FORM_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const decodedToken: any = () => {
  try {
    return jwtDecode(
      Encryption.decrypt(
        sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN) as string
      )
    );
  } catch (error) {
    window.location.href = "/";
    sessionStorage.clear();
  }
};
export const RESPONSE_CODE = {
  successful: 200, //calling right endpint with right endpoint and datafound
  badRequest: 400, //when accessing wrong url or using wrong method or not passing needed parameters
  noData: 201, //calling right url with right method but data requested not exist e.g trying sign up with wrong username and password
  internalServerError: 500, //whenever itself is having issues
  dataDuplication: 230, //duplicated data
  unAuthorized: 401, //unatorized user trying to use protected routes
  invalidToken: 403,
};
