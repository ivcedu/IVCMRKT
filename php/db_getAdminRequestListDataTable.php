<?php
    require("config.php");
    
    $Administrator = filter_input(INPUT_POST, 'Administrator');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    
    $sql_where = "";
    if ($Administrator === "false") {
        $sql_where = " AND(mkpr.AdminID = '".$AdminID."' OR mkph.AdminID = '".$AdminID."' OR mkmd.AdminID = '".$AdminID."' OR mkwb.AdminID = '".$AdminID."' OR mkvd.AdminID = '".$AdminID."' OR mked.AdminID = '".$AdminID."')";
    }

    $query = "SELECT mkrq.MrktRequestID, "
            . "'<a href=# id=''mrkt_request_id_' + CONVERT(NVARCHAR(255), mkrq.MrktRequestID) + '''>' + mkrq.ReqTitle + '</a>', "
            . "CONVERT(VARCHAR(10), mkrq.ReqDate, 101), mkrq.Requestor, stus.Status "
            . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON mkrq.StatusID = stus.StatusID "
            . "LEFT JOIN [".$dbDatabase."].[dbo].[MrktPrint] AS mkpr ON mkrq.MrktRequestID = mkpr.MrktRequestID "
            . "LEFT JOIN [".$dbDatabase."].[dbo].[MrktPhoto] AS mkph ON mkrq.MrktRequestID = mkph.MrktRequestID "
            . "LEFT JOIN [".$dbDatabase."].[dbo].[MrktMedia] AS mkmd ON mkrq.MrktRequestID = mkmd.MrktRequestID "
            . "LEFT JOIN [".$dbDatabase."].[dbo].[MrktWeb] AS mkwb ON mkrq.MrktRequestID = mkwb.MrktRequestID "
            . "LEFT JOIN [".$dbDatabase."].[dbo].[MrktVideo] AS mkvd ON mkrq.MrktRequestID = mkvd.MrktRequestID "
            . "LEFT JOIN [".$dbDatabase."].[dbo].[MrktEditorial] AS mked ON mkrq.MrktRequestID = mked.MrktRequestID "
            . "WHERE stus.StatusID <> 1 AND stus.StatusID <> 2 AND stus.StatusID <> 4 AND stus.StatusID <> 7".$sql_where;

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);