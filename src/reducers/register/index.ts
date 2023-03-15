import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateRegister = {
  hasError: false,
  data: {},
};
export type TStateRegister = typeof initialStateRegister;

const registerReducer = createSlice({
  name: "[reducers/register]",
  initialState: initialStateRegister,
  reducers: {
    set(state: TStateRegister, action: PayloadAction<TStateRegister>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateRegister) {
      return { ...state, ...initialStateRegister };
    },
  },
});

export default registerReducer;
