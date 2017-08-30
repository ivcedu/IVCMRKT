<?php
    require("config.php");
    
    $MrktMediaID = filter_input(INPUT_POST, 'MrktMediaID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktMediaMonitor] (MrktMediaID, MrktRequestID, StartDate, EndDate) "
                ."VALUES ('$MrktMediaID', '$MrktRequestID', '$StartDate', '$EndDate')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);