<?php
    require("config.php");
    
    $MrktMediaID = filter_input(INPUT_POST, 'MrktMediaID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $CollegeEmail = filter_input(INPUT_POST, 'CollegeEmail');
    
    $CollegeEmail = str_replace("'", "''", $CollegeEmail);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktMediaCollege] (MrktMediaID, MrktRequestID, CollegeEmail) "
                ."VALUES ('$MrktMediaID', '$MrktRequestID', '$CollegeEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);