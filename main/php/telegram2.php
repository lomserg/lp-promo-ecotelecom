<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('Invalid request');
}
$name = htmlspecialchars($_POST['name'] ?? '');
$name = $_POST['name'] ?? '';
$number = $_POST['number'] ?? '';
$address = $_POST['address'] ?? '';

$utm_source = $_POST['utm_source'] ?? '';
$utm_medium = $_POST['utm_medium'] ?? '';
$utm_campaign = $_POST['utm_campaign'] ?? '';
$utm_content = $_POST['utm_content'] ?? '';
$utm_term = $_POST['utm_term'] ?? '';

$message = "
Имя: $name
Телефон: $number
Адрес: $address

UTM:
source: $utm_source
medium: $utm_medium
campaign: $utm_campaign
content: $utm_content
term: $utm_term
";

$to = "lomov@ecotelecom.ru, lomserg@gmail.com";

$subject = "Заявка с лендинга";

$headers = "From: promo@ecotelecom.ru\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

// if (mail($to, $subject, $message, $headers)) {
//     header('Location: thank_you.html');
//     exit;
// } else {
//     echo "Ошибка отправки";
// }
if (mail($to, $subject, $message, $headers)) {
    echo "<pre>Отправлено:\n$message</pre>";
    // header('Location: thank_you.html');
    // exit;
} else {
    echo "Ошибка отправки";
}