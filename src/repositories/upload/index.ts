import { TRequestUpload } from "@/types/upload";
import { apiClient } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

const uploadVideo = {
  url: "/videos/upload",
};

const uploadImage = {
  url: "/images/upload",
};

export const uploadRepositories = {
  uploadVideo: (data: TRequestUpload, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: uploadVideo.url, data, config }),
  uploadImage: (data: TRequestUpload, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: uploadImage.url, data, config }),
  getVideo: (url: string, config?: AxiosRequestConfig<any>) =>
    apiClient.getMethod({
      url,
      config,
    }),
  getImage: (url: string, config?: AxiosRequestConfig<any>) =>
    apiClient.getMethod({
      url,
      config,
    }),
};
