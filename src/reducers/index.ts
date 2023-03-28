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
import listUserReducer from "./listUser";
import userReducer from "./user";
import followingUserReducer from "./followingUser";
import getVideoReducer from "./getVideo";
import getImageReducer from "./getImage";
import uploadImageReducer from "./uploadImage";
import updateAvatarReducer from "./updateAvatar";
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
  listUserReducer: listUserReducer.reducer,
  userReducer: userReducer.reducer,
  followingUserReducer: followingUserReducer.reducer,
  getVideoReducer: getVideoReducer.reducer,
  getImageReducer: getImageReducer.reducer,
  uploadImageReducer: uploadImageReducer.reducer,
  updateAvatarReducer: updateAvatarReducer.reducer,
  uiReducers,
});
