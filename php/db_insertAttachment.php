<?php
    require("config.php");
    
    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');
    $FileName = filter_input(INPUT_POST, 'FileName');
    $PDFData = filter_input(INPUT_POST, 'PDFData');
    
    $query = "INSERT INTO [IVCMRKT].[dbo].[Attachment] (EventRequestID, FileName, PDFData) "
                ."VALUES ('$EventRequestID', '$FileName', '$PDFData')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);