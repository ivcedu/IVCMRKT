<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $DueDate = filter_input(INPUT_POST, 'DueDate');
    $ckb_edt_copywriting = filter_input(INPUT_POST, 'ckb_edt_copywriting');
    $CWDateNeeded = filter_input(INPUT_POST, 'CWDateNeeded');
    $ckb_edt_proofreading = filter_input(INPUT_POST, 'ckb_edt_proofreading');
    $PRDateNeeded = filter_input(INPUT_POST, 'PRDateNeeded');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktEditorial] "
                . "SET AdminID = '".$AdminID."', StatusID = '".$StatusID."', DueDate = '".$DueDate."', ckb_edt_copywriting = '".$ckb_edt_copywriting."', CWDateNeeded = '".$CWDateNeeded."', "
                . "ckb_edt_proofreading = '".$ckb_edt_proofreading."', PRDateNeeded = '".$PRDateNeeded."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);