import { TRequestUpload } from "@/types/upload";
import { apiClient } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

const uploadVideo = {
  url: "/videos/upload",
};

export const uploadRepositories = {
  uploadVideo: (data: TRequestUpload, config?: AxiosRequestConfig<any>) =>
    apiClient.postMethod({ url: uploadVideo.url, data, config }),
};
