<?php
    require("config.php");
    
    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');
    $BSTIC = filter_input(INPUT_POST, 'BSTIC');
    $SSC = filter_input(INPUT_POST, 'SSC');
    $LSB = filter_input(INPUT_POST, 'LSB');
    
    $query = "INSERT INTO [IVCMRKT].[dbo].[DigitalSignage] (EventRequestID, BSTIC, SSC, LSB) "
                ."VALUES ('$EventRequestID', '$BSTIC', '$SSC', '$LSB')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);