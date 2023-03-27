import { TReqListTag, TReqTag } from "@/types/tag";
import actionCreatorFactory from "typescript-fsa";

const ac = actionCreatorFactory("[tag]");
const tagActions = {
  getListTag: ac<TReqListTag>("getListTag"),
  getTagId: ac<TReqTag>("getTagId"),
};
export default tagActions;
