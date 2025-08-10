<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<META HTTP-EQUIV="Refresh" CONTENT="2; URL=http://site.ru">
</head>
<body>
<?php
$myaddr = "op@ecotelecom.ru, lomov@ecotelecom.ru";





	$vacancy = $_POST['vacancy'];
	$name = $_POST['name'];
	$city = $_POST['city'];
	$number = $_POST['number'];
	$address = $_POST['address'];
	
	$utm_source = $_POST['utm_source'];
	$utm_medium = $_POST['utm_medium'];
	$utm_campaign = $_POST['utm_campaign'];
	$utm_term = $_POST['utm_term'];


	$headers = "MIME-Version: 1.0\r\n";
	$headers = "Content-Type: text/plain;charset=utf-8";
  	$headers = "From: promo@ecotelecom.ru";
	$subj = "=?utf-8?b?".base64_encode('Заявка с лэндинга Акция "Улетное предложение"')."?=";
	$text = "Тариф: ".$vacancy."\nИмя: ".$name." \nТелефон: ".$number." \nГород: ".$city." \nАдрес: ".$address;
	if (!empty($utm_source)) $text .= "\nИсточник перехода по ссылке:".$utm_source;

	if (!empty($utm_campaign)) $text .= "\nКомпания:".$utm_campaign;

	if (!empty($utm_medium)) $text .= "\nКлючевой запрос:".$utm_medium;
	
	if (!empty($utm_term)) $text .= "\nКлючевые слова:".$utm_term;

	mail($myaddr, $subj, $text, $headers, $from);
	

	?>
	</body></html>