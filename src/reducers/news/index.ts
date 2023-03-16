import { TResListNews } from "@/types/news";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateNews: TStateNews = {
  hasError: false,
  data: [],
};
export type TStateNews = {
  hasError: boolean;
  data: TResListNews;
};

const newsReducer = createSlice({
  name: "[reducers/news]",
  initialState: initialStateNews,
  reducers: {
    set(state: TStateNews, action: PayloadAction<TStateNews>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateNews) {
      return { ...state, ...initialStateNews };
    },
  },
});

export default newsReducer;
