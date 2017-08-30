<?php
    require("config.php");
    
    $MrktWebID = filter_input(INPUT_POST, 'MrktWebID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[MrktWebFile] WHERE MrktWebID = '".$MrktWebID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);