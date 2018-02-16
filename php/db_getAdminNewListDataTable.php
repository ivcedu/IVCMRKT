<?php
    require("config.php");

    $query = "SELECT mkrq.MrktRequestID, "
            . "'<a href=# id=''mrkt_request_id_' + CONVERT(NVARCHAR(255), mkrq.MrktRequestID) + '''>' + mkrq.ReqTitle + '</a>', "
//            . "CONVERT(VARCHAR(10), mkrq.ReqDate, 101), mkrq.Requestor, "
            . "stus.Status "
            . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON mkrq.StatusID = stus.StatusID "
            . "WHERE mkrq.StatusID = 2 OR mkrq.StatusID = 11";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);