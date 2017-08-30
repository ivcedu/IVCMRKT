<?php
    require("config.php");
    
    $MrktAttachmentID = filter_input(INPUT_POST, 'MrktAttachmentID');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[MrktAttachment] WHERE MrktAttachmentID = '".$MrktAttachmentID."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);