<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $Qty = filter_input(INPUT_POST, 'Qty');

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktPrintProgram] "
                . "SET Qty = '".$Qty."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);