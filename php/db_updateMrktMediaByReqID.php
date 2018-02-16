<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $DueDate = filter_input(INPUT_POST, 'DueDate');
    $ckb_mda_collegewide_email = filter_input(INPUT_POST, 'ckb_mda_collegewide_email');
    $ckb_mda_sherpa_email = filter_input(INPUT_POST, 'ckb_mda_sherpa_email');
    $ckb_mda_monitor = filter_input(INPUT_POST, 'ckb_mda_monitor');
    $ckb_mda_social_media = filter_input(INPUT_POST, 'ckb_mda_social_media');
    $ckb_mda_college_entrance = filter_input(INPUT_POST, 'ckb_mda_college_entrance');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktMedia] "
                . "SET AdminID = '".$AdminID."', StatusID = '".$StatusID."', DueDate = '".$DueDate."', ckb_mda_collegewide_email = '".$ckb_mda_collegewide_email."', ckb_mda_sherpa_email = '".$ckb_mda_sherpa_email."', "
                . "ckb_mda_monitor = '".$ckb_mda_monitor."', ckb_mda_social_media = '".$ckb_mda_social_media."', ckb_mda_college_entrance = '".$ckb_mda_college_entrance."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);