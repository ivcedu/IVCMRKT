<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $ParamName = filter_input(INPUT_POST, 'ParamName');
    $ParamTag = filter_input(INPUT_POST, 'ParamTag');
    
    $ParamName = str_replace("'", "", $ParamName);
    $ParamTag = str_replace("'", "", $ParamTag);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[EmailParam] (Active, ParamName, ParamTag) "
                ."VALUES ('$Active', '$ParamName', '$ParamTag')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);