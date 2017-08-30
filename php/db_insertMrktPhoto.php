<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $EventDate = filter_input(INPUT_POST, 'EventDate');
    $EventTime = filter_input(INPUT_POST, 'EventTime');
    $Location = filter_input(INPUT_POST, 'Location');
    $EstimatedTime = filter_input(INPUT_POST, 'EstimatedTime');
    
    $Location = str_replace("'", "''", $Location);
    $EstimatedTime = str_replace("'", "''", $EstimatedTime);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktPhoto] (MrktRequestID, AdminID, StatusID, EventDate, EventTime, Location, EstimatedTime) "
                . "VALUES ('$MrktRequestID', '$AdminID', '$StatusID', '$EventDate', '$EventTime', '$Location', '$EstimatedTime')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);