import { TPagination } from "@/types/common";
import { TNews } from "@/types/news";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateListNews: TStateListNews = {
  hasError: false,
  data: [],
  indexVideo: 0,
  pagination: {} as TPagination,
};
export type TStateListNews = {
  hasError: boolean;
  data: TNews[];
  indexVideo: number;
  pagination: TPagination;
};
export type TLoadingNews = {
  loaded: boolean;
  id: string;
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
    const newData = newsList.map((item) => {
      return {
        ...item,
        loaded: false,
      };
    });
    return newData;
  }
  return [];
};

const setDataId = (data: TNews[], id: string, loaded: boolean) => {
  const newData = data.map((item) => {
    if (item._id === id) {
      return {
        ...item,
        loaded: loaded,
      };
    }
    return item;
  });
  return newData;
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
      };
    },
    clear(state: TStateListNews) {
      return { ...state, ...initialStateListNews };
    },
    setLoadingId(state: TStateListNews, action: PayloadAction<TLoadingNews>) {
      return {
        ...state,
        data: setDataId(state.data, action.payload.id, action.payload.loaded),
      };
    },
    setIndexVideo(state: TStateListNews, action: PayloadAction<number>) {
      return {
        ...state,
        indexVideo: action.payload,
      };
    },
  },
});

export default listNewsReducer;
