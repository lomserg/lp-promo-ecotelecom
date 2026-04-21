<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Подключение PHPMailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Проверка метода
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('Invalid request');
}

// Получение и очистка данных
$name = htmlspecialchars($_POST['name'] ?? '');
$number = htmlspecialchars($_POST['number'] ?? '');
$address = htmlspecialchars($_POST['address'] ?? '');

$utm_source = htmlspecialchars($_POST['utm_source'] ?? '');
$utm_medium = htmlspecialchars($_POST['utm_medium'] ?? '');
$utm_campaign = htmlspecialchars($_POST['utm_campaign'] ?? '');
$utm_content = htmlspecialchars($_POST['utm_content'] ?? '');
$utm_term = htmlspecialchars($_POST['utm_term'] ?? '');

// Сообщение
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

// Создание объекта
$mail = new PHPMailer(true);

try {
    // SMTP настройки
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth = true;

    $mail->Host = 'smtp.gmail.com';
    $mail->Username = 'fullsatsuma@gmail.com';
    $mail->Password = 'vbrjqultecxlghke'; // app password
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    // Отправитель
    $mail->setFrom('fullsatsuma@gmail.com', 'Экотелеком');

    // Получатели
    $mail->addAddress('lomov@ecotelecom.ru');
    $mail->addAddress('v.simukhin@ecotelecom.ru');
    $mail->addAddress('aleksandrapisareva7@gmail.com ');
    $mail->addAddress('b.gudov@ecotelecom.ru');
    $mail->addAddress('aleksandrovila770@gmail.com ');

    // Письмо
    $mail->isHTML(false);
    $mail->Subject = 'Заявка с лэндинга ОП';
    $mail->Body = $message;

    // Отправка
    $mail->send();

    // Редирект (если нужно)
    header('Location: thank_you.html');
    exit;

} catch (Exception $e) {
    echo "Ошибка отправки: {$mail->ErrorInfo}";
}