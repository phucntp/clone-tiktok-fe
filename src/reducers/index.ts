import { combineReducers } from "redux";
import loginReducer from "./login";
import registerReducer from "./register";
import { uiReducers } from "./ui";

export const reducers = combineReducers({
  loginReducer: loginReducer.reducer,
  registerReducer: registerReducer.reducer,
  uiReducers,
});
