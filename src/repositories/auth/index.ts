import { TParamForgotPassword } from "@/types/forgotPassword";
import { TParamLogin } from "@/types/login";
import { TParamRegister } from "@/types/register";
import { apiClient } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

const loginUser = {
  url: "/users/login",
};

const registerUser = {
  url: "/users/register",
};

const forgotPasswordUser = {
  url: "/users/forgot-password",
};

const logoutUser = {
  url: "/users/logout",
};

const refreshToken = {
  url: "/users/refresh-token",
};

export const authRepositories = {
  login: (data: TParamLogin, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: loginUser.url, data, config }),
  register: (data: TParamRegister, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: registerUser.url, data, config }),
  forgotPassword: (
    data: TParamForgotPassword,
    config?: AxiosRequestConfig<any>
  ) => apiClient.postMethod({ url: forgotPasswordUser.url, data, config }),
  logout: (config?: AxiosRequestConfig<any>) =>
    apiClient.getMethod({ url: logoutUser.url, config }),
  refreshToken: (config?: AxiosRequestConfig<any>) =>
    apiClient.getMethod({ url: refreshToken.url, config }),
};
