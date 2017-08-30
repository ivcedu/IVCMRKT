<?php
    require("config.php");
    
    $MrktPrintID = filter_input(INPUT_POST, 'MrktPrintID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[MrktPrintFile] WHERE MrktPrintID = '".$MrktPrintID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);