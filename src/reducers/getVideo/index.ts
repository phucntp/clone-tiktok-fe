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

const convertListVideo = (oldData: TFile[], video: TFile): TFile[] => {
  const oldIdVideo = oldData?.map((item) => item.id);
  let listVideo = oldData;
  if (!oldIdVideo.includes(video.id) || oldData.length === 0) {
    listVideo = [...listVideo, video];
  }
  return listVideo;
};

const getVideoReducer = createSlice({
  name: "[reducers/getVideo]",
  initialState: initStateVideo,
  reducers: {
    set(state: TStateVideo, action: PayloadAction<TStateVideo>) {
      return {
        data: action.payload.data,
        listVideo: convertListVideo(state.listVideo, action.payload.data),
        hasError: action.payload.hasError,
      };
    },
    clear(state: TStateVideo) {
      return { ...initStateVideo, ...state };
    },
  },
});

export default getVideoReducer;
