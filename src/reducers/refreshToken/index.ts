import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateRefreshToken = {
  hasError: false,
};
export type TStateRefreshToken = typeof initialStateRefreshToken;

const refreshTokenReducer = createSlice({
  name: "[reducers/refreshToken]",
  initialState: initialStateRefreshToken,
  reducers: {
    set(state: TStateRefreshToken, action: PayloadAction<TStateRefreshToken>) {
      return {
        ...state,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateRefreshToken) {
      return { ...state, ...initialStateRefreshToken };
    },
  },
});

export default refreshTokenReducer;
