import { combineEpics } from "redux-observable";
import { loginEpics } from "./login";
import { registerEpics } from "./register";
import { logoutEpics } from "./logout";
import { forgotPasswordEpics } from "./forgotPassword";
import { refreshTokenEpics } from "./refreshToken";
import { newsEpics } from "./news";
import { uploadVideoEpics } from "./uploadVideo";

export const epics = combineEpics(
  loginEpics,
  registerEpics,
  logoutEpics,
  forgotPasswordEpics,
  refreshTokenEpics,
  newsEpics,
  uploadVideoEpics
);
