<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $CollegeEmail = filter_input(INPUT_POST, 'CollegeEmail');
    
    $CollegeEmail = str_replace("'", "''", $CollegeEmail);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktMediaCollege] "
                . "SET CollegeEmail = '".$CollegeEmail."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);