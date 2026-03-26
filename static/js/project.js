import "goey-toast/styles.css";
import "../sass/project.scss";
import $ from "jquery";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,    });



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
});