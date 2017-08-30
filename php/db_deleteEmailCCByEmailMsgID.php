<?php
    require("config.php");
    
    $EmailMsgID = filter_input(INPUT_POST, 'EmailMsgID');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[EmailCC] WHERE EmailMsgID = '".$EmailMsgID."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);