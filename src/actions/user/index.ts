import { TReqListUser, TReqUsername, TReqFollowing } from "@/types/user";
import actionCreatorFactory from "typescript-fsa";

const ac = actionCreatorFactory("[user]");
const userActions = {
  getListUser: ac<TReqListUser>("getListUser"),
  getUsername: ac<TReqUsername>("getUsername"),
  following: ac<TReqFollowing>("following"),
};
export default userActions;
