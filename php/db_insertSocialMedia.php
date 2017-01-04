<?php
    require("config.php");
    
    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');
    $Facebook = filter_input(INPUT_POST, 'Facebook');
    $Twitter = filter_input(INPUT_POST, 'Twitter');
    $Instagram = filter_input(INPUT_POST, 'Instagram');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[SocialMedia] (EventRequestID, Facebook, Twitter, Instagram) "
                ."VALUES ('$EventRequestID', '$Facebook', '$Twitter', '$Instagram')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);