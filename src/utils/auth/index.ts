import { ReadonlyRequestCookies } from "next/dist/server/app-render";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export const isLogin = (
  cookieStore: RequestCookies | ReadonlyRequestCookies
): boolean => {
  const theme = cookieStore.get("jwt");
  return !!theme?.value;
};
