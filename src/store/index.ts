import { combineEpics, createEpicMiddleware } from "redux-observable";
import { applyMiddleware, createStore, AnyAction } from "redux";
import { reducers } from "@/reducers";
import { epics } from "@/epics";
import { commonAsyncEpics } from "@/types/store/epic";

// epics

export type AppState = ReturnType<typeof rootReducer>;

// reducer
const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};

// epic
const rootEpic = combineEpics(epics, commonAsyncEpics);
const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>();

export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
};
