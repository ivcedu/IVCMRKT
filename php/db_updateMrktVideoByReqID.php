<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ckb_vdo_filming_request = filter_input(INPUT_POST, 'ckb_vdo_filming_request');
    $ckb_vdo_other = filter_input(INPUT_POST, 'ckb_vdo_other');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktVideo] "
                . "SET AdminID = '".$AdminID."', StatusID = '".$StatusID."', ckb_vdo_filming_request = '".$ckb_vdo_filming_request."', ckb_vdo_other = '".$ckb_vdo_other."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);