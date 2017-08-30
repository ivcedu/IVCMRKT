<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $Status = filter_input(INPUT_POST, 'Status');
    
    $Status = str_replace("'", "''", $Status);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Status] (Active, Status) "
                ."VALUES ('$Active', '$Status')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);