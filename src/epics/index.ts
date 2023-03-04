import { combineEpics } from "redux-observable";
import { loginEpics } from "./login";
import { registerEpics } from "./register";

export const epics = combineEpics(loginEpics, registerEpics);
