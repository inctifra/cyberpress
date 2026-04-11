import $ from "jquery";
import { getState, updateState } from "../state";

$(function () {
  const state = getState();
  if (state.cafeId) {
    $(`#${state.cafeId}`).addClass("selected");
  }

  $(document).on("click", ".cyber-card-cafes", function () {
    const cyberId = $(this).attr("id");

    $(".cyber-card-cafes").removeClass("selected");
    $(this).addClass("selected");

    const updated = updateState({
      cafeId: cyberId,
      currentStep: 1
    });

    console.log("Updated state:", updated);
  });

});