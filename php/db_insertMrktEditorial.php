<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ckb_edt_copywriting = filter_input(INPUT_POST, 'ckb_edt_copywriting');
    $CWDateNeeded = filter_input(INPUT_POST, 'CWDateNeeded');
    $ckb_edt_proofreading = filter_input(INPUT_POST, 'ckb_edt_proofreading');
    $PRDateNeeded = filter_input(INPUT_POST, 'PRDateNeeded');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktEditorial] (MrktRequestID, AdminID, StatusID, ckb_edt_copywriting, CWDateNeeded, ckb_edt_proofreading, PRDateNeeded) "
                . "VALUES ('$MrktRequestID', '$AdminID', '$StatusID', '$ckb_edt_copywriting', '$CWDateNeeded', '$ckb_edt_proofreading', '$PRDateNeeded')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);