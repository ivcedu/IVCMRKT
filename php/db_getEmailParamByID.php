<?php
    require("config.php");
    
    $EmailParamID = filter_input(INPUT_POST, 'EmailParamID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[EmailParam] WHERE EmailParamID = '".$EmailParamID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);