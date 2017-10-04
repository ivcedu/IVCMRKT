<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $CWDateNeeded = filter_input(INPUT_POST, 'CWDateNeeded');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktEditorial] "
                . "SET CWDateNeeded = '".$CWDateNeeded."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);