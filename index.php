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
            <h1 class="hero__title">ЦЕНЫ НА КАНИКУЛАХ</h1>
            <h3 class="hero__title-second">ОТКРЫЛИ ДОСТУП К ЭКСКЛЮЗИВНЫМ ТАРИФАМ</h3>
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
                    <div class="info-block-feature fs-300 uppercase fw-bold">550</div>
                    <div class="info-block-text">₽/мес</div>
                </div>
            </div>
        </div>
        <!-- <div class="hero__palm ">
            <img src="./img/palm.png" alt="" />
        </div> -->
        <div class="hero__img">
            <img class="hero__img-main" src="./img/panda_2.png" alt="">
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

<section class="new__tarifs">
    <h2 id="tarif_block" class="section-title fs-600">Тарифы</h2>
    <!-- ТАБЫ -->
    <div class="tab-box">
        <button class="tab_btn active" data-category="internet">
            Интернет
        </button>
        <button class="tab_btn" data-category="internet-tv">
            Интернет + ТВ
        </button>
    </div>

    <!-- СЛАЙДЕР -->
    <div class="swiper tarifs-swiper">
        <div class="swiper-wrapper">

            <?php foreach($tarifs_json as $tarif): ?>
            <?php
$params = $_GET;
unset($params['id']);

$url = 'tarif.php?id=' . (int)$tarif['id'];

if (!empty($params)) {
    $url .= '&' . http_build_query($params);
}
?>
            <div class="swiper-slide tarif-item" data-category="<?= $tarif['tv'] ? 'internet-tv' : 'internet'; ?>">
                <h3 class="tarif-title"><?= htmlspecialchars($tarif["name"]) ?></h3>

                <p class="tarif__description">
                    <?= htmlspecialchars($tarif["description"]) ?>
                </p>



                <ul class="tarif__features">
                    <li class="tarif__params">
                        <?= htmlspecialchars($tarif["speed"]) ?> <span>Мбит/сек</span>
                    </li>
                    <!-- <li class="tarif__params channels_link link trigger">-->
                    <!-- <?php /*htmlspecialchars($tarif["channels"])*/ ?> -->
                    <!--  <span>ТВ-каналов</span>
                    </li> -->
                    <li class="tarif tarif__params channels-item <?php echo !empty($tarif["dataPackage"]) ? 'data-package' : 'ntv_channels'; ?>"
                        <?php if (!empty($tarif["dataPackage"])): ?>
                        data-package="<?php echo htmlspecialchars($tarif["dataPackage"]); ?>" <?php endif; ?>>
                        <a class="channels_link link trigger" href="#channels"><?php echo $tarif["channels"] ?>
                            ТВ-каналов</a>

                        <!-- Второе описание если есть -->

                    </li>
                    <?php if (!empty($tarif["description2"])): ?>
                    <p class="tarif__description" style="color: #7acd0d; margin-top: 0.5rem;">
                        <?= htmlspecialchars($tarif["description2"]) ?>
                    </p>
                    <?php elseif (!empty($tarif["movie"])): ?>
                    <p class="tarif-movie" id="video2"><?php echo $tarif["movie"] ?></p>
                    <?php else : ?>
                    <p class="tarif-movie" id="video2">-</p>
                    <?php endif ?>
                </ul>

                <p class="tarif__price">
                    <?= htmlspecialchars($tarif["price"]) ?> <span>₽/мес</span>
                </p>

                <!-- Если есть старая цена, показываем обе -->
                <?php if (!empty($tarif["price2"]) && $tarif["price2"] != 0): ?>
                <p class="tarif__price"
                    style="font-size: 14px; text-decoration: line-through; opacity: 0.7; margin-top: -10px;">
                    <?= htmlspecialchars($tarif["price2"]) ?> <span>₽/мес</span>
                </p>
                <?php endif; ?>
                <a href="<?= htmlspecialchars($url, ENT_QUOTES) ?>" class="tarif-button tarif__btn-green" onclick="
      event.preventDefault();

      let url = event.currentTarget.href;

      console.log('CLICK');

      if (typeof ym !== 'undefined') {

          console.log('YM EXISTS');

          ym(49966909, 'reachGoal', 'tarif_click', {
              tariff_id: '<?= (int)$tarif['id'] ?>',
              tariff_name: '<?= htmlspecialchars($tarif['name'], ENT_QUOTES) ?>'
          });

          console.log('GOAL SENT');

      } else {
          console.log('YM UNDEFINED');
      }

      setTimeout(() => {
          window.location.href = url;
      }, 300);

      return false;
   ">
                    ПОДКЛЮЧИТЬ
                </a>
            </div>
            <?php endforeach; ?>

        </div>

        <!-- PAGINATION -->
        <div class="swiper-pagination"></div>
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
    <h2 style="text-align: center" class="fs-600">
        Заявка на подключение
    </h2>

    <div class="contact-box">
        <form action="./php/form1.php" method="post" id="form1" name="call-form" autocomplete="off">

            <label class="fs-200" for="name1">Имя</label>
            <input type="text" name="name" id="name1" class="field" placeholder="Например: Сергей" required />

            <label class="fs-200" for="phone1">Телефон</label>
            <input type="tel" class="field" data-tel-input maxlength="18" name="number" id="phone1"
                placeholder="+7 (999) 123-45-67" required />

            <label class="fs-200" for="adr11">Адрес подключения</label>
            <input type="hidden" name="utm_source" id="utm_source">
            <input type="hidden" name="utm_medium" id="utm_medium">
            <input type="hidden" name="utm_campaign" id="utm_campaign">
            <input type="hidden" name="utm_term" id="utm_term">
            <div class="address-wrapper">
                <input type="text" class="field" name="address" id="adr11" placeholder="Начните вводить адрес..."
                    autocomplete="off" required>

                <div class="address-suggestions" id="addressSuggestions"></div>
            </div>

            <button type="submit" class="button-63 bg-violet" name="call-submit">
                Отправить
            </button>

            <input autocomplete="off" type="hidden" name="call-control" class="call-control" value="0" />
        </form>
    </div>
