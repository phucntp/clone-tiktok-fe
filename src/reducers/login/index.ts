import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateLogin = {
  hasError: false,
  data: {},
};
export type TStateLogin = typeof initialStateLogin;

const loginReducer = createSlice({
  name: "[reducers/login]",
  initialState: initialStateLogin,
  reducers: {
    set(state: TStateLogin, action: PayloadAction<TStateLogin>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateLogin) {
      return { ...state, ...initialStateLogin };
    },
  },
});

export default loginReducer;
