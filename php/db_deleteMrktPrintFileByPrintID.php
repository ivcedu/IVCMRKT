<?php
    require("config.php");
    
    $MrktPrintID = filter_input(INPUT_POST, 'MrktPrintID');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[MrktPrintFile] WHERE MrktPrintID = '".$MrktPrintID."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);