import { apiClient } from "@/utils/axios";

const loginUser = {
    url: '/users/login'
}


export const authRepositories = {
    login: (data: any) =>  apiClient.postMethod({url: loginUser.url, data})
}