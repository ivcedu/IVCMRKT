<?php
    require("config.php");
    
    $MrktWebID = filter_input(INPUT_POST, 'MrktWebID');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[MrktWebFile] WHERE MrktWebID = '".$MrktWebID."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);