<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $EventDate = filter_input(INPUT_POST, 'EventDate');
    $EventTime = filter_input(INPUT_POST, 'EventTime');
    $Location = filter_input(INPUT_POST, 'Location');
    $EstimatedTime = filter_input(INPUT_POST, 'EstimatedTime');
    
    $Location = str_replace("'", "''", $Location);
    $EstimatedTime = str_replace("'", "''", $EstimatedTime);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktPhoto] "
                . "SET AdminID = '".$AdminID."', StatusID = '".$StatusID."', EventDate = '".$EventDate."', EventTime = '".$EventTime."', "
                . "Location = '".$Location."', EstimatedTime = '".$EstimatedTime."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);