<?php 
$tarifs = file_get_contents(__DIR__ . '/data/tarifs.json');
$tarifs_json = json_decode($tarifs, true);
$faqData = file_get_contents(__DIR__ . '/data/faq.json');
$faqData_json = json_decode($faqData, true);

?>
<?php
$file = __DIR__ . '/inc/header.inc.php';
if (file_exists($file)) {
    include $file;
} else {
    echo "Include file not found: $file";
}
?>

<section class="hero__bg">

    <div class="hero__bg-container container">
        <div class="hero-txt-cta">
            <h1 class="hero__title">НАШ С ТОБОЙ СЕКРЕТ</h1>
            <h3 class="hero__title-second">Специальная цена
                на интернет</h3>
            <a href="#tarif_block" class="button-63">Подробнее</a>
            <div class="info-blocks">
                <div class="info-block">
                    <div class="info-block-feature fs-300 uppercase fw-bold">300</div>
                    <div class="info-block-text">Мбит/с</div>
                </div>
                <div class="info-block">
                    <div class="info-block-feature fs-300 uppercase fw-bold">70</div>
                    <div class="info-block-text">каналов</div>
                </div>
                <!-- <div class="info-block img"> -->
                <!-- <img src="./img/logo_Premier_w.png" alt="" /> -->
                <!-- <img src="./img/logo_start.svg" alt="" />
                    <img src="./img/Amediateka_full_white.png" alt="" /> -->
                <!-- </div> -->
                <div class="info-block">
                    <div class="info-block-feature fs-300 uppercase fw-bold">500</div>
                    <div class="info-block-text">₽/мес</div>
                </div>
            </div>
        </div>
        <!-- <div class="hero__img">
            <img src="./img/9PIrNJFKZR.png" alt="" />
        </div> -->
        <div class="hero__img">
            <video autoplay muted loop playsinline>
                <source src="./img/kling_20250805_Image_to_Video__5335_0.mp4" type="video/mp4">
                Ваш браузер не поддерживает видео.
            </video>
        </div>
    </div>

</section>

<section>
    <div class="bg-modal" id="pack-5b504edcb2de77e82f591f1a">
        <button class="modal-btn">X</button>
        <div id="modal" class="modal-content">
            <div class="channels-list"></div>
        </div>
    </div>
</section>

<section class="tarifs__section" id="tarifs__section">
    <h2 id="tarif_block" class="section-title fs-600">Тарифы</h2>
    <h3 class="t-center fs-400">Интернет</h3>
    <!--tab section-->
    <div class="swiper tarifs-slider-container2 container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <?php foreach($tarifs_json AS $tarif): ?>

            <?php if($tarif['tv'] == false): ?>
            <div class="swiper-slide tarif-option">
                <div class="tarif-slider-description">
                    <?php if($tarif['promo']) : ?><div class="tarif-promo">Акция</div>
                    <?php endif?>
                    <!-- <div class="tarif-icon"></div> -->
                    <p class="tarif-name"><?php echo $tarif["name"]?></p>
                    <?php if($tarif['promo']) : ?>
                    <p class="tarif-price"> <?php echo $tarif['price2']  ?> <span
                            style="font-size: 0.75rem">₽/мес</span>
                        <span class="tarif-price-old"><?php echo $tarif["price"]?>
                            <span style="font-size: 0.75rem">₽/мес</span></span>
                    </p>
                    <?php else : ?>
                    <p class="tarif-price">
                        <?php echo $tarif["price"]?><span style="font-size: 0.75rem">₽/мес</span>
                    </p>
                    <?php endif?>
                    <div class="tarif-param">
                        <p class="tarif-speed"><?php echo $tarif["speed"]?> Мбит/c</p>
                        <div class="tarif channels-item ntv_channels">
                            <a class="channels_link link trigger" href="#channels"><?php echo $tarif["channels"] ?>
                                ТВ-каналов</a>
                        </div>
                        <p style="
    color: black;
    font-size: 12px;
