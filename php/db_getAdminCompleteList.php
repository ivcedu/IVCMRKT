<?php
    require("config.php");
    
    $query = "SELECT evrt.EventRequestID, evrt.ReqTitle, evrt.ReqDate, evrt.ReqName, stus.[Status], rqty.RequestType, dlty.DeliveryType "
            . "FROM [IVCMRKT].[dbo].[EventRequest] AS evrt INNER JOIN [IVCMRKT].[dbo].[Status] AS stus ON evrt.StatusID = stus.StatusID "
            . "INNER JOIN [IVCMRKT].[dbo].[RequestType] AS rqty ON evrt.RequestTypeID = rqty.RequestTypeID "
            . "INNER JOIN [IVCMRKT].[dbo].[DeliveryType] AS dlty ON evrt.DeliveryTypeID = dlty.DeliveryTypeID "
            . "WHERE evrt.StatusID = 4";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);