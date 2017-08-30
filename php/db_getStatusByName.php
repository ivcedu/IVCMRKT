<?php
    require("config.php");
    
    $Status = filter_input(INPUT_POST, 'Status');
    
    $Status = str_replace("'", "''", $Status);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Status] WHERE Status = '".$Status."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);