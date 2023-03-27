import actionCreatorFactory from "typescript-fsa";
import { TReqGetVideo, TRequestUpload } from "@/types/upload";

const ac = actionCreatorFactory("[upload]");
const uploadActions = {
  upload: ac<TRequestUpload>("uploadVideo"),
  getVideo: ac<TReqGetVideo>("getVideo"),
};
export default uploadActions;
