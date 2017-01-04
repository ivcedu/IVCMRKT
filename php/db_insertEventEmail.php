<?php
    require("config.php");
    
    $RequestTypeID = filter_input(INPUT_POST, 'EventRequestID');
    $SendDate = filter_input(INPUT_POST, 'SendDate');
    $Subject = filter_input(INPUT_POST, 'Subject');
    $Body = filter_input(INPUT_POST, 'Body');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[EventEmail] (EventRequestID, SendDate, Subject, Body) "
            . "VALUES ('$RequestTypeID', '$SendDate', '$Subject', '$Body')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);