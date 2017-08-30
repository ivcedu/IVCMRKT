<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_POST, 'StatusID');

    $query = "SELECT emsg.* "
            . "FROM [".$dbDatabase."].[dbo].[EmailMsg] AS emsg INNER JOIN [".$dbDatabase."].[dbo].[EmailProc] AS empr ON emsg.EmailProcID = empr.EmailProcID "
            . "WHERE emsg.Active = 1 AND empr.StatusID = '".$StatusID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);