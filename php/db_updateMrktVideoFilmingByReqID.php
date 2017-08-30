<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $EventDate = filter_input(INPUT_POST, 'EventDate');
    $EventTime = filter_input(INPUT_POST, 'EventTime');
    $Location = filter_input(INPUT_POST, 'Location');
    $Purpose = filter_input(INPUT_POST, 'Purpose');
    $EstimatedTime = filter_input(INPUT_POST, 'EstimatedTime');
    
    $Location = str_replace("'", "''", $Location);
    $Purpose = str_replace("'", "''", $Purpose);
    $EstimatedTime = str_replace("'", "''", $EstimatedTime);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktVideoFilming] "
                . "SET EventDate = '".$EventDate."', EventTime = '".$EventTime."', Location = '".$Location."', "
                . "Purpose = '".$Purpose."', EstimatedTime = '".$EstimatedTime."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);