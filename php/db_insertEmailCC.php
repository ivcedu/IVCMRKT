<?php
    require("config.php");
    
    $EmailMsgID = filter_input(INPUT_POST, 'EmailMsgID');
    $CCEmail = filter_input(INPUT_POST, 'CCEmail');
    
    $CCEmail = str_replace("'", "", $CCEmail);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[EmailCC] (EmailMsgID, CCEmail) "
                ."VALUES ('$EmailMsgID', '$CCEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);