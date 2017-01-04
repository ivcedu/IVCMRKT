<?php
    require("config.php");
    
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $AdminName = filter_input(INPUT_POST, 'AdminName');
    $AdminEmail = filter_input(INPUT_POST, 'AdminEmail');
    $FullAccess = filter_input(INPUT_POST, 'FullAccess');

    $query = "UPDATE [".$dbDatabase."].[dbo].[Admin] "
                ."SET AdminName = '".$AdminName."', AdminEmail = '".$AdminEmail."', FullAccess = '".$FullAccess."' "
                ."WHERE AdminID = '".$AdminID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);