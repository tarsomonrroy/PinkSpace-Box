<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMAiler\PHPMailer\SMTP;

    require 'PHPMailer-master/src/Exception.php';
    require 'PHPMailer-master/src/PHPMailer.php';
    require 'PHPMailer-master/src/SMTP.php';

    $from = 'psbox.noreply@gmail.com';
    $message = $_POST['email'];

    function IsInjected($str) {
        $injections = array(//'(\n+)',
               //'(\r+)',
               '(\t+)',
               '(%0A+)',
               '(%0D+)',
               '(%08+)',
               '(%09+)'
               );
                   
        $inject = join('|', $injections);
        $inject = "/$inject/i";
        
        if(preg_match($inject,$str)) {
          return true;
        }
        else {
          return false;
        }
    }
    
    if(IsInjected($message)) {
        echo "Falha ao enviar.";
        exit;
    }

    $to = 'psboxregistros@outlook.com';
    $subject = 'Novo email cadastrado!';
    $body = 'novo email cadastrado: ' . $message;

    $dummy = 'psbox.noreply@gmail.com';
    $password = 'fxbvgiaozcnakvbc';

    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAuth = true;
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->Username = $dummy;
    $mail->Password = $password;
    $mail->setFrom($from);
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $mail->Body = $body;

    $mail->send();

    header("Location: /");

?>