<?php
    require("config.php");
    
    $RequestTypeID = filter_input(INPUT_POST, 'RequestTypeID');
    $DeliveryTypeID = filter_input(INPUT_POST, 'DeliveryTypeID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ReqName = filter_input(INPUT_POST, 'ReqName');
    $ReqPhone = filter_input(INPUT_POST, 'ReqPhone');
    $ReqEmail = filter_input(INPUT_POST, 'ReqEmail');
    $Department = filter_input(INPUT_POST, 'Department');
    $ReqDate = filter_input(INPUT_POST, 'ReqDate');
    $ReqTitle = filter_input(INPUT_POST, 'ReqTitle');
    $ReqDescrip = filter_input(INPUT_POST, 'ReqDescrip');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[EventRequest] (RequestTypeID, DeliveryTypeID, StatusID, ReqName, ReqPhone, ReqEmail, Department, ReqDate, ReqTitle, ReqDescrip) "
            . "VALUES ('$RequestTypeID', '$DeliveryTypeID', '$StatusID', '$ReqName', '$ReqPhone', '$ReqEmail', '$Department', '$ReqDate', '$ReqTitle', '$ReqDescrip')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);