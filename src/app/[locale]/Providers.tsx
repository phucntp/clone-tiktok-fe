"use client";

//redux
import { Provider } from "react-redux";
import { configureStore } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const store = configureStore();

  return <Provider store={store.store}><PersistGate loading={null} persistor={store.persistor}>
    {children}
  </PersistGate></Provider>;
}
