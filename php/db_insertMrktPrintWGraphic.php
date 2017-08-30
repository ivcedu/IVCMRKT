<?php
    require("config.php");
    
    $MrktPrintID = filter_input(INPUT_POST, 'MrktPrintID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $WebGraphic = filter_input(INPUT_POST, 'WebGraphic');
    $Dimension = filter_input(INPUT_POST, 'Dimension');
    
    $WebGraphic = str_replace("'", "''", $WebGraphic);
    $Dimension = str_replace("'", "", $Dimension);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktPrintWGraphic] (MrktPrintID, MrktRequestID, WebGraphic, Dimension) "
                ."VALUES ('$MrktPrintID', '$MrktRequestID', '$WebGraphic', '$Dimension')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);