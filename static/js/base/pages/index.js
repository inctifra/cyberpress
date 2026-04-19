import $ from "jquery";
import gsap from "gsap"

(function () {
    'use strict';

    var windowOn = $(window);

    ////////////////////////////////////////////////////
    // 01. PreLoader Js
    windowOn.on('load', function () {
        setTimeout(function () {
            $('.page-loader').fadeOut('slow');
        }, 1000);
        gsap.to('.bar', 1.5, {
            delay: 0,
            height: 0,
            stagger: {
                amount: 0.5,
            },
            ease: 'power4.inOut',
        });
    });
    var logoLoading = document.querySelector('.page-loader-logo img');
    logoLoading.addEventListener('load', function () {
        gsap.to(logoLoading, { duration: 1, scale: 1.5 });
    });

    ////////////////////////////////////////////////////
    // 02. Common Js
    $('[data-background').each(function () {
        $(this).css('background-image', 'url( ' + $(this).attr('data-background') + '  )');
    });

    $('[data-width]').each(function () {
        $(this).css('width', $(this).attr('data-width'));
    });

    $('[data-height]').each(function () {
        $(this).css('height', $(this).attr('data-height'));
    });

    $('[data-bg-color]').each(function () {
        $(this).css('background-color', $(this).attr('data-bg-color'));
    });

    $('[data-text-color]').each(function () {
        $(this).css('color', $(this).attr('data-text-color'));
    });

    ////////////////////////////////////////////////////
    // 03. Nice Select Js
    $('.at-select').niceSelect();

    ////////////////////////////////////////////////////
    // 04. magnificPopup img view
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
        },
    });

    ////////////////////////////////////////////////////
    // 05. magnificPopup video view
    $('.popup-video').magnificPopup({
        type: 'iframe',
    });

    ////////////////////////////////////////////////////
    // 06. back to top
    function back_to_top() {
        var $btn = $('#back_to_top');
        var $wrapper = $('.back-to-top-wrapper');

        // Scroll event (proper .on binding)
        windowOn.on('scroll', function () {
            if (windowOn.scrollTop() > 300) {
                $wrapper.addClass('back-to-top-btn-show');
            } else {
                $wrapper.removeClass('back-to-top-btn-show');
            }
        });

        // Click event (delegation-safe)
        $(document).on('click', '#back_to_top', function (e) {
            e.preventDefault();

            $('html, body').animate({ scrollTop: 0 }, 300);
        });
    }

    back_to_top();

    ////////////////////////////////////////////////////
    // 07. scroll wrapper
    if (typeof gsap !== 'undefined') {
        let tl = gsap.timeline();
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

        // Footer Fixed Bottom Reveal Effect (Kanso style) - Setup BEFORE ScrollSmoother
        const footerFixedBottom = document.querySelector('.footer-fixed-bottom');
        const footerFixedBottomInner = document.querySelector('.footer-fixed-bottom .at-footer-area');
        const footerPlaceholder = document.querySelector('.footer-placeholder');

        if (footerFixedBottom && footerPlaceholder) {
            // Set placeholder height to match footer height
            footerPlaceholder.style.height = footerFixedBottom.offsetHeight + 'px';

            // Update on window resize
            window.addEventListener('resize', () => {
                footerPlaceholder.style.height = footerFixedBottom.offsetHeight + 'px';
                ScrollTrigger.refresh();
            });
        }

        if ($('#smooth-wrapper').length && $('#smooth-content').length) {
            ScrollSmoother.create({
                smooth: 1.35,
                effects: true,
                smoothTouch: 0.15,
                ignoreMobileResize: true,
            });

            // Setup footer reveal animation after ScrollSmoother
            const mainElement = document.querySelector('#smooth-content main');

            if (footerFixedBottom && mainElement && footerPlaceholder) {
                // Set initial footer scale
                gsap.set(footerFixedBottomInner, { scale: 0.95 });

                // Create a timeline for synchronized animations
                const footerRevealTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: footerPlaceholder,
                        start: 'top bottom',
                        end: 'bottom bottom',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Animate main element pulling up
                footerRevealTimeline.to(
                    mainElement,
                    {
                        y: () => -footerFixedBottom.offsetHeight,
                        ease: 'none',
                    },
                    0,
                );

                // Animate footer scaling up (from 0.85 to 1.0)
                footerRevealTimeline.to(
                    footerFixedBottomInner,
                    {
                        scale: 1,
                        ease: 'none',
                    },
                    0,
                );
            }
        }
    }

    ////////////////////////////////////////////////////
    // 08. mobile menu Js
    var tpMenuWrap = $('.at-mobile-menu-active > ul').clone();
    var tpSideMenu = $('.at-offcanvas-menu nav');
    tpSideMenu.append(tpMenuWrap);
    if ($(tpSideMenu).find('.at-submenu').length != 0) {
        $(tpSideMenu).find('.at-submenu').parent().append('<button class="at-menu-close"><i class="fa-solid fa-plus"></i></button>');
    }
    var sideMenuList = $('.at-offcanvas-menu nav > ul > li button.at-menu-close, .at-offcanvas-menu nav > ul li.has-dropdown > a, .at-offcanvas-menu nav > ul li.has-dropdown > ul > li.menu-item-has-children > a');
    $(sideMenuList).on('click', function (e) {
        e.preventDefault();
        if (!$(this).parent().hasClass('active')) {
            $(this).parent().addClass('active');
            $(this).siblings('.at-submenu').slideDown();
        } else {
            $(this).siblings('.at-submenu').slideUp();
            $(this).parent().removeClass('active');
        }
    });

    // px-offcanvas-2-area
    const $main_wrap = $('.at-offcanvas-2-area');
    const $openBtn = $('.hamburger-open-btn');
    const $closeBtn = $('.hamburger-close-btn');

    // Open menu
    $openBtn.on('click', function () {
        $main_wrap.addClass('menu-open');
        $openBtn.addClass('active');
        $closeBtn.addClass('active');
    });

    // Close menu
    $closeBtn.on('click', function () {
        $main_wrap.removeClass('menu-open');
        $main_wrap.addClass('menu-open-temp');
        setTimeout(() => {
            $main_wrap.removeClass('menu-open-temp');
        }, 2000);
        $openBtn.removeClass('active');
        $closeBtn.removeClass('active');
    });

    ////////////////////////////////////////////////////
    // 09. auto update year
    $('#year').text(new Date().getFullYear());

    ////////////////////////////////////////////////////
    // 10. Sidebar Js
    $('.at-menu-bar').on('click', function () {
        $('.at-offcanvas').addClass('opened');
        $('.body-overlay').addClass('apply');
    });
    $('.close-btn').on('click', function () {
        $('.at-offcanvas').removeClass('opened');
        $('.body-overlay').removeClass('apply');
    });
    $('.body-overlay').on('click', function () {
        $('.at-offcanvas').removeClass('opened');
        $('.body-overlay').removeClass('apply');
    });


    ////////////////////////////////////////////////////
    // 11. Close Handlers (cartmini / body-overlay)
    $('.cartmini-close-btn, .body-overlay').on('click', function () {
        $('.cartmini__area').removeClass('opened cartmini-opened');
        $('.body-overlay').removeClass('apply');
    });

    ////////////////////////////////////////////////////
    // 12. Search Js
    $('.at-search-click').on('click', function () {
        $('.at-search-form-toggle,.at-search-body-overlay').addClass('active');
    });

    $('.at-search-close,.at-search-body-overlay').on('click', function () {
        $('.at-search-form-toggle,.at-search-body-overlay').removeClass('active');
    });

    ////////////////////////////////////////////////////
    // 13. portfolio-item-hover (service-item hover)
    document.addEventListener('DOMContentLoaded', function () {
        let serviceItems = document.querySelectorAll('.service-item');
        let images = document.querySelectorAll('.hover-image');

        // initial state
        if (images.length > 0) {
            gsap.set(images, { opacity: 0, y: 50, scale: 1 });
            if (images[0]) {
                gsap.set(images[0], { opacity: 1, y: 0, zIndex: 2 });
            }
        }

        serviceItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function () {
                serviceItems.forEach((el) => el.classList.remove('active'));
                this.classList.add('active');
                images.forEach((img, i) => {
                    if (i === index) {
                        gsap.to(img, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            scrub: 1,
                            zIndex: 2,
                        });
                    } else {
                        gsap.to(img, {
                            opacity: 0,
                            y: 200,
                            duration: 0.8,
                            zIndex: 1,
                            scale: 0.8,
                        });
                    }
                });
            });
        });
    });

    ////////////////////////////////////////////////////
    // 14. card-award hover (expanded image follows cursor)
    if (typeof gsap !== 'undefined' && document.querySelectorAll('.card-award').length > 0) {
        (function initCardAwardPreview() {
            const cards = document.querySelectorAll('.card-award');
            let preview = document.querySelector('.card-award-hover-preview');
            if (!preview) {
                preview = document.createElement('div');
                preview.className = 'card-award-preview card-award-hover-preview';
                preview.innerHTML = '<img src="" alt="orisa">';
                document.body.appendChild(preview);
            }
            const img = preview.querySelector('img');
            if (!img) return;
            const offsetX = 18;
            const offsetY = 18;
            let xTo = null;
            let yTo = null;
            let curCard = null;
            let hideTimeout = null;

            function getRotateOptions(card) {
                const rotateAttr = card.getAttribute('data-rotate');
                if (!rotateAttr) return { isReversed: false, rotation: -15 };
                const match = rotateAttr.match(/positive-(\d+)deg/i) || rotateAttr.match(/(\d+)deg/i);
                const deg = match ? parseInt(match[1], 10) : 15;
                const isPositive = /positive/i.test(rotateAttr);
                return { isReversed: isPositive, rotation: isPositive ? deg : -deg };
            }

            function updatePosition(e) {
                if (!xTo || !yTo || !curCard) return;
                const opts = getRotateOptions(curCard);
                const x = opts.isReversed ? e.clientX - offsetX : e.clientX + offsetX;
                xTo(x);
                yTo(e.clientY + offsetY);
            }

            function scheduleHide() {
                if (hideTimeout) clearTimeout(hideTimeout);
                hideTimeout = setTimeout(function () {
                    hideTimeout = null;
                    const opts = curCard ? getRotateOptions(curCard) : { isReversed: false };
                    curCard = null;
                    gsap.to(preview, {
                        opacity: 0,
                        scale: opts.isReversed ? 1.2 : 0,
                        duration: 0.28,
                        ease: opts.isReversed ? 'power2.in' : 'power2.in',
                        onComplete: function () {
                            gsap.set(preview, { visibility: 'hidden' });
                        },
                    });
                }, 120);
            }

            function showPreview(card, e) {
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                const src = card.getAttribute('data-img-award');
                if (!src) return;
                curCard = card;
                img.src = src;
                img.alt = card.querySelector('.card-award-title')?.textContent?.trim() || 'Award';
                const opts = getRotateOptions(card);

                if (opts.isReversed) {
                    gsap.set(preview, {
                        visibility: 'visible',
                        transformOrigin: 'right bottom',
                        rotation: opts.rotation,
                        x: e.clientX - offsetX,
                        y: e.clientY + offsetY,
                        xPercent: -100,
                        yPercent: -100,
                        scale: 0,
                        opacity: 0,
                    });
                    if (!xTo) xTo = gsap.quickTo(preview, 'x', { duration: 0.35, ease: 'power2.out' });
                    if (!yTo) yTo = gsap.quickTo(preview, 'y', { duration: 0.35, ease: 'power2.out' });
                    gsap.to(preview, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'back.out(1.15)',
                    });
                } else {
                    // Keep legacy behavior: right side of mouse, rotate -15deg, scale 0 -> 1
                    gsap.set(preview, {
                        visibility: 'visible',
                        transformOrigin: 'left bottom',
                        rotation: opts.rotation,
                        x: e.clientX + offsetX,
                        y: e.clientY + offsetY,
                        xPercent: 0,
                        yPercent: -100,
                        scale: 0,
                        opacity: 0,
                    });
                    if (!xTo) xTo = gsap.quickTo(preview, 'x', { duration: 0.35, ease: 'power2.out' });
                    if (!yTo) yTo = gsap.quickTo(preview, 'y', { duration: 0.35, ease: 'power2.out' });
                    gsap.to(preview, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'back.out(1.15)',
                    });
                }
            }
            cards.forEach(function (card) {
                const src = card.getAttribute('data-img-award');
                if (!src) return;

                card.addEventListener('mouseenter', function (e) {
                    if (window.innerWidth < 768) return;
                    showPreview(card, e);
                    card.addEventListener('mousemove', updatePosition);
                });

                card.addEventListener('mouseleave', function (e) {
                    card.removeEventListener('mousemove', updatePosition);
                    var related = e.relatedTarget;
                    var isEnteringCard = related && related.closest && related.closest('.card-award');
                    if (isEnteringCard) return;
                    scheduleHide();
                });
            });
        })();
    }

    ////////////////////////////////////////////////////
    // 15. panel pin section (at-panel-pin)
    if (typeof gsap !== 'undefined') {
        let pr = gsap.matchMedia();
        pr.add('(min-width: 1199px)', () => {
            let panels = document.querySelectorAll('.at-panel-pin');
            if (panels.length > 0) {
                let tl = gsap.timeline();
                panels.forEach((section, index) => {
                    if (section) {
                        tl.to(section, {
                            scrollTrigger: {
                                trigger: section,
                                pin: section,
                                scrub: 1,
                                start: 'top 5%',
                                end: 'bottom 90%',
                                endTrigger: '.at-panel-pin-area',
                                pinSpacing: false,
                                // markers: true,
                            },
                        });
                    }
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 16. reveal-text
    if ($('.reveal-text').length) {
        var textheading = $('.reveal-text');

        if (textheading.length === 0) return;
        gsap.registerPlugin(SplitText);
        textheading.each(function (index, el) {
            el.split = new SplitText(el, {
                type: 'lines,words,chars',
                linesClass: 'split-line',
            });

            if (el.split && el.split.chars && el.split.chars.length > 0) {
                if ($(el).hasClass('reveal-text')) {
                    gsap.set(el.split.chars, {
                        opacity: 0.3,
                        x: '-7',
                    });
                }
                el.anim = gsap.to(el.split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        end: 'top 20%',
                        markers: false,
                        scrub: 1,
                    },

                    x: '0',
                    y: '0',
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2,
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 17. webgl images hover animation
    if ($('.at-hover-item').length) {
        let hoverAnimation__do = function (t, n) {
            let a = new hoverEffect({
                parent: t.get(0),
                intensity: t.data('intensity') || void 0,
                speedIn: t.data('speedin') || void 0,
                speedOut: t.data('speedout') || void 0,
                easing: t.data('easing') || void 0,
                hover: t.data('hover') || void 0,
                image1: n.eq(0).attr('src'),
                image2: n.eq(0).attr('src'),
                displacementImage: t.data('displacement'),
                imagesRatio: n[0].height / n[0].width,
                hover: !1,
            });
            t.closest('.at-hover-item')
                .on('mouseenter', function () {
                    a.next();
                })
                .on('mouseleave', function () {
                    a.previous();
                });
        };
        let hoverAnimation = function () {
            $('.at-hover-img').each(function () {
                let n = $(this);
                let e = n.find('img');
                let i = e.eq(0);
                i[0].complete
                    ? hoverAnimation__do(n, e)
                    : i.on('load', function () {
                          hoverAnimation__do(n, e);
                      });
            });
        };
        hoverAnimation();
    }

    ////////////////////////////////////////////////////
    // 18. Section to title zoom and item uper
    if (typeof gsap !== 'undefined') {
        gsap.matchMedia().add('(min-width: 1200px)', () => {
            const portfolioArea = document.querySelector('.portfolio-area');
            const portfolioText = document.querySelector('.portfolio-text');

            if (portfolioArea && portfolioText) {
                // Timeline
                let portfolioline = gsap.timeline({
                    scrollTrigger: {
                        trigger: portfolioArea,
                        start: 'top center-=200',
                        pin: portfolioText,
                        end: 'bottom bottom+=10',
                        markers: false,
                        pinSpacing: false,
                        scrub: 1,
                        // markers: true,
                    },
                });

                // Get container dimensions for diagonal movement
                const areaRect = portfolioArea.getBoundingClientRect();
                const textRect = portfolioText.getBoundingClientRect();

                // Calculate end positions (bottom-right corner minus text size)
                const endX = areaRect.width - textRect.width - 50;
                const endY = areaRect.height - textRect.height - 50;

                portfolioline.fromTo(portfolioText, { x: 0, y: 0, scale: 1 }, { x: endX, y: endY, scale: 1, duration: 1, ease: 'none' });

                // Opacity scroll animation
                gsap.to(portfolioText, {
                    scrollTrigger: {
                        trigger: portfolioArea,
                        start: 'top center-=100',
                        end: 'bottom bottom+=10',
                        scrub: 1,
                    },
                    opacity: 0,
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 19. anim-zoomin + gallery isotope
    if (typeof gsap !== 'undefined') {
        $('.anim-zoomin').each(function () {
            // Add wrap <div>.
            $(this).wrap('<div class="anim-zoomin-wrap"></div>');

            // Add overflow hidden.
            $('.anim-zoomin-wrap').css({ overflow: 'hidden' });

            let $this = $(this);
            let $asiWrap = $this.parents('.anim-zoomin-wrap');

            if ($asiWrap.length && $this.length) {
                let tp_ZoomIn = gsap.timeline({
                    scrollTrigger: {
                        trigger: $asiWrap[0],
                        start: 'top 100%',
                        markers: false,
                    },
                });
                tp_ZoomIn.from($this[0], { duration: 2, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps: 'all' });
            }
        });
    }
    $('.gallery').isotope({
        itemSelector: '.items'
    });


    
    ////////////////////////////////////////////////////
    // 20. scale-img-from-to
    if (typeof gsap !== 'undefined') {
        const scaleImage = document.querySelectorAll('.scale-img-from-to');
        scaleImage.forEach((section) => {
            if (!section) return;
            var value1 = section.getAttribute('data-value-1');
            var value2 = section.getAttribute('data-value-2');

            if (window.innerWidth < 1200) {
                value1 = Math.max(0.95, value1);
            }

            gsap.fromTo(
                section,
                {
                    ease: 'sine',
                    scale: value1,
                },
                {
                    scale: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        });
    }

    ////////////////////////////////////////////////////
    // 21. text-scale-anim
    if (typeof gsap !== 'undefined') {
        const headings = document.querySelectorAll('.text-scale-anim');
        headings.forEach((heading) => {
            if (!heading) return;
            const textNodes = [];
            heading.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent.split(' ').forEach((word, index, array) => {
                        const wordSpan = document.createElement('span');
                        wordSpan.classList.add('at-word-span');
                        word.split('').forEach((letter) => {
                            const letterSpan = document.createElement('span');
                            letterSpan.classList.add('at-letter-span');
                            letterSpan.textContent = letter;
                            wordSpan.appendChild(letterSpan);
                        });
                        textNodes.push(wordSpan);
                        if (index < array.length - 1) {
                            textNodes.push(document.createTextNode(' '));
                        }
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    textNodes.push(node.cloneNode(true));
                }
            });
            heading.innerHTML = '';
            textNodes.forEach((node) => heading.appendChild(node));

            const letters = heading.querySelectorAll('.at-letter-span');
            letters.forEach((letter, index) => {
                if (!letter) return;
                $(letter).on('mouseenter', () => {
                    // center letter
                    gsap.to(letter, {
                        scaleY: 1.6,
                        y: '-24%',
                        duration: 0.4,
                        ease: 'sine',
                    });

                    // left neighbor
                    const prev = letters[index - 1];
                    if (prev) {
                        gsap.to(prev, {
                            scaleY: 1.3,
                            y: '-12%',
                            duration: 0.4,
                            ease: 'sine',
                        });
                    }

                    // right neighbor
                    const next = letters[index + 1];
                    if (next) {
                        gsap.to(next, {
                            scaleY: 1.3,
                            y: '-12%',
                            duration: 0.4,
                            ease: 'sine',
                        });
                    }
                });

                $(letter).on('mouseleave', () => {
                    // reset center letter
                    gsap.to(letter, {
                        scaleY: 1,
                        y: '0%',
                        duration: 0.4,
                        ease: 'sine',
                    });

                    // reset left and right neighbors
                    const prev = letters[index - 1];
                    const next = letters[index + 1];
                    [prev, next].forEach((el) => {
                        if (el) {
                            gsap.to(el, {
                                scaleY: 1,
                                y: '0%',
                                duration: 0.4,
                                ease: 'sine',
                            });
                        }
                    });
                });
            });
        });
    }

    ////////////////////////////////////////////////////
    // 22. text-scale-anim-2
    if (typeof gsap !== 'undefined') {
        const headings2 = document.querySelectorAll('.text-scale-anim-2');
        headings2.forEach((heading) => {
            if (!heading) return;
            const textNodes = [];
            heading.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent.split(' ').forEach((word, index, array) => {
                        const wordSpan = document.createElement('span');
                        wordSpan.classList.add('at-word-span');
                        word.split('').forEach((letter) => {
                            const letterSpan = document.createElement('span');
                            letterSpan.classList.add('at-letter-span');
                            letterSpan.textContent = letter;
                            wordSpan.appendChild(letterSpan);
                        });
                        textNodes.push(wordSpan);
                        if (index < array.length - 1) {
                            textNodes.push(document.createTextNode(' '));
                        }
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    textNodes.push(node.cloneNode(true));
                }
            });
            heading.innerHTML = '';
            textNodes.forEach((node) => heading.appendChild(node));

            const letters = heading.querySelectorAll('.at-letter-span');
            letters.forEach((letter, index) => {
                if (!letter) return;
                $(letter).on('mouseenter', () => {
                    // center letter
                    gsap.to(letter, {
                        scaleY: 1.3,
                        y: '-14%',
                        duration: 0.4,
                        ease: 'sine',
                    });

                    // left neighbor
                    const prev = letters[index - 1];
                    if (prev) {
                        gsap.to(prev, {
                            scaleY: 1.1,
                            y: '-5%',
                            duration: 0.4,
                            ease: 'sine',
                        });
                    }

                    // right neighbor
                    const next = letters[index + 1];
                    if (next) {
                        gsap.to(next, {
                            scaleY: 1.1,
                            y: '-5%',
                            duration: 0.4,
                            ease: 'sine',
                        });
                    }
                });

                $(letter).on('mouseleave', () => {
                    // reset center letter
                    gsap.to(letter, {
                        scaleY: 1,
                        y: '0%',
                        duration: 0.4,
                        ease: 'sine',
                    });

                    // reset left and right neighbors
                    const prev = letters[index - 1];
                    const next = letters[index + 1];
                    [prev, next].forEach((el) => {
                        if (el) {
                            gsap.to(el, {
                                scaleY: 1,
                                y: '0%',
                                duration: 0.4,
                                ease: 'sine',
                            });
                        }
                    });
                });
            });
        });
    }

    ////////////////////////////////////////////////////
    // 23. scroll-scale-up-img
    if (typeof gsap !== 'undefined') {
        document.querySelectorAll('.scale-up-img').forEach((section) => {
            if (!section) return;
            const scaleUpElement = section.querySelector('.scale-up');
            if (!scaleUpElement) return;

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom center',
                    scrub: 1,
                    markers: false,
                },
            });

            tl.to(scaleUpElement, {
                scale: 1.15,
                duration: 1,
            });
        });
    }

    ////////////////////////////////////////////////////
    // 24. postbox-scroll-zoom (20% initial, zoom on scroll to center, play btn near end)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        document.querySelectorAll('.postbox-scroll-zoom').forEach((section) => {
            const itemwrap = section.querySelector('.postbox-item');
            const thumb = section.querySelector('.postbox-thumb');
            const playBtn = section.querySelector('.postbox-scroll-zoom-play');
            if (!thumb || !playBtn) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: itemwrap,
                    start: 'top top',
                    end: 'bottom top',
                    pin: true,
                    scrub: 1,
                    toggleActions: 'play none none reverse',
                    markers: false,
                },
            });
            tl.fromTo(
                thumb,
                {
                    width: '20%',
                    height: '20%',
                    duration: 1,
                    ease: 'none',
                },
                {
                    width: '100%',
                    height: '100%',
                    duration: 1,
                    ease: 'none',
                },
                '<',
            );
            tl.fromTo(playBtn, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, ease: 'none' }, 0.78);
            tl.call(() => section.classList.add('postbox-scroll-zoom-ready'), [], 0.78);
        });
    }

    ////////////////////////////////////////////////////
    // 25. Sticky Header Js
    windowOn.on('scroll', function () {
        let scroll = windowOn.scrollTop();
        if (scroll < 20) {
            $('#header-sticky').removeClass('header-sticky');
        } else {
            $('#header-sticky').addClass('header-sticky');
        }
    });

    ////////////////////////////////////////////////////
    // 26. scroll-brand-logo
    if (typeof gsap !== 'undefined') {
        const LOGO_HEIGHT = window.matchMedia('(max-width: 991px)').matches ? 60 : 70;
        document.querySelectorAll('.at-brand-scroll .at-brand-item .brand').forEach((brandEl) => {
            const slides = Array.from(brandEl.querySelectorAll('.brand-logo-slide'));
            if (!slides.length) return;
            const viewport = document.createElement('div');
            viewport.className = 'brand-logo-viewport';
            const track = document.createElement('div');
            track.className = 'brand-logo-track';
            brandEl.insertBefore(viewport, slides[0]);
            viewport.appendChild(track);
            const shuffled = slides.slice().sort(() => Math.random() - 0.5);
            shuffled.forEach((s) => track.appendChild(s));
            const clone = shuffled[0].cloneNode(true);
            track.appendChild(clone);
            gsap.set(track, { y: 0 });
            const initialDelay = Math.random() * 1.5;
            const scrollDuration = 1;
            const pauseDuration = 1 + Math.random() * 0.8;
            const tl = gsap.timeline({ repeat: -1 });
            tl.to({}, { duration: initialDelay });
            for (let i = 0; i < shuffled.length; i++) {
                tl.to({}, { duration: pauseDuration });
                const yNext = -(i + 1) * LOGO_HEIGHT;
                tl.to(track, { y: yNext, duration: scrollDuration, ease: 'power2.inOut' });
            }
            tl.add(() => gsap.set(track, { y: 0 }));
        });
    }

    ////////////////////////////////////////////////////
    // 27. move-up
    if (typeof gsap !== 'undefined') {
        const moveUp = document.querySelectorAll('.move-up');
        if (moveUp.length > 0 && moveUp[0]) {
            gsap.to(Array.from(moveUp), {
                transformOrigin: 'top',
                y: '-500px',
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: moveUp[0],
                    start: 'top center',
                    scrub: 1,
                },
            });
        }
    }

    ////////////////////////////////////////////////////
    // 28. at-about-svg-wrap
    if (typeof gsap !== 'undefined') {
        const aboutSvg = document.querySelectorAll('.at-about-svg-wrap');
        aboutSvg.forEach((svg) => {
            if (!svg) return;
            const svgLeft = svg.querySelector('svg:nth-child(1)');
            const svgCenter = svg.querySelector('svg:nth-child(2)');
            const svgRight = svg.querySelector('svg:nth-child(3)');

            if (svgLeft) {
                gsap.from(svgLeft, {
                    transformOrigin: 'left center',
                    duration: 1,
                    ease: 'power2.out',
                    x: '-100px',
                    scrollTrigger: {
                        trigger: svg,
                        start: 'top 90%',
                        end: 'bottom center',
                        scrub: 1,
                    },
                });
            }
            if (svgCenter) {
                gsap.from(svgCenter, {
                    transformOrigin: 'center center',
                    duration: 1,
                    ease: 'power2.out',
                    y: '-100px',
                    scrollTrigger: {
                        trigger: svg,
                        start: 'top 90%',
                        end: 'bottom center',
                        scrub: 1,
                    },
                });
            }
            if (svgRight) {
                gsap.from(svgRight, {
                    transformOrigin: 'right center',
                    duration: 1,
                    ease: 'power2.out',
                    x: '100px',
                    scrollTrigger: {
                        trigger: svg,
                        start: 'top 90%',
                        end: 'bottom center',
                        scrub: 1,
                    },
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 29. at-title-text
    function initProject() {
        const titleElements = document.querySelectorAll('.at-title-text');
        if (!titleElements.length) return;

        titleElements.forEach((textEl) => {
            const text = textEl.textContent.trim();
            textEl.setAttribute('aria-label', text); // Accessibility

            const html = [...text]
                .map((char, i) => {
                    const safeChar = char === ' ' ? '&nbsp;' : char;
                    return `<span class="char" aria-hidden="true" style="--char:${i + 1};">${safeChar}</span>`;
                })
                .join('');

            textEl.innerHTML = html;
        });
    }

    initProject();

    ////////////////////////////////////////////////////
    // 30. panel pin section (mg-portfolio-pin)
    if (typeof gsap !== 'undefined') {
        let pr2 = gsap.matchMedia();
        pr2.add('(min-width: 1199px)', () => {
            let panels = document.querySelectorAll('.mg-portfolio-pin');
            if (panels.length > 0) {
                let tl = gsap.timeline();
                panels.forEach((section, index) => {
                    if (section) {
                        tl.to(section, {
                            scrollTrigger: {
                                trigger: section,
                                pin: section,
                                scrub: 1,
                                start: 'top 5%',
                                end: 'bottom 90%',
                                endTrigger: '.mg-portfolio-area',
                                pinSpacing: false,
                                // markers: true,
                            },
                        });
                    }
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 31. panel pin section (at-header-pin)
    if (typeof gsap !== 'undefined') {
        let pr2 = gsap.matchMedia();
        pr2.add('(min-width: 1199px)', () => {
            let panels = document.querySelectorAll('.at-header-pin');
            if (panels.length > 0) {
                let tl = gsap.timeline();
                panels.forEach((section, index) => {
                    if (section) {
                        tl.to(section, {
                            scrollTrigger: {
                                trigger: section,
                                pin: section,
                                scrub: 1,
                                start: '30% top',
                                end: 'bottom bottom',
                                endTrigger: '.home-2-section-13',
                                pinSpacing: false,
                                // markers: true,
                            },
                        });
                    }
                });
            }
        });
    }
    ////////////////////////////////////////////////////
    // 32. section-fix (pin section-title + stacking cards)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        function initSectionFix() {
            const sectionFixList = document.querySelectorAll('.section-fix');
            if (!sectionFixList.length) return;

            sectionFixList.forEach((sectionFix) => {
                const sectionTitlePin = sectionFix.querySelector('.section-title-pin');
                const scrollSectionEl = sectionFix.querySelector('.scroll-section.vertical-section');
                if (!scrollSectionEl || !sectionTitlePin) return;
                const wrapper = scrollSectionEl.querySelector('.wrapper');
                if (!wrapper) return;
                const items = wrapper.querySelectorAll('.item');
                if (!items.length) return;

                items.forEach((item, index) => {
                    if (index !== 0) gsap.set(item, { yPercent: 100 });
                });

                const scrollDistance = items.length * 50;
                const navList = sectionFix.querySelector('.navigation-active-item');
                const navItems = navList ? navList.querySelectorAll('li .item') : [];

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionFix,
                        pin: true,
                        start: 'top top',
                        end: () => `+=${scrollDistance}%`,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const progress = Math.min(Math.max(self.progress, 0), 0.9999);
                            const index = Math.min(Math.floor(progress * items.length), items.length - 1);
                            items.forEach((el, i) => el.classList.toggle('active', i === index));
                            navItems.forEach((el, i) => el.classList.toggle('active', i === index));
                        },
                    },
                    defaults: { ease: 'none', duration: 1 },
                });

                items.forEach((item, index) => {
                    tl.to(item, { scale: 0.9 });
                    if (items[index + 1]) {
                        tl.to(items[index + 1], { yPercent: 0 }, '<');
                    }
                });

                function updateActiveByProgress() {
                    if (tl.scrollTrigger && tl.scrollTrigger.isActive()) {
                        const progress = Math.min(Math.max(tl.scrollTrigger.progress, 0), 0.9999);
                        const index = Math.min(Math.floor(progress * items.length), items.length - 1);
                        items.forEach((el, i) => el.classList.toggle('active', i === index));
                        navItems.forEach((el, i) => el.classList.toggle('active', i === index));
                    }
                }
                ScrollTrigger.addEventListener('scroll', updateActiveByProgress);
            });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSectionFix);
        } else {
            initSectionFix();
        }
        window.addEventListener('load', function () {
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        });
    }

    ////////////////////////////////////////////////////
    // 33. section-title-pin
    if (typeof gsap !== 'undefined') {
        let pr3 = gsap.matchMedia();
        pr3.add('(min-width: 1400px)', () => {
            let panels = document.querySelectorAll('.section-title-pin');
            if (panels.length > 0) {
                panels.forEach((section) => {
                    if (!section || section.closest('.section-fix')) return;
                    gsap.to(section, {
                        scrollTrigger: {
                            trigger: section,
                            pin: section,
                            scrub: 1,
                            start: 'top bottom+=200',
                            endTrigger: section.closest('section') || 'body',
                            end: 'bottom top',
                            pinSpacing: false,
                        },
                    });
                });
            }
        });
    }

    ////////////////////////////////////////////////////
    // 34. data-countdown
    if ($("[data-countdown]").length > 0) {
        let countdown = $("[data-countdown]");
        countdown.each(function () {
            var $this = $(this);
            var dateStr = $this.attr("data-countdown") || $this.data("countdown");
            if (!dateStr) return;
            var finalDate = new Date(dateStr.replace(/\//g, "-"));
            if (isNaN(finalDate.getTime())) return;

            function updateCountdown() {
                var now = new Date();
                var diff = finalDate.getTime() - now.getTime();
                if (diff <= 0) {
                    $this.html('<span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> days </span></span><span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> hours </span></span><span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> mins </span></span><span class="countdown-section"><span class="countdown-amount">0</span><span class="countdown-period"> secs </span></span>');
                    clearInterval(timer);
                    return;
                }
                var d = Math.floor(diff / (1000 * 60 * 60 * 24));
                var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                var s = Math.floor((diff % (1000 * 60)) / 1000);
                $this.html(
                    '<span class="countdown-section"><span class="countdown-amount">' + d + '</span><span class="countdown-period"> days </span></span>' +
                    '<span class="countdown-section"><span class="countdown-amount">' + h + '</span><span class="countdown-period"> hours </span></span>' +
                    '<span class="countdown-section"><span class="countdown-amount">' + m + '</span><span class="countdown-period"> mins </span></span>' +
                    '<span class="countdown-section"><span class="countdown-amount">' + s + '</span><span class="countdown-period"> secs </span></span>'
                );
            }
            updateCountdown();
            var timer = setInterval(updateCountdown, 1000);
        });
    }


    ////////////////////////////////////////////////////
    // 35. at-item-anime marque
    if (typeof gsap !== 'undefined') {
        if ($('.at-item-anime').length > 0) {
            const marqueElements = document.querySelectorAll('.at-item-anime.marque');
            const triggerElement = document.querySelector('.at-item-anime-area');
            if (marqueElements.length > 0 && triggerElement) {
                gsap.set(Array.from(marqueElements), {
                    x: '35%',
                });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerElement,
                        start: '-1000 0%',
                        end: 'bottom 0%',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }).to(Array.from(marqueElements), {
                    x: '-200%',
                });
            }
        }
        // at-item-anime marque-2
        if ($('.at-item-anime-2').length > 0) {
            const marqueElements2 = document.querySelectorAll('.at-item-anime-2.marque');
            const triggerElement2 = document.querySelector('.at-item-anime-area-2');
            if (marqueElements2.length > 0 && triggerElement2) {
                gsap.set(Array.from(marqueElements2), {
                    x: '35%',
                });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerElement2,
                        start: '-1000 0%',
                        end: 'bottom 0%',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }).to(Array.from(marqueElements2), {
                    x: '-200%',
                });
            }
        }
    }

    ////////////////////////////////////////////////////
    // 36. at-pricing-area
    function tabtable_active() {
        const $elements = {
            monthly: $('#at-nav-monthly'),
            yearly: $('#at-nav-yearly'),
            switcher: $('#at-switcher-input'),
            tabMonthly: $('#at-tab-monthly'),
            tabYearly: $('#at-tab-yearly'),
        };

        const setActive = (isMonthly) => {
            $elements.switcher.prop('checked', isMonthly);
            $elements.monthly.toggleClass('is-active', isMonthly);
            $elements.yearly.toggleClass('is-active', !isMonthly);
            $elements.tabMonthly.toggleClass('at-tab-hide', !isMonthly);
            $elements.tabYearly.toggleClass('at-tab-hide', isMonthly);
        };

        [$elements.monthly, $elements.yearly].forEach(($el) => $el.on('click', () => setActive($el.is($elements.monthly))));

        $elements.switcher.on('click', () => setActive(!$elements.monthly.hasClass('is-active')));
    }
    if ($('#at-nav-monthly').length) tabtable_active();

    ////////////////////////////////////////////////////
    // 37. auto update year (.update-year)
    $('.update-year').text(new Date().getFullYear());

    ////////////////////////////////////////////////////
    // 38. fade-class-active
    if (typeof gsap !== 'undefined' && $('.at_fade_anim').length > 0) {
        gsap.utils.toArray('.at_fade_anim').forEach((item) => {
            if (!item) return;
            let tp_fade_offset = item.getAttribute('data-fade-offset') || 40,
                tp_duration_value = item.getAttribute('data-duration') || 0.75,
                tp_fade_direction = item.getAttribute('data-fade-from') || 'bottom',
                tp_onscroll_value = item.getAttribute('data-on-scroll') || 1,
                tp_delay_value = item.getAttribute('data-delay') || 0.15,
                tp_ease_value = item.getAttribute('data-ease') || 'power2.out',
                tp_anim_setting = {
                    opacity: 0,
                    ease: tp_ease_value,
                    duration: tp_duration_value,
                    delay: tp_delay_value,
                    x: tp_fade_direction == 'left' ? -tp_fade_offset : tp_fade_direction == 'right' ? tp_fade_offset : 0,
                    y: tp_fade_direction == 'top' ? -tp_fade_offset : tp_fade_direction == 'bottom' ? tp_fade_offset : 0,
                };
            if (tp_onscroll_value == 1) {
                tp_anim_setting.scrollTrigger = {
                    trigger: item,
                    start: 'top 85%',
                };
            }
            gsap.from(item, tp_anim_setting);
        });
    }

    ////////////////////////////////////////////////////
    // 39. character Animation
    if (typeof gsap !== 'undefined' && typeof SplitText !== 'undefined' && $('.at-char-animation').length > 0) {
        let char_come = gsap.utils.toArray('.at-char-animation');
        char_come.forEach((splitTextLine) => {
            if (!splitTextLine) return;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: splitTextLine,
                    start: 'top 90%',
                    end: 'bottom 60%',
                    scrub: false,
                    markers: false,
                    toggleActions: 'play none none none',
                },
            });
            const itemSplitted = new SplitText(splitTextLine, { type: 'chars, words' });
            if (!itemSplitted || !itemSplitted.chars || itemSplitted.chars.length === 0) return;

            gsap.set(splitTextLine, { perspective: 300 });
            itemSplitted.split({ type: 'chars, words' });
            tl.from(itemSplitted.chars, {
                duration: 1,
                delay: 0.5,
                x: 100,
                autoAlpha: 0,
                stagger: 0.05,
            });
        });
    }

    ////////////////////////////////////////////////////
    // 40. Parallax Js
    if ($('.scene').length > 0) {
        $('.scene').parallax({
            scalarX: 5.0,
            scalarY: 5.0,
        });
    }
    if ($('.scene-y').length > 0) {
        $('.scene-y').parallax({
            scalarY: 5.0,
            scalarX: 0,
        });
    }


    ////////////////////////////////////////////////////
    // 41. Archive blog sidebar_right sticky
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        var archiveSection = document.querySelector('.sec-1-archive-2');
        if (archiveSection) {
            var archiveSidebar = archiveSection.querySelector('.sidebar_right');
            var archiveContentCol = archiveSection.querySelector('.row.pt-80 .col-lg-8');
            if (archiveSidebar && archiveContentCol) {
                gsap.matchMedia().add('(min-width: 992px)', function () {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: archiveContentCol,
                            start: 'top 50px',
                            end: 'bottom bottom',
                            scrub: 1,
                            pin: archiveSidebar,
                            pinSpacing: false,
                            invalidateOnRefresh: true,
                        },
                    });
                });
            }
        }
    }

    ////////////////////////////////////////////////////
    // 42. ripple-image
    imagesLoaded('.ripple-image img', { background: true }, () => {
        $('.ripple-image').each(function () {
            var $container = $(this);
            var $img = $container.find('img').first();
            var imgURL = $img.attr('src');

            $container.css({
                'background-image': 'url(' + imgURL + ')',
                'background-size': 'cover',
                'background-position': 'center center',
            });

            $container.ripples({
                resolution: 400,
                perturbance: 0.03,
                imageUrl: imgURL,
            });

            $img.hide();
        });
    });

    ////////////////////////////////////////////////////
    // 43. Odometer counter
    if ($('.odometer').length > 0) {
        $('.odometer').each(function () {
            var $this = $(this);
            var countNumber = $this.attr('data-count');

            $this.html('0');

            $this.appear(
                function () {
                    var $element = $(this);
                    if (!$element.hasClass('odometer-animated')) {
                        $element.addClass('odometer-animated');

                        setTimeout(function () {
                            $element.html(countNumber);
                        }, 100);
                    }
                },
                {
                    accY: -50,
                },
            );
        });
    }

    ////////////////////////////////////////////////////
    // 44. about-me-slider-active
    var portfolio = new Swiper('.about-me-slider-active', {
		slidesPerView: 2,
		loop: true,
		autoplay: false,
		arrow: false,
		spaceBetween: 30,
		breakpoints: {
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		a11y: false,
	});
    ////////////////////////////////////////////////////
    // 45. slider-testimonial-thumbs
    if ($('.slider-testimonial-thumbs').length > 0) {
        const thumbsWrap = document.querySelector('.slider-testimonial-thumbs');
        const sectionTrigger = thumbsWrap.closest('section');
        const thumb1 = thumbsWrap.querySelector('.swiper-slide:nth-child(1)');
        const thumb2 = thumbsWrap.querySelector('.swiper-slide:nth-child(2)');
        const thumb4 = thumbsWrap.querySelector('.swiper-slide:nth-child(4)');
        const thumb5 = thumbsWrap.querySelector('.swiper-slide:nth-child(5)');

        const mmThumbs = gsap.matchMedia();
        const thumbs = [thumb1, thumb2, thumb4, thumb5].filter(Boolean);

        // xs (< 575px): no effect, keep thumbs at original position (match $xs)
        mmThumbs.add('(max-width: 574.98px)', () => {
            gsap.set(thumbs, { clearProps: 'x,y' });
            return () => {};
        });

        // Mobile / tablet ($sm + $md: 576px – 991px)
        mmThumbs.add('(min-width: 576px) and (max-width: 1399px)', () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionTrigger,
                    start: 'top 50%',
                    end: 'bottom 70%',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
            tl.to(thumb1, { x: -70, y: 20, duration: 1 }, 0).to(thumb2, { x: -80, y: -60, duration: 1 }, 0).to(thumb4, { x: 70, y: -86, duration: 1 }, 0).to(thumb5, { x: 65, y: 15, duration: 1 }, 0);
            return () => tl.kill();
        });

        // Desktop (>= 992px) – match $lg
        mmThumbs.add('(min-width: 1400px)', () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionTrigger,
                    start: 'top 50%',
                    end: 'bottom 70%',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
            tl.to(thumb1, { x: -500, y: 200, duration: 1 }, 0).to(thumb2, { x: -200, y: -100, duration: 1 }, 0).to(thumb4, { x: 300, y: -70, duration: 1 }, 0).to(thumb5, { x: 500, y: 200, duration: 1 }, 0);
            return () => tl.kill();
        });
    }
    ////////////////////////////////////////////////////
    // 46. Carousel Ticker
    function carauselScroll() {
        $('.carouselTicker-left').each(function () {
            $(this).carouselTicker({
                direction: 'prev',
                speed: 1,
                delay: 40,
            });
        });
        $('.carouselTicker-right').each(function () {
            $(this).carouselTicker({
                direction: 'next',
                speed: 1,
                delay: 40,
            });
        });
    }
    carauselScroll();

    ////////////////////////////////////////////////////
    // 47. customSwiper / slider-testimonial
    function customSwiper() {
        const sliderTestimonial = new Swiper('.slider-testimonial', {
            slidesPerView: 4,
            spaceBetween: 35,
            slidesPerGroup: 1,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
            navigation: {
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
            },
        });

        var sliderTestimonialThumbs = new Swiper('.slider-testimonial-thumbs', {
            spaceBetween: 0,
            slidesPerView: 5,
            freeMode: true,
            loop: true,
        });
        const sliderTestimonial2 = new Swiper('.slider-testimonial-2', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            thumbs: {
                swiper: sliderTestimonialThumbs,
            },
            navigation: {
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
            },
        });
    }
    customSwiper();

    ////////////////////////////////////////////////////
    // 48. scroll-move-up animation
    if (typeof gsap !== 'undefined' && $('.scroll-move-up').length > 0) {
        let scrollMoveUp = document.querySelectorAll('.scroll-move-up');
        scrollMoveUp.forEach((scrollMoveUp) => {
            if (!scrollMoveUp) return;
            gsap.to(scrollMoveUp, {
                y: -100,
                duration: 1.5,
                scrollTrigger: {
                    trigger: scrollMoveUp,
                    start: 'top 70%',
                    scrub: 1,
                    markers: false,
                },
            });
        });
    }
    ////////////////////////////////////////////////////
    // 49. scroll-move-up2 animation
    if (typeof gsap !== 'undefined' && $('.scroll-move-up2').length > 0) {
        gsap.matchMedia().add('(min-width: 768px)', () => {
            let items = document.querySelectorAll('.scroll-move-up2');
            items.forEach((item) => {
                if (!item) return;
                gsap.from(item, 1.5, {
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom bottom',
                        scrub: 1,
                        duration: 1.5,
                        ease: 'power4.inOut',
                        markers: false,
                    },
                });
            });
        });
    }

    ////////////////////////////////////////////////////
    // 50. zoom-in-full (badge-zoon-in)
    if (typeof gsap !== 'undefined' && $('.badge-zoon-in').length > 0) {
        gsap.to('.badge-zoon-in', {
            scale: 25,
            rotation: 180,
            duration: 3,
            scrollTrigger: {
                trigger: '.badge-zoon-in',
                start: 'top 60%',
                end: 'bottom 0%',
                scrub: 1,
                markers: false,
            },
        });
        gsap.to('.badge-text-zoom-in', {
            scale: 8,
            duration: 3,
            scrollTrigger: {
                trigger: '.badge-text-zoom-in',
                start: 'top 70%',
                end: 'bottom 0%',
                scrub: 1,
                markers: false,
            },
        });
    }

    ///////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // 51. scroll-section card stacking
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        function initScrollSectionStack() {
            const scrollSection = document.querySelectorAll('.scroll-section');
            scrollSection.forEach((section) => {
                if (section.closest('.section-fix')) return;
                const wrapper = section.querySelector('.wrapper');
                const items = wrapper ? wrapper.querySelectorAll('.item') : [];
                if (!items.length) return;
                let direction = section.classList.contains('horizontal-section') ? 'horizontal' : 'vertical';
                initScroll(section, items, direction);
            });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initScrollSectionStack();
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            });
        } else {
            initScrollSectionStack();
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        }
    }

    function initScroll(section, items, direction) {
        // Initial states + z-index so stacked absolute items show in correct order (current on top)
        items.forEach((item, index) => {
            gsap.set(item, { zIndex: index });
            if (index !== 0) {
                direction == 'horizontal' ? gsap.set(item, { xPercent: 100 }) : gsap.set(item, { yPercent: 100 });
            }
        });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                pin: true,
                start: 'top top',
                end: () => `+=${items.length * 50}%`,
                scrub: 1,
                invalidateOnRefresh: true,
                // markers: true,
            },
            defaults: { ease: 'none' },
        });
        items.forEach((item, index) => {
            timeline.to(item, {
                scale: 0.9,
            });

            direction == 'horizontal'
                ? timeline.to(
                      items[index + 1],
                      {
                          xPercent: 0,
                      },
                      '<',
                  )
                : timeline.to(
                      items[index + 1],
                      {
                          yPercent: 0,
                      },
                      '<',
                  );
        });
    }

    ////////////////////////////////////////////////////
    // 52. change price / price plan toggle
    function updatePriceByPlan(isBusiness) {
        if (isBusiness) {
            $('.text-price-starter').html('$2,400');
            $('.text-price-growth').html('$5,600');
            $('.text-price-scale').html('$7,200');
        } else {
            $('.text-price-starter').html('$1,200');
            $('.text-price-growth').html('$2,800');
            $('.text-price-scale').html('$3,600');
        }
    }
    $('.change-price-plan .price-plan-toggle__input').on('change', function () {
        updatePriceByPlan($(this).is(':checked'));
    });
    $('.change-price-plan .price-plan-toggle-label').on('click', function () {
        var plan = $(this).attr('data-plan');
        var $input = $('#price-plan-toggle');
        if (plan === 'business') {
            $input.prop('checked', true);
        } else {
            $input.prop('checked', false);
        }
        updatePriceByPlan($input.is(':checked'));
    });

    ////////////////////////////////////////////////////
    // 53. scroll-rotate, scroll-move-right/left
    let scrollRotate = document.querySelectorAll('.scroll-rotate');
    scrollRotate.forEach((scrollRotate) => {
        gsap.to(scrollRotate, {
            scrollTrigger: {
                trigger: scrollRotate,
                scrub: 2,
            },
            rotation: 720,
        });
    });
    let scrollMoveRight = document.querySelectorAll('.scroll-move-right');
    scrollMoveRight.forEach((scrollMoveRight) => {
        gsap.to(scrollMoveRight, {
            x: 500,
            duration: 1.5,
            scrollTrigger: {
                trigger: scrollMoveRight,
                start: 'top 30%',
                scrub: 2,
            },
        });
    });

    let scrollMoveLeft = document.querySelectorAll('.scroll-move-left');
    scrollMoveLeft.forEach((scrollMoveLeft) => {
        gsap.to(scrollMoveLeft, {
            x: -500,
            duration: 1.5,
            scrollTrigger: {
                trigger: scrollMoveLeft,
                start: 'bottom 100%',
                scrub: 2,
                // markers: true,
            },
        });
    });

    ////////////////////////////////////////////////////
    // 54. Journey list vertical line
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const journeyListWrap = document.querySelector('.journey-list-wrap');
        const journeyListLine = document.querySelector('.journey-list-line');
        if (journeyListWrap && journeyListLine) {
            gsap.set(journeyListLine, { height: 0 });
            gsap.to(journeyListLine, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: journeyListWrap,
                    start: 'top 50%',
                    end: 'top top',
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });
        }
    }

    ////////////////////////////////////////////////////
    // 55. initPortfolioFilter
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-portfolio .filter-btn');
        const portfolioCards = document.querySelectorAll('.mg-portfolio-item, .card-portfolio, .card_case__studies, .blog-card, .blog-card-2, .product-card');

        if (filterButtons.length === 0 || portfolioCards.length === 0) {
            return;
        }

        filterButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const wasActive = this.classList.contains('active');

                // Remove active class from all buttons
                filterButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });

                // If clicking the already-active button, clear filter (show all); otherwise activate clicked button
                if (!wasActive) {
                    this.classList.add('active');
                }

                // Use 'all' when clearing filter (click on active button), else use button's data-filter
                const filterValue = wasActive ? 'all' : this.getAttribute('data-filter');

                // Collect visible cards for stagger animation
                const visibleCards = [];
                portfolioCards.forEach(function (card) {
                    const cardCategory = card.getAttribute('data-category');
                    const isVisible = filterValue === 'all' || cardCategory === filterValue;

                    if (isVisible) {
                        visibleCards.push(card);
                    } else {
                        // Hide card with fade out animation
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-5px)';
                        card.style.display = 'none';
                        card.style.transform = '';
                        
                    }
                });

                // Show visible cards with slide-up + fade in, with stagger
                var staggerDelayMs = 60;
                var fadeDurationMs = 400;
                visibleCards.forEach(function (card, index) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(24px)';
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                    var delay = index * staggerDelayMs;
                    setTimeout(function () {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10 + delay);
                });

                // After filtering, update the ScrollTrigger only when sidebar exists so the sidebar pins correctly to the new blog column height
                var hasSidebar = document.querySelector('.sec-1-archive-2 .sidebar_right');
                var lastStagger = visibleCards.length ? 10 + (visibleCards.length - 1) * staggerDelayMs : 0;
                setTimeout(function () {
                    if (typeof ScrollTrigger !== 'undefined' && hasSidebar) {
                        ScrollTrigger.refresh();
                    }
                }, lastStagger + fadeDurationMs);
            });
        });
    }

    ////////////////////////////////////////////////////
    // 56. initProductDetails
    function initProductDetails() {
        var right = document.querySelector('.content-product-right');
        if (!right) return;

        // Size selection
        var sizeBtns = right.querySelectorAll('.content-product-right__size');
        sizeBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                sizeBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
            });
        });

        // Color selection
        var colorBtns = right.querySelectorAll('.content-product-right__color');
        colorBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                colorBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
            });
        });

        // Quantity +/- 
        var qtyVal = right.querySelector('.content-product-right__qty-val, .qty-val');
        var qtyDown = right.querySelector('.qty-down');
        var qtyUp = right.querySelector('.qty-up');
        if (qtyVal && qtyDown) {
            qtyDown.addEventListener('click', function (e) {
                e.preventDefault();
                var n = parseInt(qtyVal.textContent, 10) || 1;
                if (n > 1) qtyVal.textContent = n - 1;
            });
        }
        if (qtyVal && qtyUp) {
            qtyUp.addEventListener('click', function (e) {
                e.preventDefault();
                var n = parseInt(qtyVal.textContent, 10) || 0;
                qtyVal.textContent = n + 1;
            });
        }
    }

    ////////////////////////////////////////////////////
    // 57. initShopCart (select all, quantity +/-, delete, summary)
    function initShopCart() {
        var $cartList = $('.cart-list');
        if (!$cartList.length) return;

        var $selectAll = $cartList.find('.cart-select-all');
        var $itemChecks = $cartList.find('.cart-item-check');
        var $removeSelected = $cartList.find('.cart-remove-selected');
        var $summary = $('.cart-summary');
        var appliedDiscount = 0; // amount in dollars, set when coupon applied

        // Parse price string e.g. "$64" or "$72.50" to number
        function parsePrice(str) {
            if (!str || typeof str !== 'string') return 0;
            var num = parseFloat(str.replace(/[$,]/g, '').trim(), 10);
            return isNaN(num) ? 0 : num;
        }

        // Format number as currency
        function formatMoney(num) {
            return '$' + (Math.round(num * 100) / 100).toFixed(2);
        }

        // Get estimated delivery date (e.g. 5 business days)
        function getEstimatedDeliveryDays() {
            return 5;
        }

        function formatDeliveryDate(daysFromNow) {
            var d = new Date();
            d.setDate(d.getDate() + daysFromNow);
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
        }

        function updateCartSummary() {
            if (!$summary.length) return;

            var $items = $cartList.find('.cart-item');
            var subtotal = 0;

            $items.each(function () {
                var $item = $(this);
                var price = parsePrice($item.find('.cart-item__price').text());
                var qty = parseInt($item.find('.cart-item-qty-val').text(), 10) || 1;
                subtotal += price * qty;
            });

            var discount = Math.min(appliedDiscount, subtotal);
            var tax = 0;
            var subtotalAfter = Math.max(0, subtotal - discount);
            var shipping = 0; // Free
            var total = subtotalAfter + shipping;

            $summary.find('.cart-summary__subtotal').text(formatMoney(subtotal));
            $summary.find('.cart-summary__discount').text(formatMoney(discount));
            $summary.find('.cart-summary__tax').text(formatMoney(tax));
            $summary.find('.cart-summary__subtotal-after').text(formatMoney(subtotalAfter));
            $summary.find('.cart-summary__shipping').text('Free');
            $summary.find('.cart-summary__total').text(formatMoney(total));
            $summary.find('.cart-summary__delivery-date').text(formatDeliveryDate(getEstimatedDeliveryDays()));
        }

        // Coupon apply: optional demo – set discount and update summary
        $summary.on('click', '.cart-summary__coupon-btn', function (e) {
            e.preventDefault();
            var code = $summary.find('.cart-summary__coupon-input').val().trim().toUpperCase();
            // Demo: e.g. "SAVE10" = $10 off, "SAVE20" = $20 off
            if (code === 'SAVE10') appliedDiscount = 10;
            else if (code === 'SAVE20') appliedDiscount = 20;
            else appliedDiscount = 0;
            updateCartSummary();
        });

        // Select All: check/uncheck all item checkboxes
        $selectAll.on('change', function () {
            var checked = this.checked;
            $itemChecks.prop('checked', checked);
        });

        // Item checkbox: sync "Select All" state
        $itemChecks.on('change', function () {
            var total = $itemChecks.length;
            var checked = $itemChecks.filter(':checked').length;
            $selectAll.prop('checked', total > 0 && total === checked);
        });

        // Remove selected: remove all checked items from DOM
        $removeSelected.on('click', function () {
            $cartList.find('.cart-item-check:checked').closest('.cart-item').fadeOut(300, function () {
                $(this).remove();
                updateCartSummary();
            });
        });

        // Quantity minus
        $cartList.on('click', '.cart-item-qty-minus', function (e) {
            e.preventDefault();
            var $val = $(this).siblings('.cart-item-qty-val');
            var n = parseInt($val.text(), 10) || 1;
            if (n > 1) {
                $val.text(n - 1);
                updateCartSummary();
            }
        });

        // Quantity plus
        $cartList.on('click', '.cart-item-qty-plus', function (e) {
            e.preventDefault();
            var $val = $(this).siblings('.cart-item-qty-val');
            var n = parseInt($val.text(), 10) || 0;
            $val.text(n + 1);
            updateCartSummary();
        });

        // Delete single item
        $cartList.on('click', '.cart-item-delete', function (e) {
            e.preventDefault();
            $(this).closest('.cart-item').fadeOut(300, function () {
                $(this).remove();
                updateCartSummary();
            });
        });

        // Initial summary and delivery date
        updateCartSummary();
    }

    initPortfolioFilter();
    initProductDetails();
    initShopCart();
});
