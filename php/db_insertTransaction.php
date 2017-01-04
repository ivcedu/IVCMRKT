<?php
    require("config.php");
    
    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $Note = filter_input(INPUT_POST, 'Note');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Transaction] (EventRequestID, LoginName, Note) "
                ."VALUES ('$EventRequestID', '$LoginName', '$Note')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);