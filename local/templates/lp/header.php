<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
    die();

use Bitrix\Main\Page\Asset;

$asset = Asset::getInstance();
$asset->addCss(SITE_TEMPLATE_PATH . "/assets/styles.css"); // путь относительно шаблона сайта

$templatePath = $APPLICATION->GetTemplatePath(""); // путь к шаблону
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php $APPLICATION->ShowHead(); ?>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php $APPLICATION->ShowTitle(); ?></title>
</head>
<body>
<?php $APPLICATION->ShowPanel(); ?>
<body>
<header class="header container">
    <div class="header__wrapper">
        <a href="#" class="header-logo__wrapper">
            <img class="header-logo__logo" src="<?= SITE_TEMPLATE_PATH ?>/assets/img/logo.svg" alt="logo" alt="logo" />
        </a>
        <?$APPLICATION->IncludeComponent("bitrix:menu", "header_menu", Array(
            "ALLOW_MULTI_SELECT" => "N",	// Разрешить несколько активных пунктов одновременно
            "CHILD_MENU_TYPE" => "left",	// Тип меню для остальных уровней
            "DELAY" => "N",	// Откладывать выполнение шаблона меню
            "MAX_LEVEL" => "1",	// Уровень вложенности меню
            "MENU_CACHE_GET_VARS" => array(	// Значимые переменные запроса
                0 => "",
            ),
            "MENU_CACHE_TIME" => "3600",	// Время кеширования (сек.)
            "MENU_CACHE_TYPE" => "A",	// Тип кеширования
            "MENU_CACHE_USE_GROUPS" => "Y",	// Учитывать права доступа
            "ROOT_MENU_TYPE" => "landing_menu",	// Тип меню для первого уровня
            "USE_EXT" => "N",	// Подключать файлы с именами вида .тип_меню.menu_ext.php
        ),
            false
        );?>
        <button class="btn-primary green-btn">Отправить заявку</button>
        <nav class="humburger__menu">
            <a href="#" class="toggle-btn">
                <span class="bar"></span>
                <span class="bar"></span>
            </a>
        </nav>
    </div>
</header>
<section class="hero__section">

  <div class="hero_wrapper container">
    <div class="hero__content">
        <?php
        $APPLICATION->IncludeFile(
            SITE_TEMPLATE_PATH . '/includes/hero/hero_title.php',
            array(),
            array("MODE" => "html", "NAME" => "заголовок"),

        ) ?>

      <a class="hero__btn m-top-2" href="#tarif_block">Подробнее</a>
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
          <img src="./img/logo_Premier_w.png" alt=""/>
          <img src="./img/logo_start.svg" alt=""/>
          <img src="./img/Amediateka_full_white.png" alt=""/>
        </div>
      </div>

    </div>
    <div>

    </div>
</section>
</body>
</html>
