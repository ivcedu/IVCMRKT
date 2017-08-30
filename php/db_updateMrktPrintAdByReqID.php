<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $AdSize = filter_input(INPUT_POST, 'AdSize');
    
    $AdSize = str_replace("'", "", $AdSize);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktPrintAd] "
                . "SET AdSize = '".$AdSize."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);