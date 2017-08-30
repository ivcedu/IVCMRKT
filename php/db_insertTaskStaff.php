<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $TaskID = filter_input(INPUT_POST, 'TaskID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $Note = filter_input(INPUT_POST, 'Note');
    
    $Note = str_replace("'", "''", $Note);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[TaskStaff] (Active, TaskID, AdminID, Note) "
                ."VALUES ('$Active', '$TaskID', '$AdminID', '$Note')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);