<?php
    require("config.php");
    
    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');
    $AnnStartDate = filter_input(INPUT_POST, 'AnnStartDate');
    $AnnStartTime = filter_input(INPUT_POST, 'AnnStartTime');
    $AnnEndDate = filter_input(INPUT_POST, 'AnnEndDate');
    $AnnEndTime = filter_input(INPUT_POST, 'AnnEndTime');
    $AltName = filter_input(INPUT_POST, 'AltName');
    $AltEmail= filter_input(INPUT_POST, 'AltEmail');
    $AltPhone = filter_input(INPUT_POST, 'AltPhone');
    $AnnTitle = filter_input(INPUT_POST, 'AnnTitle');
    $AnnLocation = filter_input(INPUT_POST, 'AnnLocation');
    $AnnText = filter_input(INPUT_POST, 'AnnText');
    $Description = filter_input(INPUT_POST, 'Description');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[EventNewsFeed] (EventRequestID, AnnStartDate, AnnStartTime, AnnEndDate, AnnEndTime, "
            . "AltName, AltEmail, AltPhone, AnnTitle, AnnLocation, AnnText, Description) "
            . "VALUES ('$EventRequestID', '$AnnStartDate', '$AnnStartTime', '$AnnEndDate', '$AnnEndTime', "
            . "'$AltName', '$AltEmail', '$AltPhone', '$AnnTitle', '$AnnLocation', '$AnnText', '$Description')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);