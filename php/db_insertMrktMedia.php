<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ckb_mda_collegewide_email = filter_input(INPUT_POST, 'ckb_mda_collegewide_email');
    $ckb_mda_sherpa_email = filter_input(INPUT_POST, 'ckb_mda_sherpa_email');
    $ckb_mda_monitor = filter_input(INPUT_POST, 'ckb_mda_monitor');
    $ckb_mda_social_media = filter_input(INPUT_POST, 'ckb_mda_social_media');
    $ckb_mda_college_entrance = filter_input(INPUT_POST, 'ckb_mda_college_entrance');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktMedia] (MrktRequestID, AdminID, StatusID, "
                . "ckb_mda_collegewide_email, ckb_mda_sherpa_email, ckb_mda_monitor, ckb_mda_social_media, ckb_mda_college_entrance) "
                . "VALUES ('$MrktRequestID', '$AdminID', '$StatusID', "
                . "'$ckb_mda_collegewide_email', '$ckb_mda_sherpa_email', '$ckb_mda_monitor', '$ckb_mda_social_media', '$ckb_mda_college_entrance')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);