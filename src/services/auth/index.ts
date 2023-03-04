import { initialStateLogin, TStateLogin } from "@/reducers/login";
import { initialStateRegister, TStateRegister } from "@/reducers/register";
import { authRepositories } from "@/repositories/auth";
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
  const res = await authRepositories.register(data, { withCredentials: true });
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

export const authServices = {
  loginUser,
  registerUser,
};
