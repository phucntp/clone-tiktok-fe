import { useCookie } from "react-use";

export default function useCheckLogin() {
  const [value] = useCookie("jwt");
  return !!value;
}
