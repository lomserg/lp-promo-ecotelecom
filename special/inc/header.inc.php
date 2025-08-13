<!DOCTYPE html>
<html lang="ru">
<!-- лучше "ru", не "en" -->

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Экотелеком интернет провайдер</title>

    <!-- стили, шрифты и скрипты -->
    <link rel="icon" href="img/favicon.ico" type="image/x-icon" />
    <!-- <meta property="og:url" content="https://intet.ru.net" />
    <meta property="og:image" content="https://intet.ru.net/img/logo.svg" /> -->
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Poppins&family=Roboto&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="index.css" />
    <script src="https://kit.fontawesome.com/4af22d591d.js" crossorigin="anonymous" defer></script>
    <script src="https://unpkg.com/@popperjs/core@2" defer></script>
    <script src="https://unpkg.com/tippy.js@6" defer></script>

    <link rel="stylesheet" href="./css/swiper-bundle.min.css" />
    <script src="./js/swiper-bundle.min.js" defer></script>
    <script defer src="./js/channels.js"></script>
    <!-- <script defer src="./js/modal.js"></script> -->
    <script src="./slider.js" defer></script>
    <script src="./js/phoneinput.js" defer></script>
    <script defer src="./js/index.js"></script>
</head>

<body>
    <!-- Yandex.Metrika -->
    <script type="text/javascript">
    (function(m, e, t, r, i, k, a) {
        m[i] = m[i] || function() {
            (m[i].a = m[i].a || []).push(arguments)
        };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
                return;
            }
        }
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(
            k, a)
    })
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(47175648, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });
    </script>
    <noscript>
        <div><img src="https://mc.yandex.ru/watch/47175648" style="position:absolute; left:-9999px;" alt="" /></div>
    </noscript>
    <!-- /Yandex.Metrika -->

    <header class="header container"
        <?php if (strpos($_SERVER['REQUEST_URI'], '/tarif.php') !== false) echo 'style="background: #1b8607; width: 100%"'; ?>>
        <div class="header-content">
            <a class="logo-header" href="#"></a>

            <div class="phone text-dark">
                <a style="text-decoration: none" class="phoneid" href="tel:+74998017799">+7 499 801-77-99</a>
            </div>
        </div>
    </header>