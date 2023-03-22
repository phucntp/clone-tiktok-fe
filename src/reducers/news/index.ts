import { TResListNews } from "@/types/news";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateNews: TStateNews = {
  hasError: false,
  data: [],
  indexVideo: null,
};
export type TStateNews = {
  hasError: boolean;
  data: TResListNews;
  indexVideo: Number | null;
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

const newsReducer = createSlice({
  name: "[reducers/news]",
  initialState: initialStateNews,
  reducers: {
    set(state: TStateNews, action: PayloadAction<TStateNews>) {
      return {
        ...state,
        data: convertData(action.payload.data),
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateNews) {
      return { ...state, ...initialStateNews };
    },
    setLoadingId(state: TStateNews, action: PayloadAction<TLoadingNews>) {
      return {
        ...state,
        data: setDataId(state.data, action.payload.id, action.payload.loaded),
      };
    },
    setIndexVideo(state: TStateNews, action: PayloadAction<Number | null>) {
      return {
        ...state,
        indexVideo: action.payload,
      };
    },
  },
});

export default newsReducer;
