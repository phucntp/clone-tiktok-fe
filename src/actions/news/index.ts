import actionCreatorFactory from "typescript-fsa";

const ac = actionCreatorFactory("[news]");
const newsActions = {
  getNewsAll: ac("getNews"),
};
export default newsActions;
