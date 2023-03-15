'use client'

import { combineEpics, createEpicMiddleware } from "redux-observable";
import { applyMiddleware, createStore, AnyAction, compose, StoreCreator } from "redux";
import { reducers } from "@/reducers";
import { createLogger } from 'redux-logger'
import { epics } from "@/epics";
import { commonAsyncEpics } from "@/types/store/epic";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// epics

export type AppState = ReturnType<typeof rootReducer>;

// reducer
const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};

// epic
const rootEpic = combineEpics(epics, commonAsyncEpics);
const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>();
const logger = createLogger({ collapsed: true })

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const enhancers = typeof window !== "undefined" ? compose(
  applyMiddleware(
    epicMiddleware,
    logger
  ),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: StoreCreator) => f,
) : compose(
  applyMiddleware(
    epicMiddleware,
    logger
  )
);

export const configureStore = () => {
  const store = createStore(persistedReducer, enhancers);
  epicMiddleware.run(rootEpic);
  const persistor = persistStore(store)
  return { store, persistor }
};