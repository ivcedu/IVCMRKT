<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $SherpaEmail = filter_input(INPUT_POST, 'SherpaEmail');
    
    $SherpaEmail = str_replace("'", "''", $SherpaEmail);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktMediaSherpa] "
                . "SET SherpaEmail = '".$SherpaEmail."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);