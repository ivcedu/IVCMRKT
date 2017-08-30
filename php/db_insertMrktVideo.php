<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ckb_vdo_filming_request = filter_input(INPUT_POST, 'ckb_vdo_filming_request');
    $ckb_vdo_other = filter_input(INPUT_POST, 'ckb_vdo_other');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktVideo] (MrktRequestID, AdminID, StatusID, ckb_vdo_filming_request, ckb_vdo_other) "
                . "VALUES ('$MrktRequestID', '$AdminID', '$StatusID', '$ckb_vdo_filming_request', '$ckb_vdo_other')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);