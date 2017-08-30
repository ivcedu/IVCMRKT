<?php
    require("config.php");
    
    $MrktPrintID = filter_input(INPUT_POST, 'MrktPrintID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $OtherDescrip = filter_input(INPUT_POST, 'OtherDescrip');
    
    $OtherDescrip = str_replace("'", "''", $OtherDescrip);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktPrintOther] (MrktPrintID, MrktRequestID, OtherDescrip) "
                ."VALUES ('$MrktPrintID', '$MrktRequestID', '$OtherDescrip')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);