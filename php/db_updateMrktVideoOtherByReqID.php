<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $Other = filter_input(INPUT_POST, 'Other');
    
    $Other = str_replace("'", "''", $Other);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktVideoOther] "
                . "SET Other = '".$Other."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);