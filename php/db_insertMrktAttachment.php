<?php
    require("config.php");
    
    $FileName = filter_input(INPUT_POST, 'FileName');
    $FileType = filter_input(INPUT_POST, 'FileType');
    
    $FileName = str_replace("'", "", $FileName);
    $FileName = preg_replace("/[^a-zA-Z0-9 ._]/", "", $FileName);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktAttachment] (FileName, FileType) "
                ."VALUES ('$FileName', '$FileType')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);