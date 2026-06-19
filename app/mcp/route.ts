import { readFile } from "node:fs/promises";
import path from "node:path";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { listProducts, searchProducts, withAbsoluteImages } from "@/lib/products";
import {
  WIDGET_URI,
  widgetMeta,
  resourceMeta,
  narrate,
  listPayload,
  searchPayload,
} from "@/lib/mcp-meta";

const SORTS = ["relevance", "price-asc", "price-desc", "rating", "sold"] as const;

// Serve the self-contained widget produced by `vite build` (widget/dist/index.html).
// It inlines all JS + CSS and uses no <base href>, so it satisfies the strict
// ChatGPT Apps SDK sandbox CSP. (The old approach fetched the full Next.js page,
// which referenced external _next/static JS+CSS chunks and a <base> tag — all
// blocked by the skybridge CSP.)
async function loadWidgetHtml(): Promise<string> {
  const file = path.join(process.cwd(), "widget", "dist", "index.html");
  return readFile(file, "utf8");
}

const handler = createMcpHandler(async (server) => {
  const html = await loadWidgetHtml();

  server.registerResource(
    "blibli-products",
    WIDGET_URI,
    {
      title: "Blibli Products",
      description: resourceMeta["openai/widgetDescription"],
      mimeType: "text/html+skybridge",
      _meta: resourceMeta,
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: html,
          _meta: resourceMeta,
        },
      ],
    })
  );

  server.registerTool(
    "list_products",
    {
      title: "Show Blibli products",
      description:
        "Use this when the user wants to browse or see a list of Blibli products, optionally within a " +
        "category (e.g. sepatu-pria, elektronik). Returns product cards rendered in a Blibli widget. " +
        "Read-only; does not place orders.",
      inputSchema: {
        category: z
          .string()
          .optional()
          .describe("Category slug to filter by, e.g. 'sepatu-pria'."),
        sort: z
          .enum(SORTS)
          .optional()
          .describe("Sort order; defaults to best-selling."),
        limit: z
          .number()
          .int()
          .min(1)
          .max(24)
          .optional()
          .describe("Max cards to return (default 12)."),
      },
      _meta: widgetMeta,
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ category, sort, limit }) => {
      const s = sort ?? "sold";
      const { items, total } = listProducts({ category, sort: s, limit });
      const data = listPayload({ category: category ?? null, sort: s, total, products: withAbsoluteImages(items) });
      return {
        content: [{ type: "text", text: narrate(data.title, total) }],
        structuredContent: data,
        _meta: widgetMeta,
      };
    }
  );

  server.registerTool(
    "search_products",
    {
      title: "Search Blibli products",
      description:
        "Use this when the user wants to search Blibli for products by keyword (e.g. 'sepatu lari', " +
        "'kabel hdmi'). Returns matching product cards in a Blibli widget. Read-only; does not place orders.",
      inputSchema: {
        query: z.string().min(1).describe("The search keywords, e.g. 'sepatu pria'."),
        sort: z
          .enum(SORTS)
          .optional()
          .describe("Sort order; defaults to relevance."),
        limit: z
          .number()
          .int()
          .min(1)
          .max(24)
          .optional()
          .describe("Max cards to return (default 12)."),
      },
      _meta: widgetMeta,
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ query, sort, limit }) => {
      const s = sort ?? "relevance";
      const { items, total } = searchProducts({ query, sort: s, limit });
      const data = searchPayload({ query, sort: s, total, products: withAbsoluteImages(items) });
      return {
        content: [{ type: "text", text: narrate(data.title, total) }],
        structuredContent: data,
        _meta: widgetMeta,
      };
    }
  );
});

export const maxDuration = 60;
export const GET = handler;
export const POST = handler;
