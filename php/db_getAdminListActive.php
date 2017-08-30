<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[Admin] WHERE Active = 1 AND AdminPrivilegeID <> 1 ORDER BY AdminName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);