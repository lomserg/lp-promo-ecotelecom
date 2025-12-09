<?php 
$tarifs = file_get_contents(__DIR__ . '/data/tarifs.json');
$tarifs_json = json_decode($tarifs, true);
$faqData = file_get_contents(__DIR__ . '/data/faq.json');
$faqData_json = json_decode($faqData, true);

?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="Экотелеком интернет провайдер" />
    <meta property="og:url" content="https://promo.ecotelecom.ru" />
    <meta property="og:image" content="https://promo.ecotelecom.ru/img/logo_ecotelecom_g.png" />
    <title>Экотелеком интернет провайдер</title>


    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="icon" href="img/favicon.ico" type="image/x-icon" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />

    <script src="https://kit.fontawesome.com/4af22d591d.js" crossorigin="anonymous" defer></script>

    <link rel="stylesheet" href="new-tarifs.css">
    <!-- <script
      defer
      src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"
    ></script> -->


    <!-- <script src="./js/modal.js" defer></script> -->



    <link rel="stylesheet" href="./css/swiper-bundle.min.css" />
    <script src="./js/swiper-bundle.min.js" defer></script>

    <script src="./js/slider.js" defer></script>


    <script src="./js/tabs.js" defer></script>

</head>



<section class=" container">
    <h2 id="tarif_block" class="section-title fs-600">Выберите свой тариф</h2>
    <div class="tab-box">
        <button class="tab_btn active" data-category="internet">Интернет</button>
        <button class="tab_btn" data-category="internet-tv">Интернет и ТВ</button>
    </div>
    <div class="swiper tarifs-slider-container wrapper">

        <div class="swiper-wrapper wrapper">

            <?php foreach ($tarifs_json as $tarif): ?>

            <div data-category="<?= $tarif['tv'] == false ? 'internet' : 'internet-tv' ?>"
                class="swiper-slide tarif-item">

                <h3 class="tarif-title"><?= $tarif["name"] ?></h3>
                <p class="tarif__description"><?= $tarif["description"] ?></p>

                <ul class="tarif__features">

                    <li class="tarif__params">
                        <?= $tarif["speed"] ?> <span>Мбит/сек</span>
                    </li>

                    <?php if ($tarif['tv'] == false): ?>

                    <li class="tarif__params channels_link link trigger" href="#channels">
                        <?= $tarif["channels"] ?> ТВ-каналов

                    </li>
                    <li>
                        НТВ-ПЛЮС ТВ в подарок 🎁
                    </li>

                    <?php else: ?>

                    <li class="tarif__params">
                        <?= $tarif["channels"] ?> <span> ТВ-каналов</span>
                    </li>

                    <?php if (!empty($tarif["movie"])): ?>
                    <li class="tarif__params">
                        <?= $tarif["movie"] ?>
                    </li>
                    <?php endif; ?>
                    <?php endif; ?>

                </ul>

                <p class="tarif__price">
                    <?= $tarif["price"] ?> <span>₽/мес</span>
                </p>

                <button class="tarif-button tarif__btn-green">ПОДКЛЮЧИТЬ</button>

            </div>

            <?php endforeach; ?>

        </div>
    </div>

</section>