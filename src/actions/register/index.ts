import actionCreatorFactory from "typescript-fsa";
import { TParamRegister } from "@/types/register";

const ac = actionCreatorFactory("[register]");
const registerActions = {
  register: ac<TParamRegister>("register"),
};
export default registerActions;
