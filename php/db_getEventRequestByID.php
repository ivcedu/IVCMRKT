<?php
    require("config.php");

    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');
    
    $query = "SELECT evrt.*, stus.[Status], rqty.RequestType, dlty.DeliveryType "
            . "FROM [".$dbDatabase."].[dbo].[EventRequest] AS evrt INNER JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON evrt.StatusID = stus.StatusID "
            . "INNER JOIN [".$dbDatabase."].[dbo].[RequestType] AS rqty ON evrt.RequestTypeID = rqty.RequestTypeID "
            . "INNER JOIN [".$dbDatabase."].[dbo].[DeliveryType] AS dlty ON evrt.DeliveryTypeID = dlty.DeliveryTypeID "
            . "WHERE evrt.EventRequestID = '".$EventRequestID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);