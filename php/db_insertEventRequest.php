<?php
    require("config.php");
    
    $RequestTypeID = filter_input(INPUT_POST, 'RequestTypeID');
    $DeliveryTypeID = filter_input(INPUT_POST, 'DeliveryTypeID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ReqTitle = filter_input(INPUT_POST, 'ReqTitle');
    $ReqName = filter_input(INPUT_POST, 'ReqName');
    $ReqPhone = filter_input(INPUT_POST, 'ReqPhone');
    $ReqEmail = filter_input(INPUT_POST, 'ReqEmail');
    $Department = filter_input(INPUT_POST, 'Department');
    $ReqDate = filter_input(INPUT_POST, 'ReqDate');
    
    $query = "INSERT INTO [IVCMRKT].[dbo].[EventRequest] (RequestTypeID, DeliveryTypeID, StatusID, ReqTitle, ReqName, ReqPhone, ReqEmail, Department, ReqDate) "
            . "VALUES ('$RequestTypeID', '$DeliveryTypeID', '$StatusID', '$ReqTitle', '$ReqName', '$ReqPhone', '$ReqEmail', '$Department', '$ReqDate')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);