<?php
    require("config.php");
    
    $AdminPrivilegeID = filter_input(INPUT_POST, 'AdminPrivilegeID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AdminPrivilege] WHERE AdminPrivilegeID = '".$AdminPrivilegeID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);