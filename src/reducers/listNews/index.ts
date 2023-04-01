import { TPagination } from "@/types/common";
import { TNews } from "@/types/news";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateListNews: TStateListNews = {
  hasError: false,
  data: [],
  indexVideo: 0,
  pagination: {
    limit: 0,
    currentPage: 0,
    total: 0,
    totalPage: 0,
  },
  dataNew: [],
};
export type TStateListNews = {
  hasError: boolean;
  data: TNews[];
  indexVideo: number;
  pagination: TPagination;
  dataNew: TNews[];
};

const convertData = (oldData: TNews[], data: TNews[]) => {
  const oldIdNews = oldData.map((news) => news._id);
  let newsList = oldData;
  if (data?.length) {
    data.forEach((item) => {
      if (!oldIdNews.includes(item._id)) {
        newsList = [...newsList, item];
      }
    });
    return newsList;
  }
  return [];
};

const listNewsReducer = createSlice({
  name: "[reducers/listNews]",
  initialState: initialStateListNews,
  reducers: {
    set(state: TStateListNews, action: PayloadAction<TStateListNews>) {
      return {
        data: convertData(state.data, action.payload.data),
        hasError: action.payload.hasError,
        pagination: action.payload.pagination,
        indexVideo: 0,
        dataNew: action.payload.dataNew,
      };
    },
    clear() {
      return { ...initialStateListNews };
    },
  },
});

export default listNewsReducer;
