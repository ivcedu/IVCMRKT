<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktRequest] "
                . "SET StatusID = '".$StatusID."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);