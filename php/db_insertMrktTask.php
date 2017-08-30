<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $ckbMrktPrint = filter_input(INPUT_POST, 'ckbMrktPrint');
    $ckbMrktPhoto = filter_input(INPUT_POST, 'ckbMrktPhoto');
    $ckbMrktMedia = filter_input(INPUT_POST, 'ckbMrktMedia');
    $ckbMrktWeb = filter_input(INPUT_POST, 'ckbMrktWeb');
    $ckbMrktVideo = filter_input(INPUT_POST, 'ckbMrktVideo');
    $ckbMrktEditorial = filter_input(INPUT_POST, 'ckbMrktEditorial');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktTask] (MrktRequestID, ckbMrktPrint, ckbMrktPhoto, ckbMrktMedia, ckbMrktWeb, ckbMrktVideo, ckbMrktEditorial) "
                ."VALUES ('$MrktRequestID', '$ckbMrktPrint', '$ckbMrktPhoto', '$ckbMrktMedia', '$ckbMrktWeb', '$ckbMrktVideo', '$ckbMrktEditorial')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);