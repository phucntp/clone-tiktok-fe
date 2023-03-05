import {
  initialStateForgotPassword,
  TStateForgotPassword,
} from "@/reducers/forgotPassword";
import { initialStateLogin, TStateLogin } from "@/reducers/login";
import { initialStateLogout, TStateLogout } from "@/reducers/logout";
import {
  initialStateRefreshToken,
  TStateRefreshToken,
} from "@/reducers/refreshToken";
import { initialStateRegister, TStateRegister } from "@/reducers/register";
import { authRepositories } from "@/repositories/auth";
import { TParamForgotPassword } from "@/types/forgotPassword";
import { TParamLogin } from "@/types/login";
import { TParamRegister } from "@/types/register";

const loginUser = async (data: TParamLogin): Promise<TStateLogin> => {
  const res = await authRepositories.login(data, { withCredentials: true });
  if (!res || res?.data) {
    return {
      ...initialStateLogin,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

const registerUser = async (data: TParamRegister): Promise<TStateRegister> => {
  const res = await authRepositories.register(data);
  if (!res || res?.data) {
    return {
      ...initialStateRegister,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

const forgotPasswordUser = async (
  data: TParamForgotPassword
): Promise<TStateForgotPassword> => {
  const res = await authRepositories.forgotPassword(data);
  if (!res || res?.data) {
    return {
      ...initialStateForgotPassword,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};
const logoutUser = async (): Promise<TStateLogout> => {
  const res = await authRepositories.logout();
  if (!res || res?.data) {
    return {
      ...initialStateLogout,
      hasError: true,
    };
  }
  return {
    hasError: false,
  };
};

const refreshTokenUser = async (): Promise<TStateRefreshToken> => {
  const res = await authRepositories.refreshToken();
  if (!res || res?.data) {
    return {
      ...initialStateRefreshToken,
      hasError: true,
    };
  }
  return {
    hasError: false,
  };
};

export const authServices = {
  loginUser,
  registerUser,
  forgotPasswordUser,
  logoutUser,
  refreshTokenUser,
};
