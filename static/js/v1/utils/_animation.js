import $ from "jquery";
import gsap from "gsap";

function AnimateHeadings() {
  const headings = document.querySelectorAll(".text-scale-anim");
  headings.forEach((heading) => {
    if (!heading) return;
    const textNodes = [];
    heading.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(" ").forEach((word, index, array) => {
          const wordSpan = document.createElement("span");
          wordSpan.classList.add("at-word-span");
          word.split("").forEach((letter) => {
            const letterSpan = document.createElement("span");
            letterSpan.classList.add("at-letter-span");
            letterSpan.textContent = letter;
            wordSpan.appendChild(letterSpan);
          });
          textNodes.push(wordSpan);
          if (index < array.length - 1) {
            textNodes.push(document.createTextNode(" "));
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        textNodes.push(node.cloneNode(true));
      }
    });
    heading.innerHTML = "";
    textNodes.forEach((node) => heading.appendChild(node));

    const letters = heading.querySelectorAll(".at-letter-span");
    letters.forEach((letter, index) => {
      if (!letter) return;
      $(letter).on("mouseenter", () => {
        // center letter
        gsap.to(letter, {
          scaleY: 1.6,
          y: "-24%",
          duration: 0.4,
          ease: "sine",
        });

        // left neighbor
        const prev = letters[index - 1];
        if (prev) {
          gsap.to(prev, {
            scaleY: 1.3,
            y: "-12%",
            duration: 0.4,
            ease: "sine",
          });
        }

        // right neighbor
        const next = letters[index + 1];
        if (next) {
          gsap.to(next, {
            scaleY: 1.3,
            y: "-12%",
            duration: 0.4,
            ease: "sine",
          });
        }
      });

      $(letter).on("mouseleave", () => {
        // reset center letter
        gsap.to(letter, {
          scaleY: 1,
          y: "0%",
          duration: 0.4,
          ease: "sine",
        });

        // reset left and right neighbors
        const prev = letters[index - 1];
        const next = letters[index + 1];
        [prev, next].forEach((el) => {
          if (el) {
            gsap.to(el, {
              scaleY: 1,
              y: "0%",
              duration: 0.4,
              ease: "sine",
            });
          }
        });
      });
    });
  });
}

function AnimateHeading2s() {
  const headings2 = document.querySelectorAll(".text-scale-anim-2");
  headings2.forEach((heading) => {
    if (!heading) return;
    const textNodes = [];
    heading.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(" ").forEach((word, index, array) => {
          const wordSpan = document.createElement("span");
          wordSpan.classList.add("at-word-span");
          word.split("").forEach((letter) => {
            const letterSpan = document.createElement("span");
            letterSpan.classList.add("at-letter-span");
            letterSpan.textContent = letter;
            wordSpan.appendChild(letterSpan);
          });
          textNodes.push(wordSpan);
          if (index < array.length - 1) {
            textNodes.push(document.createTextNode(" "));
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        textNodes.push(node.cloneNode(true));
      }
    });
    heading.innerHTML = "";
    textNodes.forEach((node) => heading.appendChild(node));

    const letters = heading.querySelectorAll(".at-letter-span");
    letters.forEach((letter, index) => {
      if (!letter) return;
      $(letter).on("mouseenter", () => {
        // center letter
        gsap.to(letter, {
          scaleY: 1.3,
          y: "-14%",
          duration: 0.4,
          ease: "sine",
        });

        // left neighbor
        const prev = letters[index - 1];
        if (prev) {
          gsap.to(prev, {
            scaleY: 1.1,
            y: "-5%",
            duration: 0.4,
            ease: "sine",
          });
        }

        // right neighbor
        const next = letters[index + 1];
        if (next) {
          gsap.to(next, {
            scaleY: 1.1,
            y: "-5%",
            duration: 0.4,
            ease: "sine",
          });
        }
      });

      $(letter).on("mouseleave", () => {
        // reset center letter
        gsap.to(letter, {
          scaleY: 1,
          y: "0%",
          duration: 0.4,
          ease: "sine",
        });

        // reset left and right neighbors
        const prev = letters[index - 1];
        const next = letters[index + 1];
        [prev, next].forEach((el) => {
          if (el) {
            gsap.to(el, {
              scaleY: 1,
              y: "0%",
              duration: 0.4,
              ease: "sine",
            });
          }
        });
      });
    });
  });
}

AnimateHeading2s();
AnimateHeadings();