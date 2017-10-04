<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $DateNeeded = filter_input(INPUT_POST, 'DateNeeded');
    $ckb_web_create_new = filter_input(INPUT_POST, 'ckb_web_create_new');
    $ckb_web_update_existing = filter_input(INPUT_POST, 'ckb_web_update_existing');
    $ckb_web_update_url = filter_input(INPUT_POST, 'ckb_web_update_url');
    $ckb_web_add_page = filter_input(INPUT_POST, 'ckb_web_add_page');
    $ckb_web_add_url = filter_input(INPUT_POST, 'ckb_web_add_url');
    $ckb_web_request_website = filter_input(INPUT_POST, 'ckb_web_request_website');
    $ckb_web_report_problem = filter_input(INPUT_POST, 'ckb_web_report_problem');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktWeb] (MrktRequestID, AdminID, StatusID, DateNeeded, "
                . "ckb_web_create_new, ckb_web_update_existing, ckb_web_update_url, ckb_web_add_page, ckb_web_add_url, ckb_web_request_website, ckb_web_report_problem) "
                . "VALUES ('$MrktRequestID', '$AdminID', '$StatusID', '$DateNeeded', "
                . "'$ckb_web_create_new', '$ckb_web_update_existing', '$ckb_web_update_url', '$ckb_web_add_page', '$ckb_web_add_url', '$ckb_web_request_website', '$ckb_web_report_problem')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);