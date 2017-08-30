<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $DateNeeded = filter_input(INPUT_POST, 'DateNeeded');
    $ckb_prt_ad = filter_input(INPUT_POST, 'ckb_prt_ad');
    $ckb_prt_brochure = filter_input(INPUT_POST, 'ckb_prt_brochure');
    $ckb_prt_banner = filter_input(INPUT_POST, 'ckb_prt_banner');
    $ckb_prt_flyer = filter_input(INPUT_POST, 'ckb_prt_flyer');
    $ckb_prt_certificate = filter_input(INPUT_POST, 'ckb_prt_certificate');
    $ckb_prt_postcard = filter_input(INPUT_POST, 'ckb_prt_postcard');
    $ckb_prt_poster = filter_input(INPUT_POST, 'ckb_prt_poster');
    $ckb_prt_program = filter_input(INPUT_POST, 'ckb_prt_program');
    $ckb_prt_other = filter_input(INPUT_POST, 'ckb_prt_other');
    $ckb_prt_web_graphic = filter_input(INPUT_POST, 'ckb_prt_web_graphic');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktPrint] (MrktRequestID, AdminID, StatusID, DateNeeded, "
                . "ckb_prt_ad, ckb_prt_brochure, ckb_prt_banner, ckb_prt_flyer, ckb_prt_certificate, ckb_prt_postcard, ckb_prt_poster, ckb_prt_program, ckb_prt_other, ckb_prt_web_graphic) "
                . "VALUES ('$MrktRequestID', '$AdminID', '$StatusID', '$DateNeeded', "
                . "'$ckb_prt_ad', '$ckb_prt_brochure', '$ckb_prt_banner', '$ckb_prt_flyer', '$ckb_prt_certificate', '$ckb_prt_postcard', '$ckb_prt_poster', '$ckb_prt_program', '$ckb_prt_other', '$ckb_prt_web_graphic')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);