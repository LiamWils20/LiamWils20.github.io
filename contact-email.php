<?php
    $RecipientName = $_POST['name'];
    $Subject = $_POST['subject'];
    $message = $_POST['message'];

    $formcontent = "Name: $RecipientName\nSubject: $Subject\nMessage: $message";
    $thankYou = "Dear $RecipientName,\n
    ";

    $recipient = $_POST['email'];
    $headers = "From: $recipient";
    $thankYouHeaders = "From: wibistudio@gmail.com";

    if (mail("wibistudio@gmail.com", $Subject, $formcontent, $headers)) {
        mail($recipient, "Thank You!", $thankYou, "From: wibistudio@gmail.com");
        header("Location: ThankYou.html");
        exit();
    } else {
        echo "Error sending email.";
    }
?>