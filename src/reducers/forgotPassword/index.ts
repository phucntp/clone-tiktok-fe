import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateForgotPassword = {
  hasError: false,
  data: {},
};
export type TStateForgotPassword = typeof initialStateForgotPassword;

const forgotPasswordReducer = createSlice({
  name: "[reducers/forgot-password]",
  initialState: initialStateForgotPassword,
  reducers: {
    set(
      state: TStateForgotPassword,
      action: PayloadAction<TStateForgotPassword>
    ) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateForgotPassword) {
      return { ...state, ...initialStateForgotPassword };
    },
  },
});

export default forgotPasswordReducer;
