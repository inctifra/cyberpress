import imagesLoaded from 'imagesloaded';
import $ from 'jquery';
import 'jquery.ripples';

window.$ = window.jQuery = $;

(function () {
    const $images = $(".ripple-image img");

    if ($images.length) {
        imagesLoaded($images.toArray(), () => {
            $('.ripple-image').each(function () {
                const $container = $(this);
                const $img = $container.find('img').first();
                const imgURL = $img.attr('src');

                if (!imgURL) return;

                $container.css({
                    backgroundImage: `url(${imgURL})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                });

                try {
                    $container.ripples({
                        resolution: 400,
                        perturbance: 0.03,
                        imageUrl: imgURL,
                    });
                    $img.css('opacity', 0);
                } catch (e) {
                    console.error("Ripples failed:", e);
                }
            });
        });
    }
})();