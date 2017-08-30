<?php
    require("config.php");
    
    $MrktPrintID = filter_input(INPUT_POST, 'MrktPrintID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $Size = filter_input(INPUT_POST, 'Size');
    $Qty = filter_input(INPUT_POST, 'Qty');
    
    $Size = str_replace("'", "", $Size);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktPrintPostCard] (MrktPrintID, MrktRequestID, Size, Qty) "
                ."VALUES ('$MrktPrintID', '$MrktRequestID', '$Size', '$Qty')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);