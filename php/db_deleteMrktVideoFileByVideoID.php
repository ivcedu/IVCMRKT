<?php
    require("config.php");
    
    $MrktVideoID = filter_input(INPUT_POST, 'MrktVideoID');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[MrktVideoFile] WHERE MrktVideoID = '".$MrktVideoID."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);