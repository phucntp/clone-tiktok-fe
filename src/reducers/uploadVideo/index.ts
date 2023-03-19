import { TResUploadVideo } from "@/types/upload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateUploadVideo: TStateUploadVideo = {
  hasError: false,
  data: {
    video: "",
  },
};
export type TStateUploadVideo = {
  hasError: boolean;
  data: TResUploadVideo;
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
