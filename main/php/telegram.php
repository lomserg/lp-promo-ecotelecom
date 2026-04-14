<?php 


// 🚫 Принимаем только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('Invalid request');
}

// 🚫 Honeypot (скрытое поле от ботов)
if (!empty($_POST['hidden_field'])) {
    exit('Bot detected');
}

// 🚫 Проверка обязательных полей
if (empty($_POST['name']) || empty($_POST['number']) || empty($_POST['address'])) {
    exit('Empty fields');
}

$name = (string)($_POST['name'] ?? '');
$number = ($_POST['number'] ?? '');
$address = (string) ($_POST['address'] ?? '');
/* Принимаем значения UTM-меток */
$utm_source = $_POST['utm_source'];
$utm_medium = $_POST['utm_medium'];
$utm_campaign = $_POST['utm_campaign'];
$utm_content = $_POST['utm_content'];
$utm_term = $_POST['utm_term'];


$token = "5896401193:AAG22x_HrfGpMDQ5YPQSso_2WME97kg7hHg";
$chat_id = "-848032498";
$arr = array(
    'Имя пользователя: ' => $name,
    'Телефон: ' => $number,
    'Адрес' => $address,
    'utm_source' => $utm_source,
    'канал' => $utm_medium
  );
  
  foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
  };
  
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
  
  if ($sendToTelegram) {
    header('Location: thank_you.html');
  } else {
    echo "Error";
  }
// $headers = "MIME-Version: 1.0\r\n";
// $headers = "Content-Type: text/plain;charset=utf-8";
// $headers = "From: promo@ecotelecom.ru";
// $subj = "=?utf-8?b?".base64_encode('Заявка с лэндинга "ОП"')."?=";

?>