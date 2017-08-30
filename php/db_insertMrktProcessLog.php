<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $TaskID = filter_input(INPUT_POST, 'TaskID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $Note = filter_input(INPUT_POST, 'Note');
    $PreviousLogID = filter_input(INPUT_POST, 'PreviousLogID');
    
    $Note = str_replace("'", "''", $Note);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktProcessLog] (MrktRequestID, LoginName, TaskID, StatusID, Note, PreviousLogID) "
                ."VALUES ('$MrktRequestID', '$LoginName', '$TaskID', '$StatusID', '$Note', '$PreviousLogID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);