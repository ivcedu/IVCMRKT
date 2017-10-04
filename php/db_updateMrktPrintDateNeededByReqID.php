<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $DateNeeded = filter_input(INPUT_POST, 'DateNeeded');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktPrint] "
                . "SET DateNeeded = '".$DateNeeded."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);