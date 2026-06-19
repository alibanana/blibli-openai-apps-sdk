/**
 * Source: https://github.com/openai/openai-apps-sdk-examples/tree/main/src
 */

import { useOpenAIGlobal } from "./use-openai-global";

export function useMaxHeight(): number | null {
  return useOpenAIGlobal("maxHeight");
}
