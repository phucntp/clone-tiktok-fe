import { createBreakpoint } from "react-use";

const useBreak = createBreakpoint({ XL: 1280, LG: 1024, MG: 768, SM: 560 });

function useBreakpoint() {
  const breakpoint = useBreak();
  return breakpoint;
}

export default useBreakpoint;
