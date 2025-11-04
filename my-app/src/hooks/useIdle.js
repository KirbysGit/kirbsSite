import { useEffect } from "react";

export function useIdle(fn, timeout = 1200, deps = []) {
  useEffect(() => {
    let id;

    const cb = () => fn();

    if ("requestIdleCallback" in window) {
      id = window.requestIdleCallback(cb, { timeout });
      return () => window.cancelIdleCallback?.(id);
    }
    
    id = window.setTimeout(cb, timeout);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

