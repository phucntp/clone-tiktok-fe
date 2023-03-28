import { TResListUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initStateListUser: TStateListUser = {
  hasError: false,
  data: [],
};
export type TStateListUser = {
  hasError: boolean;
  data: TResListUser;
};

const listUserReducer = createSlice({
  name: "[reducers/listUser]",
  initialState: initStateListUser,
  reducers: {
    set(state: TStateListUser, action: PayloadAction<TStateListUser>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateListUser) {
      return { ...state, ...initStateListUser };
    },
  },
});

export default listUserReducer;
