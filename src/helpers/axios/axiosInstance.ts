import { authKey } from "@/constants/authkey";
import { TErrorResponse, TSuccessResponse } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 6000;

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const responseObject: TSuccessResponse = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };

    return responseObject;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const responseObject: TErrorResponse = {
      success: false,
      statusCode: error?.response?.status || 500,
      message: error?.response?.data?.message,
      errorDetails: error?.response?.data?.errorDetails,
    };

    return Promise.reject(responseObject);
  }
);

export { instance };
