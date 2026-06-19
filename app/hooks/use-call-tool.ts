import { useCallback } from "react";
import type { CallToolResponse } from "./types";

export function useCallTool() {
  const callTool = useCallback(
    async (
      name: string,
      args: Record<string, unknown>
    ): Promise<CallToolResponse | null> => {
      if (typeof window !== "undefined" && window?.openai?.callTool) {
        return await window.openai.callTool(name, args);
      }
      return null;
    },
    []
  );

  return callTool;
}
