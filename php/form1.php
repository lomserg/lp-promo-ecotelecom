<?php
// Адреса получателей
$myaddr = "op@ecotelecom.ru, lomov@ecotelecom.ru";

// Получаем данные из POST
$name = trim($_POST['name'] ?? '');

$number = trim($_POST['number'] ?? '');
$address = trim($_POST['address'] ?? '');

// UTM-метки
$utm_source = trim($_POST['utm_source'] ?? '');
$utm_medium = trim($_POST['utm_medium'] ?? '');
$utm_campaign = trim($_POST['utm_campaign'] ?? '');
$utm_term = trim($_POST['utm_term'] ?? '');

// Точный URL страницы, на которой была заявка
$page_url = trim($_POST['page_url'] ?? '');

// Откуда пользователь пришёл
$referer = $_SERVER['HTTP_REFERER'] ?? '';

// Формируем заголовки письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "From: promo@ecotelecom.ru\r\n";

// Тема письма
$subj = "=?utf-8?b?" . base64_encode('Заявка с лэндинга спец') . "?=";

// Формируем текст письма
$text = "Имя: " . $name;
$text .= "\nТелефон: " . $number;

$text .= "\nАдрес: " . $address;

// Точный URL страницы
if ($page_url !== '') {
    $text .= "\n\nТочный URL страницы: " . $page_url;
}

// Откуда пришёл пользователь
if ($referer !== '') {
    $text .= "\nОткуда перешёл: " . $referer;
}

// UTM
if ($utm_source !== '') {
    $text .= "\nИсточник (utm_source): " . $utm_source;
}

if ($utm_medium !== '') {
    $text .= "\nКанал (utm_medium): " . $utm_medium;
}

if ($utm_campaign !== '') {
    $text .= "\nКампания (utm_campaign): " . $utm_campaign;
}

if ($utm_term !== '') {
    $text .= "\nКлючевые слова (utm_term): " . $utm_term;
}

// Отправляем письмо и перенаправляем
if (mail($myaddr, $subj, $text, $headers)) {
    header("Location: thank_you.html");
    exit;
} else {
    echo "Ошибка при отправке заявки. Пожалуйста, попробуйте позже.";
}
?>