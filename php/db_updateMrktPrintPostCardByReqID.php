<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $Size = filter_input(INPUT_POST, 'Size');
    $Qty = filter_input(INPUT_POST, 'Qty');
    
    $Size = str_replace("'", "", $Size);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktPrintPostCard] "
                . "SET Size = '".$Size."', Qty = '".$Qty."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);