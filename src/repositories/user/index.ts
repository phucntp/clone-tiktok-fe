import { TReqFollowing } from "@/types/user";
import { apiClient } from "@/utils/axios";
import { replaceString } from "@/utils/common/string";
import { AxiosRequestConfig } from "axios";

const getListUser = {
  url: "/users/all",
};

const getUsername = {
  url: "/users/:username",
};

const followingUser = {
  url: "users/favorite",
};

export const userRepositories = {
  getListUser: (config?: AxiosRequestConfig<any>) =>
    apiClient.getMethod({ url: getListUser.url, config }),
  getUsername: (pathParams: string, config?: AxiosRequestConfig<any>) =>
    apiClient.getMethod({
      url: replaceString(getUsername.url, ":username", pathParams),
      config,
    }),
  followingUser: (data: TReqFollowing, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: followingUser.url, data, config }),
};
