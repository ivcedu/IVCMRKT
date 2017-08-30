<?php
    require("config.php");
    
    $MrktAttachmentID = filter_input(INPUT_POST, 'MrktAttachmentID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[MrktAttachment] WHERE MrktAttachmentID = '".$MrktAttachmentID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);