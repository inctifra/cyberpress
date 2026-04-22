import $ from "jquery";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

window.$ = window.jQuery = $;

Swiper.use([Autoplay]);

function carouselScroll() {

    new Swiper(".carouselTicker-left", {
        loop: true,

        slidesPerView: 8,
        spaceBetween: 20,

        speed: 6000,

        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
        },

        breakpoints: {
            0: { slidesPerView: 2 },
            768: { slidesPerView: 6 },
            1200: { slidesPerView: 8 }
        }
    });

    new Swiper(".carouselTicker-right", {
        loop: true,

        slidesPerView: 8,
        spaceBetween: 20,

        speed: 6000,

        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
        },

        breakpoints: {
            0: { slidesPerView: 2 },
            768: { slidesPerView: 6 },
            1200: { slidesPerView: 8 }
        }
    });

}

$(document).ready(function () {
    carouselScroll();
});