import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const getIsMobile = () => (typeof window !== "undefined") ? window.innerWidth < MOBILE_BREAKPOINT : false;
  const [isMobile, setIsMobile] = React.useState<boolean>(getIsMobile());

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);

    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);

    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
}
