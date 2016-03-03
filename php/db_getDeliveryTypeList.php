<?php
    require("config.php");
    
    $RequestTypeID = filter_input(INPUT_POST, 'RequestTypeID');

    $query = "SELECT * FROM [IVCMRKT].[dbo].[DeliveryType] WHERE RequestTypeID = '".$RequestTypeID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);