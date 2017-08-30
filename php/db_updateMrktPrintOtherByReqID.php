<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $OtherDescrip = filter_input(INPUT_POST, 'OtherDescrip');
    
    $OtherDescrip = str_replace("'", "''", $OtherDescrip);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktPrintOther] "
                . "SET OtherDescrip = '".$OtherDescrip."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);