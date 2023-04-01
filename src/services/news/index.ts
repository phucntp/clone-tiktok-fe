import { initStateCreateNews, TStateCreateNews } from "@/reducers/createNews";
import { initialStateFavorite, TStateFavorite } from "@/reducers/favoriteNews";
import { TStateListNews, initialStateListNews } from "@/reducers/listNews";
import { initialStateNews, TStateNews } from "@/reducers/news";
import { newsRepositories } from "@/repositories/news";
import { TReqCreateNews, TReqFavorite, TReqId, TReqNews } from "@/types/news";

const getNewsAll = async (params: TReqNews): Promise<TStateListNews> => {
  const res = await newsRepositories.getNewsAll({ params });
  if (!res || !res?.data) {
    return {
      ...initialStateListNews,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data.listNews,
    indexVideo: 0,
    pagination: res.data.pagination,
    dataNew: res.data.listNews,
  };
};

const getNewsId = async (params: TReqId): Promise<TStateNews> => {
  const res = await newsRepositories.getNewsId(params.idNews ?? "");
  if (!res || !res?.data) {
    return {
      ...initialStateNews,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

const favoriteNews = async (data: TReqFavorite): Promise<TStateFavorite> => {
  const res = await newsRepositories.favoriteNews(data);
  if (!res || !res?.data) {
    return {
      ...initialStateFavorite,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

const createdNews = async (data: TReqCreateNews): Promise<TStateCreateNews> => {
  const res = await newsRepositories.createNews(data);
  if (!res || !res?.data) {
    return {
      ...initStateCreateNews,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
  };
};

export const newsServices = {
  getNewsId,
  getNewsAll,
  favoriteNews,
  createdNews,
};
