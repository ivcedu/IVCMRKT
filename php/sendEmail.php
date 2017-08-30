<?php
    require("class.phpmailer.php");

    $Email = filter_input(INPUT_POST, 'Email');
    $CCEmail = filter_input(INPUT_POST, 'CCEmail');
    $Subject = filter_input(INPUT_POST, 'Subject');
    $Message = filter_input(INPUT_POST, 'Message');
    
    $arr_email_to = explode(';',$Email);
    $arr_email_cc = explode(';',$CCEmail);

    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Host = "smtp1.socccd.edu";
    $mail->From = "ivcpio@ivc.edu";
    $mail->FromName = "IVC Marketing";
    
    foreach ($arr_email_to as $email_to) {
        if ($email_to !== "") {
            $mail->AddAddress(trim($email_to));   
        }
    }
    foreach ($arr_email_cc as $email_cc) {
        if ($email_cc !== "") {
            $mail->AddCC(trim($email_cc)); 
        }    
    }
    
    $mail->IsHTML(true); // send as HTML
    $mail->Subject = $Subject;
    $mail->Body = $Message;

    if($mail->Send()) {
        echo true;
    }
    else {
        echo false;
    }