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
    return axios.get(commonConfig.url, {params: commonConfig.config?.params})
}

const postMethod = (commonConfig: TPostCommonConfig) => {
    console.log('http://localhost:4000/api' + commonConfig.url, 'url')
    return axios.post('http://localhost:4000/api' + commonConfig.url, commonConfig.data)
}

export const apiClient = {
    getMethod,
    postMethod
}