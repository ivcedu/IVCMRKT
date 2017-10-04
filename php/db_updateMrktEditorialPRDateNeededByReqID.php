<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $PRDateNeeded = filter_input(INPUT_POST, 'PRDateNeeded');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktEditorial] "
                . "SET PRDateNeeded = '".$PRDateNeeded."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);