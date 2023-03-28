import { TFile } from "@/types/upload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initStateVideo: TStateVideo = {
  hasError: false,
  data: {
    url: "",
    id: "",
  },
  listVideo: [],
};
export type TStateVideo = {
  hasError: boolean;
  data: TFile;
  listVideo: TFile[];
};

const convertListVideo = (video: TFile): TFile[] => {
  if (!initStateVideo.listVideo.map((item) => item.id)?.includes(video.id)) {
    return [...initStateVideo.listVideo, video];
  }
  return initStateVideo.listVideo;
};

const getVideoReducer = createSlice({
  name: "[reducers/getVideo]",
  initialState: initStateVideo,
  reducers: {
    set(state: TStateVideo, action: PayloadAction<TStateVideo>) {
      return {
        ...state,
        data: action.payload.data,
        listVideo: convertListVideo(action.payload.data),
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateVideo) {
      return { ...initStateVideo, ...state };
    },
  },
});

export default getVideoReducer;
