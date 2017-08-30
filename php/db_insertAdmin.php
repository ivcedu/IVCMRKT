<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $AdminName = filter_input(INPUT_POST, 'AdminName');
    $AdminEmail = filter_input(INPUT_POST, 'AdminEmail');
    $AdminPrivilegeID = filter_input(INPUT_POST, 'AdminPrivilegeID');
    
    $AdminName = str_replace("'", "''", $AdminName);
    $AdminEmail = str_replace("'", "", $AdminEmail);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Admin] (Active, AdminName, AdminEmail, AdminPrivilegeID) "
                ."VALUES ('$Active', '$AdminName', '$AdminEmail', '$AdminPrivilegeID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);