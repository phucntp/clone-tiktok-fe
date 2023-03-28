import { TResListNews } from "@/types/news";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateListNews: TStateListNews = {
  hasError: false,
  data: [],
  indexVideo: 0,
};
export type TStateListNews = {
  hasError: boolean;
  data: TResListNews;
  indexVideo: number;
};
export type TLoadingNews = {
  loaded: boolean;
  id: string;
};

const convertData = (data: TResListNews) => {
  const newData = data.map((item) => {
    return {
      ...item,
      loaded: false,
    };
  });
  return newData;
};

const setDataId = (data: TResListNews, id: string, loaded: boolean) => {
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
        ...state,
        data: convertData(action.payload.data),
        hasError: action.payload.hasError,
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
