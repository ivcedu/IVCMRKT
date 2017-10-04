<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $EventDate = filter_input(INPUT_POST, 'EventDate');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktVideoFilming] "
                . "SET EventDate = '".$EventDate."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);