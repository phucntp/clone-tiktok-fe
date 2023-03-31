import { combineEpics } from "redux-observable";
import { loginEpics } from "./login";
import { registerEpics } from "./register";
import { logoutEpics } from "./logout";
import { forgotPasswordEpics } from "./forgotPassword";
import { refreshTokenEpics } from "./refreshToken";
import { newsEpics } from "./news";
import { uploadVideoEpics } from "./uploadVideo";
import { uploadImageEpics } from "./uploadImage";
import { updateAvatarEpics } from "./updateProfile";
import { userEpics } from "./user";

export const epics = combineEpics(
  loginEpics,
  registerEpics,
  logoutEpics,
  forgotPasswordEpics,
  refreshTokenEpics,
  newsEpics,
  uploadVideoEpics,
  userEpics,
  uploadImageEpics,
  updateAvatarEpics
);
