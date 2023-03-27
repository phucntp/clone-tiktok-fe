import { TResFavorite } from "@/types/news";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateFavorite: TStateFavorite = {
  hasError: false,
  data: {
    message: "",
  },
};
export type TStateFavorite = {
  hasError: boolean;
  data: TResFavorite;
};

const favoriteNewsReducer = createSlice({
  name: "[reducers/favoriteNews]",
  initialState: initialStateFavorite,
  reducers: {
    set(state: TStateFavorite, action: PayloadAction<TStateFavorite>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateFavorite) {
      return { ...state, ...initialStateFavorite };
    },
  },
});

export default favoriteNewsReducer;
