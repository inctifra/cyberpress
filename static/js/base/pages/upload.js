import "../../../sass/base/pages/upload.scss";
import $ from "jquery";


$(function(){
    
    $(".location-btns-cybercafe button").on("click", function(){
        $(".location-btns-cybercafe button").removeClass("active");
        $(this).addClass("active");
        
        const isCyberCafe = $(this).text().trim().includes("CyberCafe");
        $(".customer-upload-information-instruction").attr("data-display", isCyberCafe);
    });
// 59afe3

});


