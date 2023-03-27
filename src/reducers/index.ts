import { combineReducers } from "redux";
import loginReducer from "./login";
import registerReducer from "./register";
import logoutReducer from "./logout";
import forgotPasswordReducer from "./forgotPassword";
import refreshTokenReducer from "./refreshToken";
import listNewsReducer from "./listNews";
import uploadVideoReducer from "./uploadVideo";
import newsReducer from "./news";
import favoriteNewsReducer from "./favoriteNews";
import { uiReducers } from "./ui";

export const reducers = combineReducers({
  loginReducer: loginReducer.reducer,
  registerReducer: registerReducer.reducer,
  logoutReducer: logoutReducer.reducer,
  forgotPasswordReducer: forgotPasswordReducer.reducer,
  refreshTokenReducer: refreshTokenReducer.reducer,
  listNewsReducer: listNewsReducer.reducer,
  uploadVideoReducer: uploadVideoReducer.reducer,
  newsReducer: newsReducer.reducer,
  favoriteNewsReducer: favoriteNewsReducer.reducer,
  uiReducers,
});
