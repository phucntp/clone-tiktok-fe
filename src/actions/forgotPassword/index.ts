import actionCreatorFactory from "typescript-fsa";
import { TParamForgotPassword } from "@/types/forgotPassword";

const ac = actionCreatorFactory("[forgotPassword]");
const forgotPasswordActions = {
  forgotPassword: ac<TParamForgotPassword>("forgotPassword"),
};
export default forgotPasswordActions;
