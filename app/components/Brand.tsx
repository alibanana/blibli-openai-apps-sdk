export function Brand() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <img
        src="/blibli-icon.png"
        alt="Blibli"
        style={{ height: 28, width: 28, display: "block", objectFit: "contain" }}
      />
      <span style={{ fontWeight: 700, fontSize: 16, color: "#0072ff", letterSpacing: "-0.3px" }}>
        blibli
      </span>
    </div>
  );
}
