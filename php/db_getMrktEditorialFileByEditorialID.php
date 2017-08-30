<?php
    require("config.php");
    
    $MrktEditorialID = filter_input(INPUT_POST, 'MrktEditorialID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[MrktEditorialFile] WHERE MrktEditorialID = '".$MrktEditorialID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);