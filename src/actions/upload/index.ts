import actionCreatorFactory from "typescript-fsa";
import { TFile, TRequestUpload } from "@/types/upload";

const ac = actionCreatorFactory("[upload]");
const uploadActions = {
  uploadVideo: ac<TRequestUpload>("uploadVideo"),
  uploadImage: ac<TRequestUpload>("uploadImage"),
  getVideo: ac<TFile>("getVideo"),
  getImage: ac<TFile>("getImage"),
};
export default uploadActions;
