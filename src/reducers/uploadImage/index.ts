import { TResUpload } from "@/types/upload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialStateUploadImage: TStateUploadImage = {
  hasError: false,
  data: {
    url: "",
  },
};
export type TStateUploadImage = {
  hasError: boolean;
  data: TResUpload;
};

const uploadImageReducer = createSlice({
  name: "[reducers/uploadImage]",
  initialState: initialStateUploadImage,
  reducers: {
    set(state: TStateUploadImage, action: PayloadAction<TStateUploadImage>) {
      return {
        ...state,
        data: action.payload.data,
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateUploadImage) {
      return { ...state, ...initialStateUploadImage };
    },
  },
});

export default uploadImageReducer;
