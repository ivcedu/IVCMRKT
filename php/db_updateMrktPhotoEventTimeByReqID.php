<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $EventTime = filter_input(INPUT_POST, 'EventTime');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktPhoto] "
                . "SET EventTime = '".$EventTime."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);