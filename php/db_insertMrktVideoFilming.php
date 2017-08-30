<?php
    require("config.php");
    
    $MrktVideoID = filter_input(INPUT_POST, 'MrktVideoID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $EventDate = filter_input(INPUT_POST, 'EventDate');
    $EventTime = filter_input(INPUT_POST, 'EventTime');
    $Location = filter_input(INPUT_POST, 'Location');
    $Purpose = filter_input(INPUT_POST, 'Purpose');
    $EstimatedTime = filter_input(INPUT_POST, 'EstimatedTime');
    
    $Location = str_replace("'", "''", $Location);
    $Purpose = str_replace("'", "''", $Purpose);
    $EstimatedTime = str_replace("'", "''", $EstimatedTime);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktVideoFilming] (MrktVideoID, MrktRequestID, EventDate, EventTime, Location, Purpose, EstimatedTime) "
                ."VALUES ('$MrktVideoID', '$MrktRequestID', '$EventDate', '$EventTime', '$Location', '$Purpose', '$EstimatedTime')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);