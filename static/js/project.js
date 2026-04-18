import "goey-toast/styles.css";
import "../sass/project.scss";
import $ from "jquery";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,    });


  function handleCountDown(){
      const STORAGE_KEY = "countdown_end_time";

  // Set countdown duration (example: 30 days from first visit)
  const duration = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

  let endTime = localStorage.getItem(STORAGE_KEY);

  if (!endTime) {
    // First visit → set end time
    endTime = new Date().getTime() + duration;
    localStorage.setItem(STORAGE_KEY, endTime);
  } else {
    // Returning user → use saved time
    endTime = parseInt(endTime);
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      $("#days").text("0");
      $("#hours").text("0");
      $("#minutes").text("0");
      $("#seconds").text("0");
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    $("#days").text(days);
    $("#hours").text(hours);
    $("#minutes").text(minutes);
    $("#seconds").text(seconds);
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
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


  if($(".countdown").get(0)){
    handleCountDown();
  }

});