">НТВ-ПЛЮС ТВ в подарок 🎁
                        </p>
                    </div>

                    <div class="tarif-options-description">
                        <ul class="tarif-options-list">

                        </ul>
                    </div>
                    <?php
                            $utm = $_SERVER['QUERY_STRING'] ? '&' . $_SERVER['QUERY_STRING'] : '';
                            ?>
                    <a href="tarif.php?id=<?php echo $tarif["id"] . $utm ?>" class="choose-btn">Выбрать</a>
                </div>

            </div>
            <?php endif; ?>
            <?php endforeach; ?>



        </div>

        <!-- If we need pagination -->

        <!-- <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>-->
        <div class="swiper-pagination"></div>
    </div>
    <div class="swiper-container">
        <h2 class="t-center fs-400">Интернет+ТВ</h2>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper tarifs-slider-container2 container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                <?php foreach($tarifs_json AS $tarif): ?>
                <?php if($tarif['tv'] == true): ?>
                <div class="swiper-slide tarif-option">
                    <div class="tarif-slider-description">
                        <?php if($tarif['promo']) : ?><div class="tarif-promo">Акция</div>
                        <?php endif?>
                        <p class="tarif-name"><?php echo $tarif["name"]?></p>
                        <?php if($tarif['promo']) : ?>
                        <p class="tarif-price"> <?php echo $tarif['price2']  ?> <span
                                style="font-size: 0.75rem">₽/мес</span>
                            <span class="tarif-price-old"><?php echo $tarif["price"]?>
                                <span style="font-size: 0.75rem">₽/мес</span></span>
                        </p>
                        <?php else : ?>
                        <p class="tarif-price">
                            <?php echo $tarif["price"]?><span style="font-size: 0.75rem">₽/мес</span>
                        </p>
                        <?php endif?>
                        <div class="tarif-param">
                            <p class="tarif-speed"><?php echo $tarif["speed"] ?> Мбит/с</p>
                            <div class="tarif channels-item" data-package="<?php echo $tarif["dataPackage"] ?>">
                                <a class="channels_link link trigger" href="#channels"><?php echo $tarif["channels"] ?>
                                    ТВ-каналов</a>
                            </div>
                            <?php if(!empty($tarif["movie"])): ?>
                            <p class="tarif-movie" id="video2"><?php echo $tarif["movie"] ?></p>
                            <?php else : ?>
                            <p class="tarif-movie" id="video2">-</p>
                            <?php endif ?>
                        </div>
                        <div class="tarif-options-description">
                            <ul class="tarif-options-list">
                                <!-- <li>"Раздаем интернет всем" на 6 месяцев</li>

                                <li>Интернет, ультра ТВ и кинотеатр на выбор</li> -->
                            </ul>
                        </div>
                        <?php
                            $utm = $_SERVER['QUERY_STRING'] ? '&' . $_SERVER['QUERY_STRING'] : '';
                            ?>
                        <a href="tarif.php?id=<?php echo $tarif["id"] . $utm ?>" class="choose-btn">Выбрать</a>
                    </div>
                </div>
                <!-- end tarif-->
                <?php endif; ?>
                <?php endforeach; ?>




            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>


    <div class="modal-bg-tv">
        <div class="modal-tv">
            <div class="modal-header"></div>
            <div class="channels_list"></div>
            <div class="output"></div>

            <span id="close-tv" class="modal-close">X</span>
        </div>
    </div>

