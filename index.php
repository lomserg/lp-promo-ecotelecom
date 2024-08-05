<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Экотелеком интернет провайдер</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="icon" href="img/favicon.ico" type="image/x-icon" />
    <meta property="og:url" content="https://intet.ru.net" />
    <meta property="og:image" content="https://intet.ru.net/img/logo.svg" />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Poppins&family=Roboto&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="index.css" />
    <script
      src="https://kit.fontawesome.com/4af22d591d.js"
      crossorigin="anonymous"
      defer
    ></script>

    <script src="https://unpkg.com/@popperjs/core@2" defer></script>
    <script src="https://unpkg.com/tippy.js@6" defer></script>

    <script defer src="./js/channels.js"></script>
    <script defer src="./js/modal.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/swiper@8/swiper-bundle.min.css"
    />

    <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
  </head>

  <body>
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
      (function (m, e, t, r, i, k, a) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }
        (k = e.createElement(t)),
          (a = e.getElementsByTagName(t)[0]),
          (k.async = 1),
          (k.src = r),
          a.parentNode.insertBefore(k, a);
      })(
        window,
        document,
        "script",
        "https://mc.yandex.ru/metrika/tag.js",
        "ym"
      );

      ym(47175648, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    </script>
    <noscript
      ><div>
        <img
          src="https://mc.yandex.ru/watch/47175648"
          style="position: absolute; left: -9999px"
          alt=""
        /></div
    ></noscript>
    <!-- /Yandex.Metrika counter -->

    <section class="hero__bg">
      <header class="header">
        <div class="header-content">
          <a class="logo-header" href="#"></a>

          <div class="whatsapp">
            <a
              id="whatsapp-link"
              href="https://api.whatsapp.com/send/?phone=79912256610"
              target=""
            >
              <img
                class=""
                alt=""
                src="https://i.1.creatium.io/84/76/1c/1fb6a2b7eec23669fcb0131c6057dc770c/whatsapp_icon_png_1.png"
            /></a>
          </div>
          <div class="phone text-dark">
            <a
              style="text-decoration: none"
              class="phoneid"
              href="tel:+74998017799"
              >+7 499 801-77-99</a
            >
          </div>
        </div>
      </header>
      <div class="hero__bg-container container">
        <h1 class="hero__bg-title">Космическая выгода</h1>
        <a href="#tarif_block" class="btn">Подробнее</a>
        <div class="info-blocks">
          <div class="info-block">
            <div class="info-block-feature fs-300 uppercase fw-bold">350</div>
            <div class="info-block-text">Мбит/с</div>
          </div>
          <div class="info-block">
            <div class="info-block-feature fs-300 uppercase fw-bold">300</div>
            <div class="info-block-text">каналов</div>
          </div>
          <div class="info-block img">
            <img src="./img/logo_Premier_w.png" alt="" />
            <img src="./img/logo_start.png" alt="" />
            <img src="./img/Amediateka_full_white.png" alt="" />
          </div>
          <div class="info-block">
            <div class="info-block-feature fs-300 uppercase fw-bold">700</div>
            <div class="info-block-text">₽/мес</div>
          </div>
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
              <!-- <div class="tarif-promo">Акция</div> -->
              <!-- <div class="tarif-icon"></div> -->
              <p class="tarif-name">СТАРТ</p>
              <p class="tarif-price">
                549 <span style="font-size: 0.75rem">₽/мес</span>
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
              <div class="tarif-promo">Акция</div>
              <!-- <div class="tarif-icon"></div> -->
              <p class="tarif-name">ХИТ</p>
              <p class="tarif-price">
                325 <span style="font-size: 0.75rem">₽/мес</span>
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

          <div class="swiper-slide tarif-option">
            <div class="tarif-slider-description">
              <!-- <div class="tarif-promo">Акция</div> -->
              <!-- <div class="tarif-icon"></div> -->
              <p class="tarif-name">МЕГА</p>
              <p class="tarif-price">
                699 <span style="font-size: 0.75rem">₽/мес</span>
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
                  450 <span style="font-size: 0.75rem">₽/мес</span>
                </p>
                <div class="tarif-param">
                  <p class="tarif-speed">350 Мбит/с</p>
                  <div
                    class="tarif channels-item"
                    data-package="5e7b7e70acb10bd8ce882ef1"
                  >
                    <a class="channels_link link trigger" href="#channels"
                      >300 ТВ-каналов</a
                    >
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
              <!-- end-->
            </div>
            <div class="swiper-slide tarif-option">
              <div class="tarif-slider-description">
                <div class="tarif-promo">Акция</div>
                <!-- <div class="tarif-icon"></div> -->
                <p class="tarif-name">МЕГА+КИНО</p>
                <p class="tarif-price">
                  700 <span style="font-size: 0.75rem">₽/мес</span>
                </p>
                <div class="tarif-param">
                  <p class="tarif-speed">500 Мбит/с</p>
                  <div
                    class="tarif channels-item"
                    data-package="5ec3b14fdf29dcff5d5ac065"
                  >
                    <a class="channels_link link trigger" href="#channels"
                      >350 ТВ-каналов</a
                    >
                  </div>
                  <p class="tarif-movie" id="video3">3 из 3 видеосервисов</p>
                </div>
                <div class="tarif-options-description">
                  <ul class="tarif-options-list">
                    <!-- <li>"Раздаем интернет всем" на 6 месяцев</li>

                    <li>Интернет, ультра ТВ и кинотеатр на выбор</li> -->
                  </ul>
                </div>
                <button class="choose-btn">Выбрать</button>
              </div>
              <!-- end-->
            </div>
            <div class="swiper-slide tarif-option">
              <div
                class="tarif-slider-description"
                data-package="5b504edcb2de77e82f591f1a"
              >
                <!-- <div class="tarif-promo" style="display: none;">
                                  Выгодно
                              </div> -->
                <!-- <div class="tarif-icon"></div> -->
                <p class="tarif-name">СТАРТ+ТВ</p>
                <p class="tarif-price">
                  649 <span style="font-size: 0.75rem">₽/мес</span>
                </p>
                <div class="tarif-param">
                  <p class="tarif-speed">100 Мбит/с</p>
                  <div
                    class="tarif channels-item"
                    data-package="5b504edcb2de77e82f591f1a"
                  >
                    <a class="channels_link link trigger" href="#channels"
                      >130 ТВ-каналов</a
                    >
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
            <div class="swiper-slide tarif-option">
              <div class="tarif-slider-description">
                <!-- <div class="tarif-promo">
                                  Выгодно
                              </div> -->
                <!-- <div class="tarif-icon"></div> -->
                <p class="tarif-name">СТАРТ+КИНО</p>
                <p class="tarif-price">
                  729 <span style="font-size: 0.75rem">₽/мес</span>
                </p>

                <div class="tarif-param">
                  <p class="tarif-speed">100 Мбит/с</p>
                  <div
                    class="tarif channels-item"
                    data-package="5b504edcb2de77e82f591f1a"
                  >
                    <a class="channels_link link trigger" href="#channels"
                      >130 ТВ-каналов</a
                    >
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
            <div class="swiper-slide tarif-option">
              <div class="tarif-slider-description">
                <!-- <div class="tarif-promo">Акция</div> -->
                <!-- <div class="tarif-icon"></div> -->
                <p class="tarif-name">ХИТ+ТВ</p>
                <p class="tarif-price">
                  799<span style="font-size: 0.75rem">₽/мес</span>
                </p>
                <div class="tarif-param">
                  <p class="tarif-speed">300 Мбит/с</p>
                  <div
                    class="tarif channels-item"
                    data-package="630f5b1c944a765510046e89"
                  >
                    <a class="channels_link link trigger" href="#channels"
                      >250 ТВ-каналов</a
                    >
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
          <form
            action="./php/telegram2.php"
            method="post"
            id="form2"
            name="call-form"
            onsubmit="return validateForm();"
          >
            <p
              style="font-weight: bold; margin-bottom: 1rem; text-align: center"
            >
              Заявка на подключение
            </p>
            <label class="fs-200" for="name2">Имя</label>
            <input type="text" name="name" id="name2" class="field" required />
            <label class="fs-200" for="phone2">Телефон</label>
            <input
              type="tel"
              class="field"
              data-tel-input
              maxlength="18"
              name="number"
              id="phone2"
              required
            />
            <label class="fs-200" for="adr12">Адрес</label>
            <input
              type="text"
              class="field"
              name="address"
              id="adr12"
              required
            />

            <!-- hidden -->
            <input
              type="hidden"
              name="utm_source"
              value="<?php echo isset($_GET['utm_source']) ? $_GET['utm_source'] : ''; ?>"
            />
            <input
              type="hidden"
              name="utm_medium"
              value="<?php echo isset($_GET['utm_medium']) ? $_GET['utm_medium'] : ''; ?>"
            />
            <input
              type="hidden"
              name="utm_campaign"
              value="<?php echo isset($_GET['utm_campaign']) ? $_GET['utm_campaign'] : ''; ?>"
            />
            <input
              type="hidden"
              name="utm_content"
              value="<?php echo isset($_GET['utm_content']) ? $_GET['utm_content'] : ''; ?>"
            />
            <input
              type="hidden"
              name="utm_term"
              value="<?php echo isset($_GET['utm_term']) ? $_GET['utm_term'] : ''; ?>"
            />

            <button
              type="submit"
              class="btn bg-violet"
              style="width: 80%; margin-left: 2rem"
              name="call-submit"
            >
              Отправить
            </button>
            <input
              autocomplete="off"
              type="hidden"
              name="call-control"
              class="call-control"
              value="0"
            />
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
              <div
                style="padding-bottom: 1rem"
                class="feature-title fs-400 text-white ff-main fw-bold"
              >
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
              <div
                style="padding-bottom: 1rem"
                class="feature-title fs-400 text-white ff-main fw-bold"
              >
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
              <img
                style="align-self: flex-start"
                src="img/emoticon-happy.svg"
                alt=""
              />
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
              <img
                style="align-self: flex-start"
                src="img/emoticon-happy.svg"
                alt=""
              />
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
              <img
                style="align-self: flex-start"
                src="img/emoticon-happy.svg"
                alt=""
              />
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
        <div class="accordion-item">
          <div class="accordion-item-header fs-400">
            Сколько стоит подключение интернета?
          </div>
          <div class="accordion-item-body">
            <div class="accordion-item-body-content">
              <p>
                Подключение осуществляется бесплатно. Мастер протягивает кабель
                до вашего этажа, заводит его в квартиру, подключает к компьютеру
                и настраивает сеть
              </p>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-item-header fs-400">
            Сэкономьте до 20% с абонементом на услуги «Экотелеком»
          </div>
          <div class="accordion-item-body">
            <div class="accordion-item-body-content">
              <p>
                Оплатите услуги на 6 или 12 месяцев и получите существенную
                скидку!
              </p>

              <p>
                Абонемент — привычный способ сэкономить: платишь вперед и
                получаешь скидку. Никаких подводных камней и сложных условий,
                только выгода: — Экономия до 20% — Не надо держать в голове
                очередную дату оплаты — Интернет не закончится в самый
                неподходящий момент
              </p>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-item-header fs-400">
            Списание денежных средств со счета
          </div>
          <div class="accordion-item-body">
            <div class="accordion-item-body-content fs-400">
              <p>
                Сумма с абонентского лицевого счета списывается ежедневно
                равными частями, пропорционально количеству дней в месяце.
              </p>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-item-header fs-400">
            Условия подключения по акции
          </div>
          <div class="accordion-item-body">
            <div class="accordion-item-body-content">
              <ul class="flow">
                <li>
                  Заявки на подключение по акции принимаются до 13.06.24,
                  подключение проводится до 20.06.24 включительно.
                </li>

                <li>
                  Акция проводится для новых абонентов-физических лиц и
                  действует по адресам, где не предоставлялись услуги
                  «Экотелеком» в течение 5 месяцев до момента подключения, кроме
                  ЖК «Кленовые Аллеи» (Москва, пос. Десёновское), ЖК «Цветочные
                  поляны» (Москва, пос. Филимонковское), ЖК «Позитив» (Москва,
                  пос. Московский), ЖК «Новая Звезда» и ЖК «Гарден Парк»
                  (Москва, п. Коммунарка), ЖК «Новоград Павлино» (Балашиха), ЖК
                  «Весенний» (Подольск), ул. Военный городок 42 (Одинцово), а
                  также ЖК «Кутузовская Ривьера», ЖК «Золотые Ключи 2», ул.
                  Барклая 7к4, Ленинский пр-т 111к1 и пр-т Вернадского 92
                  (Москва).
                </li>

                <li>
                  В акции участвуют тарифы: «ХИТ», «УЛЬТРА+КИНО» и «МЕГА+КИНО».
                </li>
                <li>
                  Цена на первые 3 месяца с учетом скидки: «ХИТ» — 325
                  руб./мес., «УЛЬТРА+КИНО» — 450 руб./мес., «МЕГА+КИНО» — 700
                  руб./мес. С 4 месяца услуги предоставляются на условиях
                  действующих тарифных планов.
                </li>
                <li>
                  При подключении по акции на лицевой счет необходимо внести
                  авансовый платеж в размере не менее 1000 рублей.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- next -->
        <div class="accordion-item">
          <div class="accordion-item-header fs-400">
            Возможны ограничение по скорости на определенных адресах
          </div>
          <div class="accordion-item-body">
            <div class="accordion-item-body-content">
              <p>
                В связи с техническими ограничениями скорость по некоторым
                адресам может быть временно ограничена до
                модернизации оборудования.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="form container">
      <h2 style="text-align: center" class="fs-600">Заявка на подключение</h2>
      <div class="contact-box">
        <!-- <h2 class="fs-600" style="margin: 2rem 0;">Заявка на подключение</h2> -->
        <form
          action="./php/telegram.php"
          method="post"
          id="form1"
          name="call-form"
        >
          <!-- hidden -->
          <input
            type="hidden"
            name="utm_source"
            value="<?php $utm_source = $_GET['utm_source']; echo $utm_source; ?>"
          />
          <input
            type="hidden"
            name="utm_medium"
            value="<?php $utm_medium = $_GET['utm_medium']; echo $utm_medium; ?>"
          />
          <input
            type="hidden"
            name="utm_campaign"
            value="<?php $utm_campaign = $_GET['utm_campaign']; echo $utm_campaign; ?>"
          />
          <input
            type="hidden"
            name="utm_content"
            value="<?php $utm_content = $_GET['utm_content']; echo $utm_content; ?>"
          />
          <input
            type="hidden"
            name="utm_term"
            value="<?php $utm_term = $_GET['utm_term']; echo $utm_term; ?>"
          />

          <label class="fs-200" for="name1">Имя</label>
          <input type="text" name="name" id="name1" class="field" required />
          <label class="fs-200" for="phone1">Телефон</label>
          <input
            type="tel"
            class="field"
            data-tel-input
            maxlength="18"
            name="number"
            id="phone1"
            required
          />
          <label class="fs-200" for="adr11">Адрес</label>
          <input type="text" class="field" name="address" id="adr11" required />
          <button
            type="submit"
            class="btn"
            style="width: 80%; margin-left: 2rem"
            name="call-submit"
            onclick="ym(47175648,'reachGoal','order'); return true;"
            onclick="this.disabled=true;this.value='Sending, please wait...';this.form.submit();ym(49966909,'reachGoal','form-submit')"
          >
            Отправить
          </button>
          <input
            autocomplete="off"
            type="hidden"
            name="call-control"
            class="call-control"
            value="0"
          />
        </form>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-main">
        <img src="./img/Group_81.svg" alt="" class="footer-logo" />
        <p class="footer-text fs-100">
          «Экотелеком» — провайдер в Москве и Московской области
        </p>
        <p class="footer-fineprint fs-100">
          Продолжая использовать наш сайт, вы даете согласие на обработку файлов
          Cookies и других пользовательских данных
        </p>
        <p class="footer-fineprint fs-100">© Экотелеком 2024</p>
      </div>
      <ul class="social-list">
        <li class="social-item">
          <a href="https://vk.com/ecotelecom_msk" class="social-link"
            ><i class="fab fa-vk"></i
          ></a>
        </li>
        <!--   <li class="social-item"><a href="https://www.facebook.com/ecotelecom" class="social-link"><i
                            class="fab fa-facebook-square"></i></a></li>
                <li class="social-item"><a href="https://www.instagram.com/ecotelecom_official/" class="social-link"><i
                            class="fab fa-instagram"></i></a></li>-->
      </ul>
    </footer>
    <!-- Andata Tag Manager Code -->
    <script
      type="application/javascript"
      src="//tagmanager.andata.ru/api/v1/container/9b91d137-d2ac-4f60-8303-e5be7e7bbb96/published/code.js"
    ></script>
    <!-- End Andata Tag Manager Code -->
    <script src="https://unpkg.com/@popperjs/core@2" defer></script>
    <script src="https://unpkg.com/tippy.js@6" defer></script>
    <script src="js/index.js" defer></script>
    <script src="js/phoneinput.js"></script>
    <script src="slider.js"></script>
  </body>
</html>
