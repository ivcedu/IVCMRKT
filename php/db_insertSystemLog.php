<?php
    require("config.php");
    
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $Note = filter_input(INPUT_POST, 'Note');
    
    $LoginName = str_replace("'", "''", $LoginName);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[SystemLog] (LoginName, Note) "
                ."VALUES ('$LoginName', '$Note')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);