import { apiClient } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

const loginUser = {
  url: "/users/login",
};

const registerUser = {
  url: "/users/register",
};

export const authRepositories = {
  login: (data: any, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: loginUser.url, data, config }),
  register: (data: any, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: registerUser.url, data, config }),
};
