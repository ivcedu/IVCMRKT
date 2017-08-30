<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[MrktMediaPost] WHERE MrktRequestID = '".$MrktRequestID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);