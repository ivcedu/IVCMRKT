<?php
    require("config.php");
    
    $MrktAttachmentID = filter_input(INPUT_POST, 'MrktAttachmentID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktAttachment] "
                . "SET MrktRequestID = '".$MrktRequestID."' "
                . "WHERE MrktAttachmentID = '".$MrktAttachmentID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);