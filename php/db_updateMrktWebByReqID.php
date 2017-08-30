<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $DateNeeded = filter_input(INPUT_POST, 'DateNeeded');
    $ckb_web_create_new = filter_input(INPUT_POST, 'ckb_web_create_new');
    $ckb_web_update_existing = filter_input(INPUT_POST, 'ckb_web_update_existing');
    $ckb_web_add_page = filter_input(INPUT_POST, 'ckb_web_add_page');
    $ckb_web_request_access = filter_input(INPUT_POST, 'ckb_web_request_access');
    $ckb_web_request_website = filter_input(INPUT_POST, 'ckb_web_request_website');
    $ckb_web_report_problem = filter_input(INPUT_POST, 'ckb_web_report_problem');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktWeb] "
                . "SET AdminID = '".$AdminID."', StatusID = '".$StatusID."', DateNeeded = '".$DateNeeded."', "
                . "ckb_web_create_new = '".$ckb_web_create_new."', ckb_web_update_existing = '".$ckb_web_update_existing."', ckb_web_add_page = '".$ckb_web_add_page."', "
                . "ckb_web_request_access = '".$ckb_web_request_access."', ckb_web_request_website = '".$ckb_web_request_website."', ckb_web_report_problem = '".$ckb_web_report_problem."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);