<?php
    require("config.php");
    
    $MrktVideoID = filter_input(INPUT_POST, 'MrktVideoID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $Other = filter_input(INPUT_POST, 'Other');
    
    $Other = str_replace("'", "''", $Other);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktVideoOther] (MrktVideoID, MrktRequestID, Other) "
                ."VALUES ('$MrktVideoID', '$MrktRequestID', '$Other')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);