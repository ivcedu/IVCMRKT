<?php
    require("config.php");
    
    $MrktPrintID = filter_input(INPUT_POST, 'MrktPrintID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $Qty = filter_input(INPUT_POST, 'Qty');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktPrintProgram] (MrktPrintID, MrktRequestID, Qty) "
                ."VALUES ('$MrktPrintID', '$MrktRequestID', '$Qty')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);