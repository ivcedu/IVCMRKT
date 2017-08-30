<?php
    require("config.php");
    
    $EmailMsgID = filter_input(INPUT_POST, 'EmailMsgID');

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[EmailTo] WHERE EmailMsgID = '".$EmailMsgID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);