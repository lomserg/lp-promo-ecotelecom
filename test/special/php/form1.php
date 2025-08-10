<?php
// Адреса получателей
$myaddr = "op@ecotelecom.ru, lomov@ecotelecom.ru";

// Получаем данные из POST
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$city = isset($_POST['city']) ? trim($_POST['city']) : '';
$number = isset($_POST['number']) ? trim($_POST['number']) : '';
$address = isset($_POST['address']) ? trim($_POST['address']) : '';

$utm_source = isset($_POST['utm_source']) ? trim($_POST['utm_source']) : '';
$utm_medium = isset($_POST['utm_medium']) ? trim($_POST['utm_medium']) : '';
$utm_campaign = isset($_POST['utm_campaign']) ? trim($_POST['utm_campaign']) : '';
$utm_term = isset($_POST['utm_term']) ? trim($_POST['utm_term']) : '';

// Формируем заголовки письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "From: promo@ecotelecom.ru\r\n";

// Тема письма, кодируем в base64 для utf-8
$subj = "=?utf-8?b?" . base64_encode('Заявка с лэндинга спец') . "?=";

// Формируем текст письма
$text = "Имя: " . $name . "\nТелефон: " . $number . "\nГород: " . $city . "\nАдрес: " . $address;

if ($utm_source !== '') $text .= "\nИсточник перехода по ссылке: " . $utm_source;
if ($utm_campaign !== '') $text .= "\nКомпания: " . $utm_campaign;
if ($utm_medium !== '') $text .= "\nКлючевой запрос: " . $utm_medium;
if ($utm_term !== '') $text .= "\nКлючевые слова: " . $utm_term;

// Отправляем письмо и перенаправляем
if (mail($myaddr, $subj, $text, $headers)) {
    header("Location: thank_you.html");
    exit;
} else {
    echo "Ошибка при отправке заявки. Пожалуйста, попробуйте позже.";
}
?>