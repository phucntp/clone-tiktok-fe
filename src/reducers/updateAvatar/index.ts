import { TMessage } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateUpdateAvatar: TStateUpdateAvatar = {
  hasError: false,
  data: {} as TMessage,
};
export type TStateUpdateAvatar = {
  hasError: boolean;
  data: TMessage;
};

const updateAvatarReducer = createSlice({
  name: "[reducers/updateAvatar]",
  initialState: initialStateUpdateAvatar,
  reducers: {
    set(state: TStateUpdateAvatar, action: PayloadAction<TStateUpdateAvatar>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateUpdateAvatar) {
      return { ...state, ...initialStateUpdateAvatar };
    },
  },
});

export default updateAvatarReducer;
