<?php
    require("config.php");
    
    $AccessLevel = filter_input(INPUT_POST, 'AccessLevel');
    
    $AccessLevel = str_replace("'", "", $AccessLevel);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AdminPrivilege] WHERE AccessLevel = '".$AccessLevel."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);