import { authRepositories } from "@/repositories/auth";
import { TParamLogin } from "@/types/login";


const loginUser = async (data: TParamLogin) => {
    const res = await authRepositories.login(data);
    if (res instanceof Error) {
      throw res;
    }
    return res.data;
  };

  export const authServices = {
    loginUser,
  };