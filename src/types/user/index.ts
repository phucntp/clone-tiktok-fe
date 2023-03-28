import { TMessage } from "../common";

export type TUser = {
  _id: string;
  username: string;
  avatar: string;
  email: string;
  birthday: string;
  bio: string;
  name: string;
  news_created: string[];
  news_liked: string[];
  users_followed: string[];
  users_following: string[];
};

export type TResListUser = TUser[];
export type TReqListUser = {
  page?: number;
  limit?: number;
  type?: number;
};
export type TReqUsername = {
  username?: string;
};
export type TReqFollowing = {
  idUserFollow?: string;
};

export type TResFollowing = TMessage;
export type TReqUpdateAvatar = {
  username: string;
  url: string;
};
export type TResUpdateAvatar = TMessage;
