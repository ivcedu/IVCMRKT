<?php
    require("config.php");
    
    $MrktVideoID = filter_input(INPUT_POST, 'MrktVideoID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[MrktVideoFile] WHERE MrktVideoID = '".$MrktVideoID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);