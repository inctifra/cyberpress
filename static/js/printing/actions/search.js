import $ from "jquery";
import {setState} from "../state";

function handleSearch(url, body) {
  $.get(url).done(r => {
    body.html(r);
    setState({currentStep: 1, cafeId: null});
  }).fail(e => {
    body.html(e.responseText || "Error loading data");
        setState({currentStep: 1, cafeId: null});
  });
}

$(function () {
  const $body = $("#cyberGridContainer");
  const $searchInput = $("#search-cafe-input");

  if (!$searchInput.length || !$body.length) 
    return;
  
  const DEBOUNCE_DELAY = 400;
  let debounceTimer;

  $searchInput.on("input", function () {
    const value = $(this).val();

    clearTimeout(debounceTimer);

    if (value.length < 3) 
      return;
    
    const url = `${$searchInput.data("action-href")}?name=${value}`;

    debounceTimer = setTimeout(() => {
      handleSearch(url, $body);
    }, DEBOUNCE_DELAY);
  });

  $(document).on("click", ".reset-search", function (e) {
    e.preventDefault();

    $searchInput.val("");

    const url = `${$(this).data("cafes-url")}?mode=reset`;

    handleSearch(url, $body);
  });
});