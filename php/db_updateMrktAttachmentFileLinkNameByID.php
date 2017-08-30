<?php
    require("config.php");
    
    $MrktAttachmentID = filter_input(INPUT_POST, 'MrktAttachmentID');
    $FileLinkName = filter_input(INPUT_POST, 'FileLinkName');
    
    $FileLinkName = str_replace("'", "", $FileLinkName);
    $FileLinkName = preg_replace("/[^a-zA-Z0-9 ._]/", "", $FileLinkName);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktAttachment] "
                . "SET FileLinkName = '".$FileLinkName."' "
                . "WHERE MrktAttachmentID = '".$MrktAttachmentID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);