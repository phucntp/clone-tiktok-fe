"use client";

//redux
import { Provider } from "react-redux";
import { configureStore } from "@/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const store = configureStore();

  return <Provider store={store}>{children}</Provider>;
}
