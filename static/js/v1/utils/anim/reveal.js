import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import $ from "jquery";

(function () {

    if ($(".reveal-text").length) {

        gsap.registerPlugin(SplitText);

        $(".reveal-text").each(function (index, el) {

            const mainText = el.querySelector(".reveal-main");
            const accent = el.querySelector(".text-accent");

            let chars;

            if (mainText) {

                const split = new SplitText(mainText, {
                    type: "chars",
                });

                chars = split.chars;

                gsap.set(chars, {
                    opacity: 0.3,
                    x: -7,
                });

                gsap.to(chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                    },
                    x: 0,
                    opacity: 1,
                    stagger: 0.05,
                });

                // animate accent separately
                if (accent) {
                    gsap.set(accent, {
                        opacity: 0,
                        y: 10,
                    });

                    gsap.to(accent, {
                        scrollTrigger: {
                            trigger: el,
                            start: "top 75%",
                            end: "top 40%",
                            scrub: 1,
                        },
                        opacity: 1,
                        y: 0,
                    });
                }

            }

            else {

                const split = new SplitText(el, {
                    type: "chars",
                });

                chars = split.chars;

                gsap.set(chars, {
                    opacity: 0.3,
                    x: -7,
                });

                gsap.to(chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                    },
                    x: 0,
                    opacity: 1,
                    stagger: 0.05,
                });

            }

        });
    }

})();