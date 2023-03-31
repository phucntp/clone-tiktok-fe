import { TResFollowing } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initStateFollowing: TStateFollowing = {
  hasError: false,
  data: {
    message: "",
  },
};
export type TStateFollowing = {
  hasError: boolean;
  data: TResFollowing;
};

const followingUserReducer = createSlice({
  name: "[reducers/followingUser]",
  initialState: initStateFollowing,
  reducers: {
    set(state: TStateFollowing, action: PayloadAction<TStateFollowing>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateFollowing) {
      return { ...initStateFollowing, ...state };
    },
  },
});

export default followingUserReducer;
