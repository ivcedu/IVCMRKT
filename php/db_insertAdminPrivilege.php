<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $AccessLevel = filter_input(INPUT_POST, 'AccessLevel');
    
    $AccessLevel = str_replace("'", "", $AccessLevel);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[AdminPrivilege] (Active, AccessLevel) "
                ."VALUES ('$Active', '$AccessLevel')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);