import React from "react";
import ReactDOM from "react-dom/client";
import "goey-toast/styles.css";
import { gooeyToast, GooeyToaster } from "goey-toast";
import "../sass/project.scss";
import $ from "jquery";

// Render toaster once
const container = document.getElementById("toast-root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<GooeyToaster position="top-left" />);
}

$(function () {
  const $toggleBtn = $("#toggleAccessPasskey");
  const $accessCodeInput = $('input[name="access_code"]');

  if ($toggleBtn.length && $accessCodeInput.length) {
    $toggleBtn.on("click", function () {
      const isPassword = $accessCodeInput.attr("type") === "password";
      $accessCodeInput.attr("type", isPassword ? "text" : "password");

      $(this).html(
        isPassword
          ? '<i class="bi bi-eye-slash"></i>'
          : '<i class="bi bi-eye"></i>'
      );
    });
  }

  // Now this will work
  gooeyToast.success("Changes saved", {
    description: "Your changes have been saved and synced successfully.",
  });
});