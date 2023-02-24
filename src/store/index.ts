import { combineEpics, createEpicMiddleware } from "redux-observable";
import {
  compose,
  applyMiddleware,
  StoreCreator,
  createStore,
  AnyAction,
} from "redux";
import { routerMiddleware } from "connected-react-router";
import history from "@/store/history";
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

// enhance
const enhancers = compose(
  applyMiddleware(epicMiddleware, routerMiddleware(history)),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: StoreCreator) => f
);

export const configureStore = () => {
  const store = createStore(rootReducer,{}, enhancers);
  epicMiddleware.run(rootEpic);
  return store;
};
