<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');

    $query = "SELECT * "
            . "FROM [".$dbDatabase."].[dbo].[MrktProcessLog] "
            . "WHERE MrktRequestID = '".$MrktRequestID."' ORDER BY MrktProcessLogID ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);