import { TPagination } from "@/types/common";
import { TUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initStateListUser: TStateListUser = {
  hasError: false,
  data: [],
  pagination: {} as TPagination,
};
export type TStateListUser = {
  hasError: boolean;
  data: TUser[];
  pagination: TPagination;
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
        pagination: action.payload.pagination,
      };
    },
    clear(state: TStateListUser) {
      return { ...state, ...initStateListUser };
    },
  },
});

export default listUserReducer;
