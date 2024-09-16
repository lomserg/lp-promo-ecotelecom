<?php 

$name = $_POST['name'];
$number = $_POST['number'];
$address = $_POST['address'];
$utm_source = isset($_POST['utm_source']) ? $_POST['utm_source'] : '';
$utm_medium = isset($_POST['utm_medium']) ? $_POST['utm_medium'] : '';
$utm_campaign = isset($_POST['utm_campaign']) ? $_POST['utm_campaign'] : '';
$utm_content = isset($_POST['utm_content']) ? $_POST['utm_content'] : '';
$utm_term = isset($_POST['utm_term']) ? $_POST['utm_term'] : '';

$token = "5896401193:AAG22x_HrfGpMDQ5YPQSso_2WME97kg7hHg";
$chat_id = "-848032498";

$arr = array(
    'Имя пользователя: ' => htmlspecialchars($name),
    'Телефон: ' => htmlspecialchars($number),
    'Адрес: ' => htmlspecialchars($address),
    'utm_source: ' => htmlspecialchars($utm_source),
    'канал: ' => htmlspecialchars($utm_medium)
);

$txt = ""; // Initialize $txt variable
foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
}

$response = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}");
if ($response) {
    header('Location: thank_you.html');
} else {
    echo "Error sending message to Telegram";
}

?>
