# Blibli on ChatGPT

A Next.js app that exposes a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server so ChatGPT can browse and search Blibli products and render them in a branded widget.

## How it works

```
ChatGPT → /mcp (Streamable HTTP) → list_products / search_products → widget rendered in chat
```

- The MCP route at `/mcp` exposes two read-only tools and a `ui://widget` resource
- ChatGPT calls the tool, gets back `structuredContent` (product data) + a widget URI
- The widget page at `/` reads the tool output and renders image-first product cards
- All product data is local (no outbound API calls to blibli.com)

## Tools

| Tool | Description |
|---|---|
| `list_products` | Browse products, optionally filtered by category and sort order |
| `search_products` | Search products by keyword with optional sort |

Both tools are `readOnlyHint: true` — no orders, no mutations.

## Stack

- **Next.js 15** (App Router, Turbopack)
- **mcp-handler** — Streamable HTTP MCP transport for Vercel
- **Tailwind CSS v4**
- **Zod** — tool input validation

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run typecheck
npm run build
```

To test the MCP endpoint locally with [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npx @modelcontextprotocol/inspector@latest
```

Select transport **Streamable HTTP**, URL `http://localhost:3000/mcp`, then **List Tools**.

## Deploy to Vercel

1. Import this repo at [vercel.com/new](https://vercel.com/new) — framework auto-detects as Next.js
2. **Project → Settings → Functions** → enable **Fluid compute**
3. No environment variables needed — `baseUrl.ts` reads `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_BRANCH_URL` automatically
4. Deploy → MCP URL: `https://<your-app>.vercel.app/mcp`

## Connect to ChatGPT

1. **Settings → Beta features** → enable **Developer mode**
2. **Settings → Connectors → Create connector**
   - Name: `Blibli`
   - Connector URL: `https://<your-app>.vercel.app/mcp`
3. On success, `list_products` and `search_products` will be listed
4. Start a chat → **+** → **More** → **Blibli**

### Golden prompts

| Prompt | Tool called |
|---|---|
| "Show me some Blibli products" | `list_products {}` |
| "Browse Blibli electronics" | `list_products { category: "elektronik" }` |
| "Search Blibli for men's running shoes" | `search_products { query: "sepatu lari pria" }` |
| "Find HDMI cables on Blibli, cheapest first" | `search_products { query: "hdmi", sort: "price-asc" }` |

## Project structure

```
app/
  mcp/route.ts        # MCP server — tools + widget resource
  page.tsx            # Widget page (rendered inside ChatGPT)
  layout.tsx          # ChatGPT SDK bootstrap
  hooks/              # OpenAI Apps SDK hooks
  components/         # ProductCard, ProductGrid, Brand, etc.
lib/
  products.ts         # List + search logic over local catalog
  mcp-meta.ts         # Tool/resource metadata helpers
  types.ts
data/
  products.json       # Local product catalog (20 items, 6 categories)
public/
  blibli-logo.svg
  products/           # Product images
baseUrl.ts            # Env-aware base URL (local / Vercel preview / prod)
middleware.ts         # CORS headers
```
