<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("promo");
?><br>

<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");?>

<?php
$APPLICATION->IncludeComponent(
    "mycompany:tariffs",
    "",
    [
        "IBLOCK_ID" => 5,
        "FILTER_SECTION_CODE" => "regular", // <- этот параметр будет доступен
        "SEF_MODE" => "Y",
        "SEF_FOLDER" => "/lp/sp/", // <- обязательно укажи, если используешь SEF
        "SEF_URL_TEMPLATES" => [
            "list" => "",
            "detail" => "#ELEMENT_CODE#/",
        ],
    ]
);
?>
<?php
require($_SERVER['DOCUMENT_ROOT'].'/bitrix/footer.php');
?>