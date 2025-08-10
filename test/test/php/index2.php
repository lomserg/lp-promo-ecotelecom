<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth = true;
        $mail->Host = 'smtp.gmail.com';
        $mail->Username = 'fullsatsuma@gmail.com';
        $mail->Password = 'vbrjqultecxlghke';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // Sender information
        $mail->setFrom('promo@ecotelecom.ru', 'Заявка с лендинга teleru');
        $mail->addAddress('lomov@ecotelecom.ru');
        $mail->addAddress('op@ecotelecom.ru');
        $mail->addCC('op@ecotelecom.ru');

        // Email content
        $name = $_POST['name'];
        $tel = $_POST['tel'];
        $adres = $_POST['adres'];

        $mail->isHTML(true);
        $mail->Subject = 'Заявка с сайта';
        $mail->Body = "<p>Name: $name</p><p>Telephone: $tel</p><p>Address: $adres</p>";

        // Send email
        $mail->send();

        // Successful sending
        $status = "Message sent successfully!";
    } catch (Exception $e) {
        $status = "Message could not be sent. Error: {$mail->ErrorInfo}";
    }
} else {
    $status = "Invalid request.";
}

echo $status;
?>