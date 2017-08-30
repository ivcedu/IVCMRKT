<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[MrktAttachment] WHERE MrktRequestID = '".$MrktRequestID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);