<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ReqName = filter_input(INPUT_POST, 'ReqName');
    $ReqPhone = filter_input(INPUT_POST, 'ReqPhone');
    $ReqEmail = filter_input(INPUT_POST, 'ReqEmail');
    $Department = filter_input(INPUT_POST, 'Department');
    $ReqDate = filter_input(INPUT_POST, 'ReqDate');
    $EventTitle = filter_input(INPUT_POST, 'EventTitle');
    $EventDate = filter_input(INPUT_POST, 'EventDate');
    $EventTime = filter_input(INPUT_POST, 'EventTime');
    $Location = filter_input(INPUT_POST, 'Location');
    $ContactName = filter_input(INPUT_POST, 'ContactName');
    $ContactPhone = filter_input(INPUT_POST, 'ContactPhone');
    $ContactEmail = filter_input(INPUT_POST, 'ContactEmail');
    $AnnounceStart = filter_input(INPUT_POST, 'AnnounceStart');
    $AnnounceEnd = filter_input(INPUT_POST, 'AnnounceEnd');
    $AnnounceText = filter_input(INPUT_POST, 'AnnounceText');
    
    $query = "INSERT INTO [IVCMRKT].[dbo].[EventRequest] (StatusID, ReqName, ReqPhone, ReqEmail, Department, ReqDate, EventTitle, EventDate, EventTime, "
            . "Location, ContactName, ContactPhone, ContactEmail, AnnounceStart, AnnounceEnd, AnnounceText) "
            . "VALUES ('$StatusID', '$ReqName', '$ReqPhone', '$ReqEmail', '$Department', '$ReqDate', '$EventTitle', '$EventDate', '$EventTime', "
            . "'$Location', '$ContactName', '$ContactPhone', '$ContactEmail', '$AnnounceStart', '$AnnounceEnd', '$AnnounceText')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);