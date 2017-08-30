<?php
    require("config.php");
    
    $ReqEmail = filter_input(INPUT_POST, 'ReqEmail');
    
    $ReqEmail = str_replace("'", "", $ReqEmail);

    $query = "SELECT mkrq.MrktRequestID, "
            . "'<a href=# id=''mrkt_request_id_' + CONVERT(NVARCHAR(255), mkrq.MrktRequestID) + '''>' + mkrq.ReqTitle + '</a>', "
            . "CONVERT(VARCHAR(10), mkrq.ReqDate, 101), stus.Status, "
            . "CASE WHEN mkrq.StatusID = 1 THEN '<a href=# id=''mrkt_delete_id_' + CONVERT(NVARCHAR(255), mkrq.MrktRequestID) + '''><i class=''iconic iconic-sm iconic-trash iconic-color-default'' style=''color: grey;''></i></a>' ELSE '' END "
            . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON mkrq.StatusID = stus.StatusID "
            . "WHERE mkrq.StatusID <> 4 AND mkrq.StatusID <> 7 AND mkrq.ReqEmail = '".$ReqEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);