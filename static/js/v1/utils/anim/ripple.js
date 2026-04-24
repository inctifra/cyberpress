import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import $ from "jquery";
import "jquery.ripples";

window.$ = window.jQuery = $;

(function () {
  const $images = $(".ripple-image img");

  if ($images.length) {
    imagesLoaded($images.toArray(), () => {
      $(".ripple-image").each(function () {
        const $container = $(this);
        const $img = $container.find("img").first();
        const imgURL = $img.attr("src");

        if (!imgURL) return;

        $container.css({
          backgroundImage: `url(${imgURL})`,
          backgroundSize: "contain",
          backgroundPosition: "center center",
        });

        try {
          $container.ripples({
            resolution: 400,
            perturbance: 0.03,
            imageUrl: imgURL,
          });
          $img.css("opacity", 0);
        } catch (e) {
          console.error("Ripples failed:", e);
        }
      });
    });
  }

  const aboutSvg = document.querySelectorAll(".at-about-svg-wrap");
  if (aboutSvg.length) {
    aboutSvg.forEach((svg) => {
      if (!svg) return;
      const svgLeft = svg.querySelector("svg:nth-child(1)");
      const svgCenter = svg.querySelector("svg:nth-child(2)");
      const svgRight = svg.querySelector("svg:nth-child(3)");

      if (svgLeft) {
        gsap.from(svgLeft, {
          transformOrigin: "left center",
          duration: 1,
          ease: "power2.out",
          x: "-100px",
          scrollTrigger: {
            trigger: svg,
            start: "top 90%",
            end: "bottom center",
            scrub: 1,
          },
        });
      }
      if (svgCenter) {
        gsap.from(svgCenter, {
          transformOrigin: "center center",
          duration: 1,
          ease: "power2.out",
          y: "-100px",
          scrollTrigger: {
            trigger: svg,
            start: "top 90%",
            end: "bottom center",
            scrub: 1,
          },
        });
      }
      if (svgRight) {
        gsap.from(svgRight, {
          transformOrigin: "right center",
          duration: 1,
          ease: "power2.out",
          x: "100px",
          scrollTrigger: {
            trigger: svg,
            start: "top 90%",
            end: "bottom center",
            scrub: 1,
          },
        });
      }
    });
  }
})();
