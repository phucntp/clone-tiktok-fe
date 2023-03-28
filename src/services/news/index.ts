import { initialStateFavorite, TStateFavorite } from "@/reducers/favoriteNews";
import { TStateListNews, initialStateListNews } from "@/reducers/listNews";
import { initialStateNews, TStateNews } from "@/reducers/news";
import { newsRepositories } from "@/repositories/news";
import { TReqFavorite, TReqId, TReqNews } from "@/types/news";

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
    data: res.data,
    indexVideo: 0,
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

export const newsServices = {
  getNewsId,
  getNewsAll,
  favoriteNews,
};