</section>


<script>
// function handleTarifClick(event, url, tariffId, tariffName) {
//     event.preventDefault();

//     // Проверка наличия Yandex Metrica
//     if (typeof ym === 'undefined') {
//         console.warn('Yandex Metrica не загружена');
//         window.location.href = url;
//         return;
//     }

//     // Отправка цели
//     ym(49966909, 'reachGoal', 'tarif_click', {
//         tariff_id: tariffId,
//         tariff_name: tariffName
//     });

//     // Редирект с задержкой (для гарантии отправки)
//     setTimeout(() => {
//         window.location.href = url;
//     }, 2000);
// }

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("adr11");
    const suggestionsBox = document.getElementById("addressSuggestions");

    let debounce;
    let addressLocked = false;
    input.addEventListener("input", () => {

        if (addressLocked) return;

        clearTimeout(debounce);

        const value = input.value.trim();

        const hasHouse = /(?:\bд\.?\s*\d+)/i.test(value);

        if (hasHouse) {
            suggestionsBox.innerHTML = "";
            suggestionsBox.classList.remove("active");

            // ❗ блокируем дальнейшие запросы
            addressLocked = true;

            return;
        }

        if (value.length < 3) {
            suggestionsBox.innerHTML = "";
            suggestionsBox.classList.remove("active");
            return;
        }

        debounce = setTimeout(async () => {

            const response = await fetch(
                `./dadata.php?query=${encodeURIComponent(value)}`
            );

            const data = await response.json();

            suggestionsBox.innerHTML = "";

            if (!data.suggestions?.length) {
                suggestionsBox.classList.remove("active");
                return;
            }

            data.suggestions.forEach(item => {

                const div = document.createElement("div");

                div.className = "suggestion-item";
                div.textContent = item.value;

                div.addEventListener("click", () => {

                    const val = item.value;

                    input.value = val + ", ";

                    suggestionsBox.innerHTML = "";
                    suggestionsBox.classList.remove("active");

                    input.focus();
                    const len = input.value.length;
                    input.setSelectionRange(len, len);

                    const hasHouseAfterClick = /(?:\bд\.?\s*\d+)/i.test(
                        input.value);

                    if (hasHouseAfterClick) {
                        addressLocked = true;
                    }
                });

                suggestionsBox.appendChild(div);

            });

            suggestionsBox.classList.add("active");

        }, 300);
    });

    document.addEventListener("click", (e) => {

        if (!e.target.closest(".address-wrapper")) {
            suggestionsBox.innerHTML = "";
            suggestionsBox.classList.remove("active");
        }

    });

});
</script>
<?php
$file = __DIR__ . '/inc/footer.inc.php';
if (file_exists($file)) {
    include $file;
} else {
    echo "Include file not found: $file";
}
?>