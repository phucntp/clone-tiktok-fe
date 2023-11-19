import { TReqCreateNews, TReqFavorite } from "@/types/news";
import { apiClient } from "@/utils/axios";
import { replaceString } from "@/utils/common/string";
import { AxiosRequestConfig } from "axios";

const getNewsAll = {
  url: "/news/all",
};

const getNewsId = {
  url: "/news/:id",
};

const favoriteNews = {
  url: "/news/favorite",
};

const createNews = {
  url: "/news/create",
};

export const newsRepositories = {
  getNewsAll: (config?: AxiosRequestConfig<any>) =>
    apiClient.getMethod({ url: getNewsAll.url, config }),
  getNewsId: (pathParams: string, config?: AxiosRequestConfig<any>) =>
    apiClient.getMethod({
      url: replaceString(getNewsId.url, ":id", pathParams),
      config,
    }),
  favoriteNews: (data: TReqFavorite, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: favoriteNews.url, data, config }),
  createNews: (data: TReqCreateNews, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: createNews.url, data, config }),
};
