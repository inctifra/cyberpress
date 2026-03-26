import React from "react";
import ReactDOM from "react-dom/client";
import { gooeyToast, GooeyToaster } from "goey-toast";
import "goey-toast/styles.css";

export const ToastProvider = (position = "top-right") => {
  const container = document.getElementById("toast-root");
  if(!container)return;
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<GooeyToaster position={position} />);
  }
};

export const toast = {
  success: (topic = "success", msg, duration = 3000) =>
    gooeyToast.success(topic, { duration, description: msg }),
  error: (topic = "error", msg, duration = 3000) =>
    gooeyToast.error(topic, { duration, description: msg }),
  loading: (topic = "loading", msg, duration = 3000) =>
    gooeyToast.loading(msg, { duration }),
  custom: (msg, options = {}) => gooeyToast(msg, options),
};
