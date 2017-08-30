<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $ckbMrktPrint = filter_input(INPUT_POST, 'ckbMrktPrint');
    $ckbMrktPhoto = filter_input(INPUT_POST, 'ckbMrktPhoto');
    $ckbMrktMedia = filter_input(INPUT_POST, 'ckbMrktMedia');
    $ckbMrktWeb = filter_input(INPUT_POST, 'ckbMrktWeb');
    $ckbMrktVideo = filter_input(INPUT_POST, 'ckbMrktVideo');
    $ckbMrktEditorial = filter_input(INPUT_POST, 'ckbMrktEditorial');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktTask] "
                . "SET ckbMrktPrint = '".$ckbMrktPrint."', ckbMrktPhoto = '".$ckbMrktPhoto."', ckbMrktMedia = '".$ckbMrktMedia."', ckbMrktWeb = '".$ckbMrktWeb."', "
                . "ckbMrktVideo = '".$ckbMrktVideo."', ckbMrktEditorial = '".$ckbMrktEditorial."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);