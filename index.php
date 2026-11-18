<?php

// Базовый путь
$basePath = (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false)
    ? '/lp-php'
    : '';



// Загружаем территории
$territories = require __DIR__ . '/data/territories.php';

// Определяем территорию
$region = $_GET['region'] ?? 'default';
$territory = $territories[$region] ?? null;

// Определяем кампанию
$campaign = $territory['campaign'] ?? 'main';

// Загружаем настройки кампании
$campaignConfig = require __DIR__ . "/data/campaigns/{$campaign}.php";

// Объединяем настройки
// Настройки по умолчанию
$defaultConfig = [
    'city' => '',
    'seo' => [
        'title' => 'Экотелеком — интернет-провайдер',
        'description' => '',
    ],
    'h1' => 'Интернет, который не подведёт',
    'h3' => '',
    'tarifs_title' => 'Тарифы',
];

// Объединяем настройки
$config = array_replace_recursive(
    $defaultConfig,
    $campaignConfig,
    $territory ?? []
);

// Загружаем тарифы 
$tarifs = file_get_contents(
    __DIR__ . '/data/tarifs/' . $campaignConfig['tarifs_file']
);

$tarifs_json = json_decode($tarifs, true);

// Загружаем FAQ (пока старый общий файл)
$faqFile = __DIR__ . "/data/faq/{$campaign}.json";

$faqData = file_get_contents($faqFile);
$faqData_json = json_decode($faqData, true);


// Подключаем header
include __DIR__ . '/inc/header.inc.php';
?>

<?php include __DIR__ . "/inc/heroes/{$campaign}.php"; ?>
<section>
    <div class="bg-modal" id="pack-5b504edcb2de77e82f591f1a">
        <button class="modal-btn">X</button>
        <div id="modal" class="modal-content">
            <div class="channels-list"></div>
        </div>
    </div>
</section>

<section class="new__tarifs">
    <h1 id="tarif_block" class="section-title fs-600">
        <?= htmlspecialchars($config['tarifs_title']) ?>
    </h1>
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

$url = $basePath . '/tarif.php?id=' . (int)$tarif['id'];



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
                    <?php if ($tarif['promo']): ?>
                    <?= htmlspecialchars($tarif['price2']) ?>
                    <span>₽/мес</span>
                    <span class="price-old">
                        <?= htmlspecialchars($tarif['price']) ?> ₽
                    </span>
                    <?php else: ?>
                    <?= htmlspecialchars($tarif['price']) ?>
                    <span>₽/мес</span>
                    <?php endif; ?>
                </p>

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
                    <img src="<?= $basePath ?>/img/devices_1.png" alt="" />
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
                    <img src="<?= $basePath ?>/img/optimal_entertainment.png" alt="" />
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
                    <img style="align-self: flex-start" src="<?= $basePath ?>/img/star-icon.png" alt="" />
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
                    <img style="align-self: flex-start" src="<?= $basePath ?>/img/rocket-icon.png" alt="" />
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
                    <img style="align-self: flex-start" src="<?= $basePath ?>/img/piggy-bank-icon.png" alt="" />
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
        <form action="<?= $basePath ?>/php/form1.php" method="post" id="form1" name="call-form" autocomplete="off">

            <label class="fs-200" for="name1">Имя</label>
            <input type="text" name="name" id="name1" class="field" placeholder="Например: Сергей" required />

            <label class="fs-200" for="phone1">Телефон</label>
            <input type="tel" class="field" data-tel-input maxlength="18" name="number" id="phone1"
                placeholder="+7 (999) 123-45-67" required />

            <label class="fs-200" for="adr11">Адрес подключения</label>

            <!-- Данные для аналитики -->
            <input type="hidden" name="utm_source" id="utm_source">
            <input type="hidden" name="utm_medium" id="utm_medium">
            <input type="hidden" name="utm_campaign" id="utm_campaign">
            <input type="hidden" name="utm_term" id="utm_term">
            <input type="hidden" name="page_url" id="page_url">

            <div class="address-wrapper">
                <textarea class="field" name="address" id="adr11" placeholder="Начните вводить адрес..."
                    autocomplete="off" required rows="1"></textarea>

                <div class="address-suggestions" id="addressSuggestions"></div>
            </div>
            <label class="privacy-consent">
                <input type="checkbox" name="privacy_consent" required>
                <span>
                    Я согласен на обработку персональных данных
                    в соответствии с
                    <a href="/1a29086c87fc0aac5a1b3fd5b398891b.pdf" target="_blank" rel="noopener">
                        Политикой обработки персональных данных
                    </a>
                </span>
            </label>
            <button type="submit" class="button-63 bg-violet" name="call-submit">
                Отправить
            </button>
            <input type="hidden" name="campaign" value="<?= htmlspecialchars($campaign, ENT_QUOTES, 'UTF-8') ?>"> <input
                autocomplete="off" type="hidden" name="call-control" class="call-control" value="0" />
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
    let controller = null;
    let addressSelected = false;

    function clearSuggestions() {
        suggestionsBox.innerHTML = "";
        suggestionsBox.classList.remove("active");
    }

    input.addEventListener("input", () => {
        // Пользователь начал редактировать адрес заново
        addressSelected = false;

        clearTimeout(debounce);

        // Отменяем предыдущий запрос
        if (controller) {
            controller.abort();
        }

        const value = input.value.trim();

        if (value.length < 3) {
            clearSuggestions();
            return;
        }

        debounce = setTimeout(async () => {
            controller = new AbortController();

            const currentController = controller;

            try {
                const response = await fetch(
                    `<?= $basePath ?>/dadata.php?query=${encodeURIComponent(value)}`, {
                        signal: currentController.signal
                    }
                );

                const data = await response.json();

                // Проверяем, не изменился ли адрес за время запроса
                if (
                    addressSelected ||
                    currentController !== controller ||
                    input.value.trim() !== value
                ) {
                    return;
                }

                clearSuggestions();

                if (!data.suggestions?.length) {
                    return;
                }

                data.suggestions.forEach(item => {
                    const div = document.createElement("div");

                    div.className = "suggestion-item";
                    div.textContent = item.value;

                    div.addEventListener("click", () => {
                        addressSelected = true;

                        clearTimeout(debounce);

                        if (controller) {
                            controller.abort();
                        }

                        input.value = item.value;

                        clearSuggestions();
                    });

                    suggestionsBox.appendChild(div);
                });

                suggestionsBox.classList.add("active");

            } catch (e) {
                if (e.name !== "AbortError") {
                    console.error(e);
                }
            }
        }, 300);
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".address-wrapper")) {
            clearSuggestions();
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