import { combineReducers } from "redux";
import loginReducer from "./login";
import registerReducer from "./register";
import logoutReducer from "./logout";
import forgotPasswordReducer from "./forgotPassword";
import refreshTokenReducer from "./refreshToken";
import newsReducer from "./news";
import uploadVideoReducer from "./uploadVideo";
import { uiReducers } from "./ui";

export const reducers = combineReducers({
  loginReducer: loginReducer.reducer,
  registerReducer: registerReducer.reducer,
  logoutReducer: logoutReducer.reducer,
  forgotPasswordReducer: forgotPasswordReducer.reducer,
  refreshTokenReducer: refreshTokenReducer.reducer,
  newsReducer: newsReducer.reducer,
  uploadVideoReducer: uploadVideoReducer.reducer,
  uiReducers,
});
