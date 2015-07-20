<?php
    require("config.php");
    
    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');

    $query = "UPDATE [IVCMRKT].[dbo].[EventRequest] "
                ."SET StatusID = '".$StatusID."' "
                ."WHERE EventRequestID = '".$EventRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);