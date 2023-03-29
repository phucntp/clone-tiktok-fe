import { initStateFollowing, TStateFollowing } from "@/reducers/followingUser";
import { initStateListUser, TStateListUser } from "@/reducers/listUser";
import { initStateUser, TStateUser } from "@/reducers/user";
import { userRepositories } from "@/repositories/user";
import { TReqFollowing, TReqListUser, TReqUsername } from "@/types/user";

const getListUser = async (params: TReqListUser): Promise<TStateListUser> => {
  const res = await userRepositories.getListUser({ params });
  if (!res || !res?.data) {
    return {
      ...initStateListUser,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data.users,
    pagination: res.data.pagination,
  };
};

const getUsername = async (params: TReqUsername): Promise<TStateUser> => {
  const res = await userRepositories.getUsername(params.username ?? "");
  if (!res || !res?.data) {
    return {
      ...initStateUser,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

const followingUser = async (data: TReqFollowing): Promise<TStateFollowing> => {
  const res = await userRepositories.followingUser(data);
  if (!res || !res?.data) {
    return {
      ...initStateFollowing,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

export const userServices = {
  getListUser,
  getUsername,
  followingUser,
};
