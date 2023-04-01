import { TMessage } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initStateCreateNews: TStateCreateNews = {
  hasError: false,
  data: {
    message: "",
  },
};
export type TStateCreateNews = {
  hasError: boolean;
  data: TMessage;
};

const createNewsReducer = createSlice({
  name: "[reducers/createNews]",
  initialState: initStateCreateNews,
  reducers: {
    set(state: TStateCreateNews, action: PayloadAction<TStateCreateNews>) {
      return {
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateCreateNews) {
      return { ...state, ...initStateCreateNews };
    },
  },
});

export default createNewsReducer;
