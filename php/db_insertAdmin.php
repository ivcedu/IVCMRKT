<?php
    require("config.php");
    
    $AdminName = filter_input(INPUT_POST, 'AdminName');
    $AdminEmail = filter_input(INPUT_POST, 'AdminEmail');
    $FullAccess = filter_input(INPUT_POST, 'FullAccess');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Admin] (AdminName, AdminEmail, FullAccess) "
                ."VALUES ('$AdminName', '$AdminEmail', '$FullAccess')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);