</section>
<div class="wrapper flow container">
    <h2 class="section-title" style="position: sticky">Преимущества</h2>
    <section class="card">
        <!-- <h2 class="section-title fs-700">Интерактивное ТВ</h2> -->
        <div class="feature-blocks flow">
            <div class="feature grid-container-feature bg-violet text-white">
                <div class="feature-txt">
                    <!-- <div style="padding-bottom: 1rem;" class="feature-title fs-500 text-white ff-main fw-bold">
                                До пяти устройств на одном
                                аккаунте</div> -->
                    <div style="padding-bottom: 1rem" class="feature-title fs-400 text-white ff-main fw-bold">
                        Интерактивное ТВ
                    </div>
                    <div class="feature-description">
                        Большой выбор телеканалов, тысячи фильмов, сериалов в одном
                        приложении. Пользоваться телевидением можно везде, где захочется
                        ;) Смотри ТВ на большом экране с телеприставкой или Smart TV, на
                        мобильных устройствах, на ноутбуках и компьютерах.
                    </div>
                </div>
                <div class="feature-img feature-img-1">
                    <img src="./img/devices_1.png" alt="" />
                </div>
            </div>
        </div>
    </section>

    <section class="card">
        <!--<h2 class="section-title fs-700">MEGOGO</h2>-->
        <div class="feature-blocks">
            <div class="feature grid-container-feature bg-tarif text-white">
                <div class="feature-txt">
                    <!-- <div style="padding-bottom: 1rem;" class="feature-title fs-500 text-white ff-main fw-bold">
                                Кино для всей семьи и для всех устройств
                            </div> -->
                    <div style="padding-bottom: 1rem" class="feature-title fs-400 text-white ff-main fw-bold">
                        Интернет + онлайн-кинотеатр — это выгодно
                    </div>
                    <div class="feature-description">
                        Экономьте с «Экотелеком»: вместо оплаты трех и более услуг у
                        разных провайдеров — интернет, телевидение, онлайн-кинотеатры —
                        подключите единый тариф, который обойдется значительно дешевле.
                    </div>
                </div>

                <div class="feature-img feature-img-1">
                    <img src="./img/optimal_entertainment.png" alt="" />
                </div>
            </div>
        </div>
    </section>

    <section class="card">
        <!-- <h2 class="section-title fs-700">Преимущества</h2> -->
        <div class="feature-blocks flow">
            <div class="feature grid-container-advantages bg-blue text-white">
                <!--  <h2 class="fs-700">Преимущества</h2>-->
                <div class="feature-advantage-item">
                    <img style="align-self: flex-start" src="img/star-icon.png" alt="" />
                    <div class="adv-content">
                        <div class="feature-title fs-400 text-white ff-main fw-bold">
                            Тариф «всё в одном»
                        </div>
                        <div class="feature-description fs-300">
                            Настоящий хит: интернет+интерактивное ТВ+онлайн-кинотеатр. Три
                            услуги по цене одной. Не нужно платить отдельно — всё «зашито»
                            в абонентскую плату.
                        </div>
                    </div>
                </div>
                <div class="feature-advantage-item">
                    <img style="align-self: flex-start" src="img/rocket-icon.png" alt="" />
                    <div class="adv-content">
                        <div class="feature-title fs-400 text-white ff-main fw-bold">
                            Стабильный интернет
                        </div>
                        <div class="feature-description fs-300">
                            Всё летает: скорость до 500 Мбит/с подходит для домашних и
                            рабочих задач — игр, видеосвязи, просмотра фильмов, работы с
                            офисными приложениями
                        </div>
                    </div>
                </div>
                <div class="feature-advantage-item">
                    <img style="align-self: flex-start" src="img/piggy-bank-icon.png" alt="" />
                    <div class="adv-content">
                        <div class="feature-title fs-400 text-white ff-main fw-bold">
                            Абонемент
                        </div>
                        <div class="feature-description fs-300">
                            Заплати один раз со скидкой 20% (при оплате на год) или 15%
                            (при оплате на полгода) и пользуйся без хлопот.
                        </div>
                    </div>
                </div>
                <!-- <div style="padding-bottom: 1rem;" class="feature-title fs-500 text-white ff-main fw-bold">
                            ТВ везде с тобой</div>
                        <div class="feature-description">Смотри ТВ не только в домашней сети, но и везде, где есть
                            интернет
                        </div> -->

                <!-- <div class="feature-img  feature-img-1">
                            <img src="./img/hand.png" alt="">
                        </div> -->
            </div>
        </div>
    </section>
</div>

<section class="faq container">
    <h2 class="section-title fs-600">Дополнительная информация:</h2>

    <div class="accordion">
        <?php foreach ($faqData_json as $item): ?>
        <div class="accordion-item">
            <div class="accordion-header">
                <?= htmlspecialchars($item['question']) ?>
            </div>
            <div class="accordion-body">
                <div class="accordion-body-content">
                    <?= nl2br(htmlspecialchars($item['answer'])) ?>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</section>
<section class="form container">
    <h2 style="text-align: center" class="fs-600">Заявка на подключение</h2>
    <div class="contact-box">
        <!-- <h2 class="fs-600" style="margin: 2rem 0;">Заявка на подключение</h2> -->
        <form action="./php/form1.php" method="post" id="form1" name="call-form">
            <label class="fs-200" for="name1">Имя</label>
            <input type="text" name="name" id="name1" class="field" required />
            <label class="fs-200" for="phone1">Телефон</label>
            <input type="tel" class="field" data-tel-input maxlength="18" name="number" id="phone1" required />
            <label class="fs-200" for="adr11">Адрес</label>
            <input type="text" class="field" name="address" id="adr11" required />
            <button type="submit bg-violet" class="button-63" style="width: 80%; margin-left: 2rem" name="call-submit"
                onsubmit="if (validateForm(event, this.form)) { this.disabled=true; this.value='Sending, please wait...'; ym(49966909, 'reachGoal', 'form-submit'); } return false;">
                Отправить
            </button>
            <input autocomplete="off" type="hidden" name="call-control" class="call-control" value="0" />
        </form>
    </div>
</section>
<?php
$file = __DIR__ . '/inc/footer.inc.php';
if (file_exists($file)) {
    include $file;
} else {
    echo "Include file not found: $file";
}
?>