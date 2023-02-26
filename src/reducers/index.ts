import { combineReducers } from "redux";
import loginReducer from "./login";
import { uiReducers } from "./ui";

export const reducers = combineReducers({
    loginReducer: loginReducer.reducer,
    uiReducers
})
