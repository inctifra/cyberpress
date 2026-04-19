import $ from "jquery"

(function(){
    if ($("body").not(".is-mobile").hasClass("at-magic-cursor")) {
            $(".at-magnetic-item").wrap('<div class="at-magnetic-wrap"></div>');
    
            if ($("a.at-magnetic-item").length) {
                $("a.at-magnetic-item").addClass("not-hide-cursor");
            }
    
            var $mouse = { x: 0, y: 0 }; // Cursor position
            var $pos = { x: 0, y: 0 }; // Cursor position
            var $ratio = 0.15; // delay follow cursor
            var $active = false;
            var $ball = $("#ball");
    
            // Check if ball element exists
            if (!$ball.length) return;
    
            var $ballWidth = 14; // Ball default width
            var $ballHeight = 14; // Ball default height
            var $ballScale = 1; // Ball default scale
            var $ballOpacity = 1; // Ball default opacity
            var $ballBorderWidth = 1; // Ball default border width
    
            gsap.set($ball, {  // scale from middle and style ball
                xPercent: -50,
                yPercent: -50,
                width: $ballWidth,
                height: $ballHeight,
                borderWidth: $ballBorderWidth,
                opacity: $ballOpacity
            });
    
            document.addEventListener("mousemove", mouseMove);
    
            function mouseMove(e) {
                $mouse.x = e.clientX;
                $mouse.y = e.clientY;
            }
    
            gsap.ticker.add(updatePosition);
    
            function updatePosition() {
                if (!$active && $ball.length) {
                    $pos.x += ($mouse.x - $pos.x) * $ratio;
                    $pos.y += ($mouse.y - $pos.y) * $ratio;
    
                    gsap.set($ball, { x: $pos.x, y: $pos.y });
                }
            }
    
            $(".at-magnetic-wrap").on("mousemove", function (e) {
                parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
                callParallax(e, this);
            });
    
            function callParallax(e, parent) {
                parallaxIt(e, parent, parent.querySelector(".at-magnetic-item"), 25); // magnetic area = higher number is more attractive
            }
    
            function parallaxIt(e, parent, target, movement) {
                if (!target) return;
                var boundingRect = parent.getBoundingClientRect();
                var relX = e.clientX - boundingRect.left;
                var relY = e.clientY - boundingRect.top;
    
                gsap.to(target, {
                    duration: 0.3,
                    x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
                    y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
                    ease: Power2.easeOut
                });
            }
    
            function parallaxCursor(e, parent, movement) {
                if (!$ball.length) return;
                var rect = parent.getBoundingClientRect();
                var relX = e.clientX - rect.left;
                var relY = e.clientY - rect.top;
                $pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
                $pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
                gsap.to($ball, { duration: 0.3, x: $pos.x, y: $pos.y });
            }
    
    
            // Magnetic item hover.
            $(".at-magnetic-wrap").on("mouseenter", function (e) {
                if ($ball.length) {
                    gsap.to($ball, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $ballOpacity });
                }
                $active = true;
            }).on("mouseleave", function (e) {
                if ($ball.length) {
                    gsap.to($ball, { duration: 0.3, scale: $ballScale, borderWidth: $ballBorderWidth, opacity: $ballOpacity });
                }
                var magneticItem = this.querySelector(".at-magnetic-item");
                if (magneticItem) {
                    gsap.to(magneticItem, { duration: 0.3, x: 0, y: 0, clearProps: "all" });
                }
                $active = false;
            });
    
            // Cursor view on hover (data attribute "data-cursor="...").
            function myFunction(color = '#fff') {
                $("[data-cursor]").each(function () {
                    $(this).on("mouseenter", function () {
                        $("#ball").addClass("with-blur");
                        $ball.append('<div class="ball-view"></div>');
                        $(".ball-view").append($(this).attr("data-cursor"));
                        if ($ball.length) {
                            gsap.to($ball, {
                                duration: 0.3, xPercent: is_rtl() ? 50 : -50, yPercent: -60, width: 110, height: 110, opacity: 1, borderWidth: 0, zIndex: 1, backdropFilter: "blur(14px)",
                                backgroundColor: color,
                            });
                        }
                        var $ballView = $(".ball-view");
                        if ($ballView.length) {
                            gsap.to($ballView, { duration: 0.3, scale: 1, autoAlpha: 1 });
                        }
                    }).on("mouseleave", function () {
                        if ($ball.length) {
                            gsap.to($ball, { duration: 0.3, yPercent: -50, width: $ballWidth, height: $ballHeight, opacity: $ballOpacity, borderWidth: $ballBorderWidth, backgroundColor: "#000" });
                        }
                        var $ballView = $(".ball-view");
                        if ($ballView.length) {
                            gsap.to($ballView, { duration: 0.3, scale: 0, autoAlpha: 0, clearProps: "all" });
                            $ball.find(".ball-view").remove();
                        }
                    });
                    $(this).addClass("not-hide-cursor");
                });
            }
            if (document.querySelector('.cursor-bg-red')) {
                myFunction('#ff6d00')
            } if (document.querySelector('.cursor-bg-red-2')) {
                myFunction('#FF481F')
            } if (document.querySelector('.cursor-white-bg')) {
                myFunction('#FFF')
            }
    
            // Show/hide magic cursor // 
    
            // Hide on hover//
            $("a, button") // class "hide-cursor" is for global use.
                .not('.cursor-hide') // omit from selection.
                .on("mouseenter", function () {
                    if ($ball.length) {
                        gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
                    }
                }).on("mouseleave", function () {
                    if ($ball.length) {
                        gsap.to($ball, { duration: 0.3, scale: $ballScale, opacity: $ballOpacity });
                    }
                });
    
            // Hide on click//
            $("a")
                .not('[target="_blank"]') // omit from selection.
                .not('.cursor-hide') // omit from selection.
                .not('[href^="#"]') // omit from selection.
                .not('[href^="mailto"]') // omit from selection.
                .not('[href^="tel"]') // omit from selection.
                .not(".lg-trigger") // omit from selection.
                .not(".at-btn-disabled a") // omit from selection.
                .on('click', function () {
                    if ($ball.length) {
                        gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
                    }
                });
    
            // Show/hide on document leave/enter//
            var $magicCursor = $("#magic-cursor");
            if ($magicCursor.length) {
                $("body").on("mouseleave", function () {
                    gsap.to($magicCursor, { duration: 0.3, autoAlpha: 0 });
                }).on("mouseenter", function () {
                    gsap.to($magicCursor, { duration: 0.3, autoAlpha: 1 });
                });
    
                // Show as the mouse moves//
                $("body").mousemove(function () {
                    gsap.to($magicCursor, { duration: 0.3, autoAlpha: 1 });
                });
            }
        }

})

