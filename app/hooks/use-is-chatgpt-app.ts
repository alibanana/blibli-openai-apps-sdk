import { useSyncExternalStore } from "react";
import { SET_GLOBALS_EVENT_TYPE } from "./types";

/**
 * True when running inside the ChatGPT Apps SDK host. We detect this by the
 * presence of the `window.openai` bridge the host injects, and re-evaluate
 * whenever the host (re)publishes its globals.
 */
export function useIsChatGptApp(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener(SET_GLOBALS_EVENT_TYPE, onChange, { passive: true });
      return () => window.removeEventListener(SET_GLOBALS_EVENT_TYPE, onChange);
    },
    () => typeof window !== "undefined" && typeof window.openai !== "undefined",
    () => false
  );
}
