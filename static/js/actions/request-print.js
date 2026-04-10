import $ from "jquery";
import { initializeModalTrigger } from "../libs/_modalTrigger";

$(function(){


    const modal = initializeModalTrigger({
        buttonSelector: "a.requestPrintModal",
        modalSelector: "div.modal#requestPrintModal",
        loadContent: function(body, url){
            body.html(`<p class='text-center'>Loading request form...</p>`)
            console.log(url, body);
            $.get(url).done(r=>body.html(r)).fail(r=>body.html(r))
        }
    });


});
