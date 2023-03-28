import { TRequestUpload } from "@/types/upload";
import actionCreatorFactory from "typescript-fsa";

const ac = actionCreatorFactory("[user]");
const profileActions = {
  updateAvatar: ac<{ file: TRequestUpload; username: string }>("updateAvatar"),
};
export default profileActions;
