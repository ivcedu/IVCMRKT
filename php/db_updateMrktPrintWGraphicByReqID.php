<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $WebGraphic = filter_input(INPUT_POST, 'WebGraphic');
    $Dimension = filter_input(INPUT_POST, 'Dimension');
    
    $WebGraphic = str_replace("'", "''", $WebGraphic);
    $Dimension = str_replace("'", "", $Dimension);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktPrintWGraphic] "
                . "SET WebGraphic = '".$WebGraphic."', Dimension = '".$Dimension."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);