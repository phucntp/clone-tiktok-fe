import {
    AxiosRequestCustomConfig,
    OtherRequestParameter,
    OtherResponse,
    ReadDetailRequestParameter,
    ReadDetailResponse,
  } from 'shared/dist/lib/axios';
  import { apiClient } from '@/di';
  import { LoggedInResponse } from '@/presentation/types';
  
  const loginDummy: AxiosRequestCustomConfig<
    ReadDetailRequestParameter<LoggedInResponse, {}>,
    ReadDetailResponse<LoggedInResponse, {}>
  > = {
    url: `login/:id`,
    useMock: false,
  };
  
  const logout: AxiosRequestCustomConfig<OtherRequestParameter, OtherResponse> = {
    url: 'logout',
    useMock: false,
  };
  
  const loginAuto: AxiosRequestCustomConfig<OtherRequestParameter, OtherResponse> = {
    url: 'autoLogin',
    useMock: false,
  };
  
  const selectLogin: AxiosRequestCustomConfig<OtherRequestParameter, OtherResponse> = {
    url: '/selectLogin',
    useMock: false,
  };
  
  const loginNikkei: AxiosRequestCustomConfig<OtherRequestParameter, OtherResponse> = {
    url: '/loginNikkei',
    useMock: false,
  };
  const authVerify: AxiosRequestCustomConfig<OtherRequestParameter, OtherResponse> = {
    url: 'authVerify',
    useMock: false,
  };
  const authVerifyLoginNikkei: AxiosRequestCustomConfig<OtherRequestParameter, OtherResponse> = {
    url: 'authVerify/verifyLoginNikkei',
    useMock: false,
  };
  
  export const authRepositories = {
    loginDummy: apiClient.getDetailFn(loginDummy),
    logout: apiClient.postOtherFn(logout),
    loginAuto: apiClient.postOtherFn(loginAuto),
    selectLogin: apiClient.postOtherFn(selectLogin),
    loginNikkei: apiClient.postOtherFn(loginNikkei),
    authVerify: apiClient.postOtherFn(authVerify),
    authVerifyLoginNikkei: apiClient.postOtherFn(authVerifyLoginNikkei),
  };
  
  