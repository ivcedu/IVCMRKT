<?php
    require("config.php");
    
    $MrktPrintID = filter_input(INPUT_POST, 'MrktPrintID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdSize = filter_input(INPUT_POST, 'AdSize');
    
    $AdSize = str_replace("'", "", $AdSize);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktPrintAd] (MrktPrintID, MrktRequestID, AdSize) "
                ."VALUES ('$MrktPrintID', '$MrktRequestID', '$AdSize')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);