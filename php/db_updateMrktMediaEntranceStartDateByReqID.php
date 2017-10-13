<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $StartDate = filter_input(INPUT_POST, 'StartDate');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktMediaEntrance] "
                . "SET StartDate = '".$StartDate."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);