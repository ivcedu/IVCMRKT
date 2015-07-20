<?php
    require("config.php");
    
    $query = "SELECT evrt.*, stus.[Status] "
            . "FROM [IVCMRKT].[dbo].[EventRequest] AS evrt LEFT JOIN [IVCMRKT].[dbo].[Status] AS stus ON evrt.StatusID = stus.StatusID "
            . "WHERE evrt.StatusID <> 4";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);