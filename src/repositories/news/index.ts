import { apiClient } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

const getNewsAll = {
  url: "/news/all",
};

export const newsRepositories = {
  getNewsAll: (config?: AxiosRequestConfig<any>) =>
    apiClient.getMethod({ url: getNewsAll.url, config }),
};
