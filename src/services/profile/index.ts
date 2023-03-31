import {
  initialStateUpdateAvatar,
  TStateUpdateAvatar,
} from "@/reducers/updateAvatar";
import { profileRepositories } from "@/repositories/profile";
import { TReqUpdateAvatar } from "@/types/user";

const updateProfile = async (
  data: TReqUpdateAvatar
): Promise<TStateUpdateAvatar> => {
  const res = await profileRepositories.updateAvatar(data);
  if (!res || !res?.data) {
    return {
      ...initialStateUpdateAvatar,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

export const profileServices = {
  updateProfile,
};
