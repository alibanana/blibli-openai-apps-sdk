export function Brand() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* Inline SVG mark — fully self-contained so it never depends on the
          document origin or a <base href>, both of which break inside the
          ChatGPT Apps SDK sandbox iframe (a root-relative /blibli-icon.png
          resolves against the sandbox origin and 404s). */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        role="img"
        aria-label="Blibli"
        style={{ display: "block" }}
      >
        <rect x="2" y="3" width="13" height="13" rx="3.5" fill="#0072ff" />
        <rect x="9" y="9" width="13" height="13" rx="3.5" fill="#0072ff" opacity="0.6" />
      </svg>
      <span style={{ fontWeight: 700, fontSize: 16, color: "#0072ff", letterSpacing: "-0.3px" }}>
        blibli
      </span>
    </div>
  );
}
