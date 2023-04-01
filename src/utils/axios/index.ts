import axios, { AxiosRequestConfig } from "axios";

export type TGetCommonConfig = {
  url: string;
  config?: AxiosRequestConfig<any>;
};

export type TPostCommonConfig = {
  url: string;
  data?: any;
  config?: AxiosRequestConfig<any>;
};

const getMethod = (commonConfig: TGetCommonConfig) => {
  return axios.get(
    commonConfig.url.includes(process.env.NEXT_PUBLIC_API_BASE ?? "")
      ? commonConfig.url
      : process.env.NEXT_PUBLIC_API_BASE + commonConfig.url,
    {
      ...commonConfig.config,
      params: commonConfig.config?.params,
    }
  );
};

const postMethod = (commonConfig: TPostCommonConfig) => {
  return axios.post(
    process.env.NEXT_PUBLIC_API_BASE + commonConfig.url,
    commonConfig.data,
    commonConfig.config
  );
};

export const apiClient = {
  getMethod,
  postMethod,
};
