<?php 

$name = $_POST['name'];
$number = $_POST['number'];
$address = $_POST['address'];

$headers = "MIME-Version: 1.0\r\n";
$headers = "Content-Type: text/plain;charset=utf-8";
$headers = "From: promo@ecotelecom.ru";
$subj = "=?utf-8?b?".base64_encode('Заявка с лэндинга "ОП"')."?=";
$text = "Имя: ".$name." \nТелефон: ".$number." \nГород: ".$city." \nАдрес: ".$address;
$myaddr = "artem.pakhomov.2018@mail.ru, hr@ecotelecom.ru, kvaskov@ecotelecom.ru, egorkarpenkoo@gmail.com, lomov@ecotelecom.ru";
$headers = "From: promo@ecotelecom.ru";
mail($myaddr, $subj, $text, $headers, $from);
header("Location: thank_you.html");
?>