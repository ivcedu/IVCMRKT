<?php
    require("config.php");
    
    $MrktEditorialID = filter_input(INPUT_POST, 'MrktEditorialID');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[MrktEditorialFile] WHERE MrktEditorialID = '".$MrktEditorialID."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);