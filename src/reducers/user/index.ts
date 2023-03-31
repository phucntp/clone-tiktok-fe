import { TUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initStateUser: TStateUser = {
  hasError: false,
  data: {} as TUser,
};
export type TStateUser = {
  hasError: boolean;
  data: TUser;
};

const userReducer = createSlice({
  name: "[reducers/user]",
  initialState: initStateUser,
  reducers: {
    set(state: TStateUser, action: PayloadAction<TStateUser>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateUser) {
      return { ...state, ...initStateUser };
    },
  },
});

export default userReducer;
