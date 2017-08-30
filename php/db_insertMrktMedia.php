<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ckb_mda_collegewide_email = filter_input(INPUT_POST, 'ckb_mda_collegewide_email');
    $ckb_mda_sherpa_email = filter_input(INPUT_POST, 'ckb_mda_sherpa_email');
    $ckb_mda_monitor = filter_input(INPUT_POST, 'ckb_mda_monitor');
    $ckb_mda_social_media = filter_input(INPUT_POST, 'ckb_mda_social_media');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktMedia] (MrktRequestID, AdminID, StatusID, "
                . "ckb_mda_collegewide_email, ckb_mda_sherpa_email, ckb_mda_monitor, ckb_mda_social_media) "
                . "VALUES ('$MrktRequestID', '$AdminID', '$StatusID', "
                . "'$ckb_mda_collegewide_email', '$ckb_mda_sherpa_email', '$ckb_mda_monitor', '$ckb_mda_social_media')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);