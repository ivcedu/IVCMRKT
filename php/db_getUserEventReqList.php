<?php
    require("config.php");

    $ReqEmail = filter_input(INPUT_POST, 'ReqEmail');
    
    $query = "SELECT evrt.*, stus.[Status] "
            . "FROM [IVCMRKT].[dbo].[EventRequest] AS evrt LEFT JOIN [IVCMRKT].[dbo].[Status] AS stus ON evrt.StatusID = stus.StatusID "
            . "WHERE evrt.ReqEmail = '".$ReqEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);