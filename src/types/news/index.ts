import { TMessage, TPagination } from "../common";

export type TNews = {
  _id: string;
  title: string;
  url: string;
  music: string;
  description: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  users_like: string[];
  users_share: string[];
  comments: string[];
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  width?: number;
  height?: number;
};

export type TResListNews = {
  listNews: TNews[];
  pagination: TPagination;
};
export type TResFavorite = TMessage;

export type TReqNews = {
  page?: number;
  limit?: number;
  currentPage?: number;
};
export type TReqId = {
  idNews?: string;
};
export type TReqFavorite = {
  idNews?: string;
};

export type TUrlVideo = {
  id: string;
  url: string;
};

export type TReqCreateNews = {
  title: string;
  music?: string;
  description?: string;
  tags?: string[];
  url: string;
  height: number;
  width: number;
};
