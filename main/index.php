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
            <h1 class="hero__title"><span class="hero__title-sub ">КАНИКУЛЫ</span> ПО-ВЗРОСЛОМУ</h1>
            <h3 class="hero__title-second">ИНТЕРНЕТ БЕСПЛАТНО НА ВСЕ ЛЕТО</h3>
            <a href="#tarif_block" class="button-63">Подробнее</a>
            <div class="info-blocks">
                <div class="info-block">
                    <div class="info-block-feature fs-300 uppercase fw-bold">350</div>
                    <div class="info-block-text">Мбит/с</div>
                </div>
                <div class="info-block">
                    <div class="info-block-feature fs-300 uppercase fw-bold">320</div>
                    <div class="info-block-text">каналов</div>
                </div>
                <div class="info-block img">
                    <img src="./img/logo_Premier_w.png" alt="" />
                    <!-- <img src="./img/logo_start.svg" alt="" />
                    <img src="./img/Amediateka_full_white.png" alt="" /> -->
                </div>
                <!-- <div class="info-block">
              <div class="info-block-feature fs-300 uppercase fw-bold">777</div>
              <div class="info-block-text">₽/мес</div>
            </div> -->
            </div>
        </div>
        <div class="">
            <!-- <img src="./img/1839143497_1b.png" alt="" /> -->
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
            <div class="swiper-slide tarif-option">
                <div class="tarif-slider-description">
                    <div class="tarif-promo">Акция</div>
                    <!-- <div class="tarif-icon"></div> -->
                    <p class="tarif-name">МЕГА</p>
                    <p class="tarif-price">
                        0 <span style="font-size: 0.75rem">₽/мес</span>
                        <span class="tarif-price-old">770 <span style="font-size: 0.75rem">₽/мес</span></span>
                    </p>

                    <div class="tarif-param">
                        <p class="tarif-speed">500 Мбит/с</p>
                    </div>

                    <div class="tarif-options-description">
                        <ul class="tarif-options-list">
                            <!-- <li>"Раздаем интернет всем" на 6 месяцев</li> -->
                            <!-- <li>-20% при оплате на 12 месяцев</li>
                  <li>Максимум скорости. Всё летает</li> -->
                        </ul>
                    </div>
                    <button class="choose-btn">Выбрать</button>
                </div>
            </div>
            <div class="swiper-slide tarif-option">
                <div class="tarif-slider-description">
                    <!-- <div class="tarif-promo">Акция</div> -->
                    <!-- <div class="tarif-icon"></div> -->
                    <p class="tarif-name">СТАРТ</p>
                    <p class="tarif-price">
                        610 <span style="font-size: 0.75rem">₽/мес</span>
                    </p>

                    <div class="tarif-param">
                        <p class="tarif-speed">100 Мбит/с</p>
                    </div>

                    <div class="tarif-options-description">
                        <ul class="tarif-options-list">
                            <!-- <li>-20% при оплате на 12 месяцев</li>
                  <li>Стартовый тариф для повседневных задач</li> -->
                        </ul>
                    </div>
                    <button class="choose-btn">Выбрать</button>
                </div>
            </div>

            <div class="swiper-slide tarif-option">
                <div class="tarif-slider-description">
                    <!-- <div class="tarif-promo">Акция</div> -->
                    <!-- <div class="tarif-icon"></div> -->
                    <p class="tarif-name">ХИТ</p>
                    <p class="tarif-price">
                        710 <span style="font-size: 0.75rem">₽/мес</span>
                    </p>

                    <div class="tarif-param">
                        <p class="tarif-speed">300 Мбит/с</p>
                    </div>

                    <div class="tarif-options-description">
                        <ul class="tarif-options-list">
                            <!-- <li>Акция "Новогодние хиты"</li>
                  <li>Бесплатный доступ к услугам до 29.02.24</li> -->
                            <!-- <li>Оптимальный интернет для работы и отдыха</li> -->
                        </ul>
                    </div>
                    <button class="choose-btn">Выбрать</button>
                </div>
            </div>
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

                <div class="swiper-slide tarif-option">
                    <div class="tarif-slider-description">
                        <div class="tarif-promo">Акция</div>
                        <!-- <div class="tarif-icon"></div> -->
                        <p class="tarif-name">УЛЬТРА+КИНО</p>
                        <p class="tarif-price">
                            0 <span style="font-size: 0.75rem">₽/мес</span>
                            <span class="tarif-price-old">990 <span style="font-size: 0.75rem">₽/мес</span></span>
                        </p>

                        <div class="tarif-param">
                            <p class="tarif-speed">350 Мбит/с</p>
                            <div class="tarif channels-item" data-package="5e7b7e70acb10bd8ce882ef1">
                                <a class="channels_link link trigger" href="#channels">320 ТВ-каналов</a>
                            </div>
                            <p class="tarif-movie" id="video2">2 из 3 видеосервисов</p>
                        </div>
                        <div class="tarif-options-description">
                            <ul class="tarif-options-list">
                                <!-- <li>"Раздаем интернет всем" на 6 месяцев</li>

                    <li>Интернет, ультра ТВ и кинотеатр на выбор</li> -->
                            </ul>
                        </div>
                        <button class="choose-btn">Выбрать</button>
                    </div>
                </div>
                <!-- end tarif-->
                <div class="swiper-slide tarif-option">
                    <div class="tarif-slider-description">
                        <!-- <div class="tarif-promo">Акция</div> -->
                        <!-- <div class="tarif-icon"></div> -->
                        <p class="tarif-name">ХИТ+ТВ</p>
                        <p class="tarif-price">
                            860<span style="font-size: 0.75rem">₽/мес</span>
                        </p>
                        <div class="tarif-param">
                            <p class="tarif-speed">300 Мбит/с</p>
                            <div class="tarif channels-item" data-package="630f5b1c944a765510046e89">
                                <a class="channels_link link trigger" href="#channels">275 ТВ-каналов</a>
                            </div>
                            <p class="tarif-movie" id="video1">PREMIER</p>
                        </div>
                        <div class="tarif-options-description">
                            <ul class="tarif-options-list">
                                <!-- <li>Акция "Новогодние хиты"</li>
                    <li>Бесплатный доступ к услугам до 29.02.24</li> -->
                            </ul>
                        </div>
                        <button class="choose-btn">Выбрать</button>
                    </div>
                </div>
                <!-- end tarif -->
                <div class="swiper-slide tarif-option">
                    <div class="tarif-slider-description" data-package="5b504edcb2de77e82f591f1a">
                        <!-- <div class="tarif-promo" style="display: none;">
                                  Выгодно
                              </div> -->
                        <!-- <div class="tarif-icon"></div> -->
                        <p class="tarif-name">СТАРТ+ТВ</p>
                        <p class="tarif-price">
                            710 <span style="font-size: 0.75rem">₽/мес</span>
                        </p>
                        <div class="tarif-param">
                            <p class="tarif-speed">100 Мбит/с</p>
                            <div class="tarif channels-item" data-package="5b504edcb2de77e82f591f1a">
                                <a class="channels_link link trigger" href="#channels">180 ТВ-каналов</a>
                            </div>
                            <p class="tarif-movie">
                                <span style="font-size: 1.1rem; font-weight: 900">- </span>
                            </p>
                        </div>
                        <div class="tarif-options-description">
                            <ul class="tarif-options-list">
                                <!-- <li>-20% при оплате на 12 месяцев</li>

                    <li>Интернет и стартовый пакет ТВ-каналов</li> -->
                            </ul>
                        </div>
                        <button class="choose-btn">Выбрать</button>
                    </div>
                </div>
                <!-- end tarif -->
                <div class="swiper-slide tarif-option">
                    <div class="tarif-slider-description">
                        <!-- <div class="tarif-promo">
                                  Выгодно
                              </div> -->
                        <!-- <div class="tarif-icon"></div> -->
                        <p class="tarif-name">СТАРТ+КИНО</p>
                        <p class="tarif-price">
                            810 <span style="font-size: 0.75rem">₽/мес</span>
                        </p>

                        <div class="tarif-param">
                            <p class="tarif-speed">100 Мбит/с</p>
                            <div class="tarif channels-item" data-package="5b504edcb2de77e82f591f1a">
                                <a class="channels_link link trigger" href="#channels">115 ТВ-каналов</a>
                            </div>
                            <p class="tarif-movie" id="video0">1 видеосервисов из 3</p>
                        </div>
                        <div class="tarif-options-description">
                            <ul class="tarif-options-list">
                                <!-- <li>-20% при оплате на 12 месяцев</li>

                    <li>Всё под рукой: интернет, ТВ и онлайн-кинотеатр</li> -->
                            </ul>
                        </div>
                        <button class="choose-btn">Выбрать</button>
                    </div>
                </div>

                <!-- end tarif -->
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>

    <div class="checkout">
        <h3>Вы выбрали</h3>
        <div class="total-price">
            <div class="selection"><span>sample </span> <span>9.98</span></div>
            <div class="selection">
                <span>Delivery </span> <span>select type</span>
            </div>
            <div class="total"><span>Total</span>848</div>
            <input id="myCheckbox" type="checkbox" />
            <button class="btn checkout-btn">Checkout</button>
        </div>
        <a href="javascript:void(0);" class="close-btn">
            <i class="fas fa-times"></i>
        </a>
    </div>

    <div class="modal-bg-tv">
        <div class="modal-tv">
            <div class="modal-header"></div>
            <div class="channels_list"></div>
            <div class="output"></div>

            <span id="close-tv" class="modal-close">X</span>
        </div>
    </div>

    <div class="modal-bg">
        <div class="modal">
            <form action="./php/telegram.php" method="post" id="form2" name="call-form"
                onsubmit="return validateForm();">
                <p style="font-weight: bold; margin-bottom: 1rem; text-align: center">
                    Заявка на подключение
                </p>
                <label class="fs-200" for="name1">Имя</label>
                <input type="text" name="name" id="name1" class="field" required />
                <label class="fs-200" for="phone1">Телефон</label>
                <input type="tel" class="field" data-tel-input maxlength="18" name="number" id="phone1" required />
                <label class="fs-200" for="adr11">Адрес</label>
                <input type="text" class="field" name="address" id="adr11" required />
                <button type="submit bg-violet" class="btn bg-violet" style="width: 80%; margin-left: 2rem"
                    name="call-submit"
                    onsubmit="if (validateForm(event, this.form)) { this.disabled=true; this.value='Sending, please wait...'; ym(49966909, 'reachGoal', 'form-submit'); } return false;">
                    Отправить
                </button>
                <input autocomplete="off" type="hidden" name="call-control" class="call-control" value="0" />
            </form>
            <span id="closeForm" class="modal-close">X</span>
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
                            Всё летает: скорость 500 Мбит/сек подходит для домашних и
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
        <?php foreach($faqData_json AS $faq) : ?>


        <div class="accordion-item">
            <div class="accordion-item-header fs-400">
                <?php echo $faq["question"] ?>
            </div>
            <div class="accordion-item-body">
                <div class="accordion-item-body-content">
                    <p>
                        <?php  echo nl2br($faq["answer"]) ?>
                    </p>
                </div>
            </div>
        </div>


        <?php endforeach ?>
        <!-- next -->

    </div>
