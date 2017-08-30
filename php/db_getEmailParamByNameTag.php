<?php
    require("config.php");
    
    $ParamName = filter_input(INPUT_POST, 'ParamName');
    $ParamTag = filter_input(INPUT_POST, 'ParamTag');
    
    $ParamName = str_replace("'", "", $ParamName);
    $ParamTag = str_replace("'", "", $ParamTag);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[EmailParam] WHERE ParamName = '".$ParamName."' OR ParamTag = '".$ParamTag."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);