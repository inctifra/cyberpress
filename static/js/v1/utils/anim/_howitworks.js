import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import $ from "jquery";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true)

if($(".card__process-card").get(0)){

gsap.utils.toArray(".card__process-card").forEach((card) => {
  
  const title = card.querySelector(".card__process-title");
  const desc = card.querySelector(".card__process-desc");
  const num = card.querySelector(".card__process-num");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });

  tl.from(card, {
    y: 60,
    autoAlpha: 0,
    scale: 0.97,
    filter: "blur(6px)",
    duration: 0.6,
    ease: "power2.out"
  });

  if (title) {
    tl.from(title, {
      y: 20,
      autoAlpha: 0,
      duration: 0.4
    }, "-=0.3");
  }

if (desc) {
  tl.fromTo(desc,
    {
      y: 15,
      autoAlpha: 0
    },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.4
    },
    "-=0.25"
  );
}

  if (num) {
    tl.from(num, {
      scale: 0.6,
      autoAlpha: 0,
      duration: 0.4,
      ease: "back.out(1.5)"
    }, "-=0.4");
  }

});

}