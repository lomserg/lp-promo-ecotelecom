<?php 

$name1 = $_POST['name1'];
$number1 = $_POST['phone1'];
$address1 = $_POST['adr11'];
$utm_source = isset($_POST['utm_source']) ? $_POST['utm_source'] : '';
$utm_medium = isset($_POST['utm_medium']) ? $_POST['utm_medium'] : '';
$utm_campaign = isset($_POST['utm_campaign']) ? $_POST['utm_campaign'] : '';
$utm_content = isset($_POST['utm_content']) ? $_POST['utm_content'] : '';
$utm_term = isset($_POST['utm_term']) ? $_POST['utm_term'] : '';

$token = "5896401193:AAG22x_HrfGpMDQ5YPQSso_2WME97kg7hHg";
$chat_id = "-848032498";

$arr = array(
    'Имя пользователя: ' => htmlspecialchars($name1),
    'Телефон: ' => htmlspecialchars($number1),
    'Адрес: ' => htmlspecialchars($address1),
    'utm_source: ' => htmlspecialchars($utm_source),
    'канал: ' => htmlspecialchars($utm_medium)
);

$txt = ""; // Initialize $txt variable
foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
    header('Location: thank_you.html');
} else {
    echo "Error";
}

?>
