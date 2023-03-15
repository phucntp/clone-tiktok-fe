import actionCreatorFactory from "typescript-fsa";

const ac = actionCreatorFactory("[logout]");
const logoutActions = {
  logout: ac("logout"),
};
export default logoutActions;
