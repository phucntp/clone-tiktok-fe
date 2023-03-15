import actionCreatorFactory from "typescript-fsa";

const ac = actionCreatorFactory("[refreshToken]");
const refreshTokenActions = {
  refreshToken: ac("refreshToken"),
};
export default refreshTokenActions;
