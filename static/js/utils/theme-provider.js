import $ from "jquery";

(function () {
    var $switchers = $('.dark-light-switcher');
    function updateTheme(isDarkMode) {
        $switchers.each(function () {
            var $checkbox = $(this).find('#switch');

            if ($checkbox.length) {
                $checkbox.prop('checked', isDarkMode);
            }
        });

        $('html').attr('data-bs-theme', isDarkMode ? 'dark' : 'light');
    }
    var htmlTheme = $('html').attr('data-bs-theme');
    var savedTheme = localStorage.getItem('theme');
    var defaultTheme = 'light';

    var siteColorConfig = window.cyberConnectConfig || window.idekoThemeConfig;
    if (siteColorConfig && siteColorConfig.defaultDarkMode) {
        defaultTheme = 'dark';
    }

    var currentTheme;

    if (htmlTheme === 'dark' || htmlTheme === 'light') {
        currentTheme = htmlTheme;
    } else if (savedTheme === 'dark' || savedTheme === 'light') {
        currentTheme = savedTheme;
    } else {
        currentTheme = defaultTheme;
    }

    var isDarkMode = currentTheme === 'dark';
    if ($('html').attr('data-bs-theme') !== currentTheme) {
        $('html').attr('data-bs-theme', currentTheme);
    }
    updateTheme(isDarkMode);
    $switchers.on('click', function () {
        var $checkbox = $(this).find('#switch');

        if ($checkbox.length) {
            var isDarkMode = $checkbox.prop('checked');
            var newTheme = isDarkMode ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            $('html').attr('data-bs-theme', newTheme);
        }
    });

})();
