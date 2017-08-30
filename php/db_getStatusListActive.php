<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[Status] WHERE Active = 1 ORDER BY Status ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);