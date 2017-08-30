<?php
    require("config.php");
    
    $MrktMediaID = filter_input(INPUT_POST, 'MrktMediaID');
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $PostDate = filter_input(INPUT_POST, 'PostDate');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktMediaPost] (MrktMediaID, MrktRequestID, PostDate) "
                ."VALUES ('$MrktMediaID', '$MrktRequestID', '$PostDate')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);