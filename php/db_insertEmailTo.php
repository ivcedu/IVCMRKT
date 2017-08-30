<?php
    require("config.php");
    
    $EmailMsgID = filter_input(INPUT_POST, 'EmailMsgID');
    $ToEmail = filter_input(INPUT_POST, 'ToEmail');
    
    $ToEmail = str_replace("'", "", $ToEmail);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[EmailTo] (EmailMsgID, ToEmail) "
                ."VALUES ('$EmailMsgID', '$ToEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);