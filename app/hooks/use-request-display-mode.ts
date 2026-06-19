import { useCallback } from "react";
import type { DisplayMode } from "./types";

export function useRequestDisplayMode() {
  const requestDisplayMode = useCallback(async (mode: DisplayMode) => {
    if (typeof window !== "undefined" && window?.openai?.requestDisplayMode) {
      return await window.openai.requestDisplayMode({ mode });
    }
    return { mode };
  }, []);

  return requestDisplayMode;
}
