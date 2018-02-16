<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $DueDate = filter_input(INPUT_POST, 'DueDate');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktEditorial] "
                . "SET DueDate = '".$DueDate."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);