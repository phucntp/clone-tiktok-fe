import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateLogout = {
  hasError: false,
};
export type TStateLogout = typeof initialStateLogout;

const logoutReducer = createSlice({
  name: "[reducers/logout]",
  initialState: initialStateLogout,
  reducers: {
    set(state: TStateLogout, action: PayloadAction<TStateLogout>) {
      return {
        ...state,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateLogout) {
      return { ...state, ...initialStateLogout };
    },
  },
});

export default logoutReducer;
