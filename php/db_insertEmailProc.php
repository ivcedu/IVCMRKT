<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ProcName = filter_input(INPUT_POST, 'ProcName');
    
    $ProcName = str_replace("'", "", $ProcName);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[EmailProc] (Active, StatusID, ProcName) "
                ."VALUES ('$Active', '$StatusID', '$ProcName')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);