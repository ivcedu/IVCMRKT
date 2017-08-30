<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $TaskName = filter_input(INPUT_POST, 'TaskName');
    $html_id = filter_input(INPUT_POST, 'html_id');
    $Note = filter_input(INPUT_POST, 'Note');
    
    $TaskName = str_replace("'", "", $TaskName);
    $html_id = str_replace("'", "", $html_id);
    $Note = str_replace("'", "''", $Note);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Task] (Active, TaskName, html_id, Note) "
                ."VALUES ('$Active', '$TaskName', '$html_id', '$Note')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);