</section>
<section class="form container">
    <h2 style="text-align: center" class="fs-600">Заявка на подключение</h2>
    <div class="contact-box">
        <form action="./php/telegram2.php" method="post" id="form1" name="call-form"
            onsubmit="if (validateForm(event, this.form)) { this.disabled=true; this.value='Sending, please wait...'; ym(47175648, 'reachGoal', 'order'); } return false;">

            <!-- безопасно передаём UTM-метки -->
            <input type="hidden" name="utm_source"
                value="<?= isset($_GET['utm_source']) ? $_GET['utm_source'] : '' ?>" />
            <input type="hidden" name="utm_medium"
                value="<?= isset($_GET['utm_medium']) ? $_GET['utm_medium'] : '' ?>" />
            <input type="hidden" name="utm_campaign"
                value="<?= isset($_GET['utm_campaign']) ? $_GET['utm_campaign'] : '' ?>" />
            <input type="hidden" name="utm_content"
                value="<?= isset($_GET['utm_content']) ? $_GET['utm_content'] : '' ?>" />
            <input type="hidden" name="utm_term" value="<?= isset($_GET['utm_term']) ? $_GET['utm_term'] : '' ?>" />

            <label class="fs-200" for="name1">Имя</label>
            <input type="text" name="name" id="name1" class="field" required />

            <label class="fs-200" for="phone1">Телефон</label>
            <input type="tel" class="field" data-tel-input maxlength="18" name="number" id="phone1" required />

            <label class="fs-200" for="adr11">Адрес</label>
            <input type="text" class="field" name="address" id="adr11" required />

            <button type="submit" class="btn" style="width: 80%; margin-left: 2rem" name="call-submit">
                Отправить
            </button>

            <input autocomplete="off" type="hidden" name="call-control" class="call-control" value="0" />
        </form>
    </div>
</section>