<?php
    require("config.php");
    
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');

    $query = "SELECT mkrq.MrktRequestID, "
            . "'<a href=# id=''mrkt_request_id_' + CONVERT(NVARCHAR(255), mkrq.MrktRequestID) + '''>' + mkrq.ReqTitle + '</a>', "
            . "CONVERT(VARCHAR(10), mkrq.ReqDate, 101), mkrq.Requestor, stus.Status, CONVERT(VARCHAR(10), mkrq.Modified, 101) "
            . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON mkrq.StatusID = stus.StatusID "
            . "WHERE (mkrq.StatusID = 4 OR mkrq.StatusID = 7) AND mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);