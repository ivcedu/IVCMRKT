<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[Transaction] WHERE MrktRequestID = '".$MrktRequestID."' ORDER BY TransactionID DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);