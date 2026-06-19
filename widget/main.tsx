import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Widget from "../app/page";
import "./widget.css";

const el = document.getElementById("blibli-root");
if (el) {
  createRoot(el).render(
    <StrictMode>
      <Widget />
    </StrictMode>
  );
}
