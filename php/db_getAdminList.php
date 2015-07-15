<?php
    require("config.php");

    $query = "SELECT * FROM [IVCMRKT].[dbo].[Admin]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);