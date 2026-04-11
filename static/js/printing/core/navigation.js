
import $ from "jquery";
import { initializeModalTrigger } from "../../libs/_modalTrigger";
import { getState, updateState } from "../state";

$(function () {
  const $backBtn = $(".navigationBtnBack");
  const $fwBtn = $(".navigationForward");

  initializeModalTrigger({
    buttonSelector: "button.modify-request",
    modalSelector: ".modal.modify-request"
  });

  // ---------------------------
  // TABS
  // ---------------------------
  function switchNestedTab(tabId, $el) {
    $(".pro-tab").removeClass("active");
    $el.addClass("active");

    const $currentPane = $(`#tab-${tabId}`);
    if ($currentPane.is(":visible")) return;

    $(".nested-pane:visible").fadeOut(150, function () {
      $(this).addClass("d-none");
      $currentPane.removeClass("d-none").hide().fadeIn(200);
    });
  }

  $(document).on("click", ".pro-tab", function () {
    const tabId = $(this).data("tab");
    switchNestedTab(tabId, $(this));
  });

  // ---------------------------
  // STEP NAVIGATION
  // ---------------------------
  function navigateToStep(step) {
    const state = getState();

    if (step === 2 && !state.cafeId) {
      alert("Please select a Cybercafe first.");
      return;
    }

    $(".step-item").removeClass("active");
    $(`#navStep${step}`).addClass("active");

    $(".content-pane").removeClass("active");
    $(`#paneStep${step}`).addClass("active");

    const headerTexts = [
      "Step 1: Locate a servicing cybercafe",
      "Step 2: Upload & Configure Files",
      "Step 3: Secure Checkout",
      "Step 4: Track & Manage Orders"
    ];

    $("#headerStatus").text(headerTexts[step - 1] || "");

    const updated = updateState({ currentStep: step });
    console.log("Step updated:", updated);
  }

  // ---------------------------
  // BUTTON EVENTS
  // ---------------------------
  $fwBtn.on("click", function () {
    const { currentStep } = getState();
    navigateToStep(currentStep + 1);
  });

  $backBtn.on("click", function () {
    const { currentStep } = getState();
    if (currentStep < 2) return;
    navigateToStep(currentStep - 1);
  });

  $(".navigationStep1").on("click", () => navigateToStep(1));
  $(".navigationStep2").on("click", () => navigateToStep(2));
  $(".navigationStep3").on("click", () => navigateToStep(3));
  $(".navigationStep4").on("click", () => navigateToStep(4));

  // ---------------------------
  // INIT (restore step on reload)
  // ---------------------------
  const { currentStep } = getState();
  navigateToStep(currentStep);

});