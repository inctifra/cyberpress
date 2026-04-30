import $ from "jquery";

$(function () {
  if (!$(".tab-btn").length) return;

  const $tabs = $(".tab-btn");
  const $panels = $(".form-panel");

  $tabs.on("click", function () {
    const target = $(this).data("target");

    $tabs.removeClass("active");
    $(this).addClass("active");

    $panels.removeClass("active-panel");
    $panels.filter(`[data-panel="${target}"]`).addClass("active-panel");
  });
});