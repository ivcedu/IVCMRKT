<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[VideoFormat]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);