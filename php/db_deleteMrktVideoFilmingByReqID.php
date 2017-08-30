<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[MrktVideoFilming] WHERE MrktRequestID = '".$MrktRequestID."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);