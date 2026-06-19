/**
 * Source: https://github.com/openai/openai-apps-sdk-examples/tree/main/src
 */

import { useOpenAIGlobal } from "./use-openai-global";

export function useWidgetProps<T extends Record<string, unknown>>(
  defaultState?: T | (() => T)
): T {
  const toolOutput = useOpenAIGlobal("toolOutput") as T;

  const fallback =
    typeof defaultState === "function"
      ? (defaultState as () => T | null)()
      : defaultState ?? null;

  return toolOutput ?? fallback;
}
