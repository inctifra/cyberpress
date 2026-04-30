import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";

gsap.registerPlugin(ScrollTrigger);

function _loadAnimationBlur(selector) {
  gsap.utils.toArray(selector).forEach((card, i) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 40,
        scale: 0.97,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        delay: i * 0.06, // smooth cascade
        scrollTrigger: {
          trigger: card,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      },
    );

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.25,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  });
}

function AnimatePrice() {
  _loadAnimationBlur(".home-2-pricing-card");

  gsap.utils.toArray(".home-2-pricing-card").forEach((card) => {
    gsap.fromTo(
      card,
      {
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      },
      {
        boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      },
    );
  });
}

function AnimateFAQScroll() {
  _loadAnimationBlur(".sec-3-faqs");
  _loadAnimationBlur(".cyberconnect-container");
}

function marqueeAnimation() {
  if ($(".at-item-anime").length > 0) {
    const marqueElements = document.querySelectorAll(".at-item-anime.marque");
    const triggerElement = document.querySelector(".at-item-anime-area");
    if (marqueElements.length > 0 && triggerElement) {
      gsap.set(Array.from(marqueElements), {
        x: "35%",
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "-1000 0%",
            end: "bottom 0%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(Array.from(marqueElements), {
          x: "-200%",
        });
    }
  }
  // at-item-anime marque-2
  if ($(".at-item-anime-2").length > 0) {
    const marqueElements2 = document.querySelectorAll(
      ".at-item-anime-2.marque",
    );
    const triggerElement2 = document.querySelector(".at-item-anime-area-2");
    if (marqueElements2.length > 0 && triggerElement2) {
      gsap.set(Array.from(marqueElements2), {
        x: "35%",
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: triggerElement2,
            start: "-1000 0%",
            end: "bottom 0%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(Array.from(marqueElements2), {
          x: "-200%",
        });
    }
  }

  if ($(".odometer").length > 0) {
    $(".odometer").each(function () {
      const el = this;
      const countNumber = $(el).attr("data-count");

      $(el).html("0");

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!$(el).hasClass("odometer-animated")) {
                $(el).addClass("odometer-animated");

                setTimeout(() => {
                  $(el).html(countNumber);
                }, 100);
              }

              observer.unobserve(el);
            }
          });
        },
        {
          root: null,
          threshold: 0.2,
        },
      );

      observer.observe(el);
    });
  }
}

marqueeAnimation();
AnimateFAQScroll();
AnimatePrice();
