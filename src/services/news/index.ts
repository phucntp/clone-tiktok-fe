import { TStateNews, initialStateNews } from "@/reducers/news";
import { newsRepositories } from "@/repositories/news";

const getNewsAll = async (): Promise<TStateNews> => {
  const res = await newsRepositories.getNewsAll();
  if (!res || !res?.data) {
    return {
      ...initialStateNews,
      hasError: true,
    };
  }
  return {
    hasError: false,
    data: res.data,
    indexVideo: null,
  };
};

export const newsServices = {
  getNewsAll,
};
