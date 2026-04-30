import $ from "jquery";

$(document).ready(function () {
  if ($("[data-countdown]").length > 0) {
    let countdown = $("[data-countdown]");
    countdown.each(function () {
      var $this = $(this);
      var dateStr = $this.attr("data-countdown") || $this.data("countdown");
      if (!dateStr) return;
      var finalDate = new Date(dateStr.replace(/\//g, "-"));
      if (isNaN(finalDate.getTime())) return;

      function updateCountdown() {
        var now = new Date();
        var diff = finalDate.getTime() - now.getTime();
        if (diff <= 0) {
          $this.html(
            '<span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> days </span></span><span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> hours </span></span><span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> mins </span></span><span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> secs </span></span>',
          );
          clearInterval(timer);
          return;
        }
        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((diff % (1000 * 60)) / 1000);
        $this.html(
          '<span class="countdown-section"><span class="countdown-amount">' +
            d +
            '</span><span class="countdown-period"> days </span></span>' +
            '<span class="countdown-section"><span class="countdown-amount">' +
            h +
            '</span><span class="countdown-period"> hours </span></span>' +
            '<span class="countdown-section"><span class="countdown-amount">' +
            m +
            '</span><span class="countdown-period"> mins </span></span>' +
            '<span class="countdown-section"><span class="countdown-amount">' +
            s +
            '</span><span class="countdown-period"> secs </span></span>',
        );
      }
      updateCountdown();
      var timer = setInterval(updateCountdown, 1000);
    });
  }
});
