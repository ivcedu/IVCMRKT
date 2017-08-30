<?php
    require("config.php");
    
    $MrktMediaID = filter_input(INPUT_POST, 'MrktMediaID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $SherpaEmail = filter_input(INPUT_POST, 'SherpaEmail');
    
    $SherpaEmail = str_replace("'", "''", $SherpaEmail);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktMediaSherpa] (MrktMediaID, MrktRequestID, SherpaEmail) "
                ."VALUES ('$MrktMediaID', '$MrktRequestID', '$SherpaEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);