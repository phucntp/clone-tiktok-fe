import { combineEpics } from "redux-observable";
import { loginEpics } from "./login";


export const epics = combineEpics(loginEpics)