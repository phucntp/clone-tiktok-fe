import { initialState, TState } from "@/reducers/login";
import { authRepositories } from "@/repositories/auth";
import { TParamLogin } from "@/types/login";

const loginUser = async (data: TParamLogin) : Promise<TState> => {
    const res = await authRepositories.login(data);
    if (!res || res?.data) {
      return {
        ...initialState,
        hasError: true,
      };
    }
    return {
      hasError: false,
      data: res.data
    };
  };

  export const authServices = {
    loginUser,
  };