import $ from "jquery";


    const handleCloseOpenMenu =()=>{
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
    }


$(document).ready(function () {

    var $menu = $('.at-mobile-menu-active > ul').clone();
    var $offcanvasNav = $('.at-offcanvas-menu nav');
    $offcanvasNav.html('');
    $offcanvasNav.append($menu);



handleCloseOpenMenu()

});