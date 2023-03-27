import { TReqListMusic, TReqMusic } from "@/types/music";
import actionCreatorFactory from "typescript-fsa";

const ac = actionCreatorFactory("[music]");
const musicActions = {
  getListMusic: ac<TReqListMusic>("getListMusic"),
  getMusicId: ac<TReqMusic>("getMusicId"),
};
export default musicActions;
