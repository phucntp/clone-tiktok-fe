import { combineReducers } from "redux";
import errorDialogModule from "./errorDialog";
import loadingModule from "./loading";

export const uiReducers = combineReducers({
  errorReducer: errorDialogModule.reducer,
  loadingReducer: loadingModule.reducer,
});
