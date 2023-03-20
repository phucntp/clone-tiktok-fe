import actionCreatorFactory from "typescript-fsa";
import { TRequestUpload } from "@/types/upload";

const ac = actionCreatorFactory("[upload]");
const uploadActions = {
  upload: ac<TRequestUpload>("uploadVideo"),
};
export default uploadActions;
