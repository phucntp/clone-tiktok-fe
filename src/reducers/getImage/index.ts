import { TFile } from "@/types/upload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initStateImage: TStateImage = {
  hasError: false,
  data: {
    url: "",
    id: "",
  },
  listImage: [],
};
export type TStateImage = {
  hasError: boolean;
  data: TFile;
  listImage: TFile[];
};

const convertListImage = (image: TFile): TFile[] => {
  if (!initStateImage.listImage.map((item) => item.id)?.includes(image.id)) {
    return [...initStateImage.listImage, image];
  }
  return initStateImage.listImage;
};

const getImageReducer = createSlice({
  name: "[reducers/getImage]",
  initialState: initStateImage,
  reducers: {
    set(state: TStateImage, action: PayloadAction<TStateImage>) {
      return {
        ...state,
        data: action.payload.data,
        listImage: convertListImage(action.payload.data),
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateImage) {
      return { ...initStateImage, ...state };
    },
  },
});

export default getImageReducer;
