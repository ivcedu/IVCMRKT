<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $EndDate = filter_input(INPUT_POST, 'EndDate');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktMediaEntrance] "
                . "SET EndDate = '".$EndDate."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);