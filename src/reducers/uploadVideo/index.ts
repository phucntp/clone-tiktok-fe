import { TResUpload } from "@/types/upload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateUploadVideo: TStateUploadVideo = {
  hasError: false,
  data: {
    url: "",
  },
};
export type TStateUploadVideo = {
  hasError: boolean;
  data: TResUpload;
};

const uploadVideoReducer = createSlice({
  name: "[reducers/uploadVideo]",
  initialState: initialStateUploadVideo,
  reducers: {
    set(state: TStateUploadVideo, action: PayloadAction<TStateUploadVideo>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateUploadVideo) {
      return { ...state, ...initialStateUploadVideo };
    },
  },
});

export default uploadVideoReducer;
