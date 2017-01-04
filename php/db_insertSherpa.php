<?php
    require("config.php");
    
    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');
    $Email = filter_input(INPUT_POST, 'Email');
    $Newsfeed = filter_input(INPUT_POST, 'Newsfeed');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Sherpa] (EventRequestID, Email, Newsfeed) "
                ."VALUES ('$EventRequestID', '$Email', '$Newsfeed')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);