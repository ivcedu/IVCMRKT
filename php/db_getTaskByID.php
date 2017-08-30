<?php
    require("config.php");
    
    $TaskID = filter_input(INPUT_POST, 'TaskID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Task] WHERE TaskID = '".$TaskID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);