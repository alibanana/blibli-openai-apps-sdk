import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blibli on ChatGPT",
  description: "Browse and search Blibli products inside ChatGPT.",
  icons: { icon: "/blibli-icon.png" },
};

// NOTE: This page is only the browser preview / marketing surface for the
// deployment. The actual ChatGPT widget is the self-contained bundle built by
// `vite build` (widget/dist/index.html) and served from app/mcp/route.ts.
// We deliberately do NOT inject a <base href> or asset-rewriting bootstrap
// here — those were the source of the skybridge CSP violations.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
