import { TReqUpdateAvatar } from "@/types/user";
import { apiClient } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

const updateAvatar = {
  url: "/images/updateAvatar",
};

export const profileRepositories = {
  updateAvatar: (data: TReqUpdateAvatar, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: updateAvatar.url, data, config }),
};
