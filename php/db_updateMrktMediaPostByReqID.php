<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $PostDate = filter_input(INPUT_POST, 'PostDate');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktMediaPost] "
                . "SET PostDate = '".$PostDate."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);