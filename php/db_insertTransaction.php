<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $Note = filter_input(INPUT_POST, 'Note');
    
    $Note = str_replace("'", "''", $Note);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Transaction] (MrktRequestID, LoginName, Note) "
                ."VALUES ('$MrktRequestID', '$LoginName', '$Note')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);