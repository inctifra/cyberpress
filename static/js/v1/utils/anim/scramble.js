
import $ from "jquery";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
gsap.utils.toArray(".scramble-text").forEach((el) => {
    console.log(el.textContent)
    gsap.to(el, {
        delay: 2,
        duration: 2,
        scrambleText: {
            text: el.textContent,
            chars: "010"
        }
    })
})