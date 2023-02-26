import axios, { AxiosRequestConfig } from "axios"

type TGetCommonConfig = {
    url: string,
    config?: AxiosRequestConfig<any>
}

type TPostCommonConfig = {
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>
}

const getMethod = (commonConfig: TGetCommonConfig) => {
    return axios.get(process.env.NEXT_PUBLIC_API_BASE + commonConfig.url, {params: commonConfig.config?.params})
}

const postMethod = (commonConfig: TPostCommonConfig) => {
    return axios.post(process.env.NEXT_PUBLIC_API_BASE + commonConfig.url, commonConfig.data)
}

export const apiClient = {
    getMethod,
    postMethod
}