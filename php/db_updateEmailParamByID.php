<?php
    require("config.php");
    
    $EmailParamID = filter_input(INPUT_POST, 'EmailParamID');
    $Active = filter_input(INPUT_POST, 'Active');
    $ParamName = filter_input(INPUT_POST, 'ParamName');
    $ParamTag = filter_input(INPUT_POST, 'ParamTag');
    
    $ParamName = str_replace("'", "", $ParamName);
    $ParamTag = str_replace("'", "", $ParamTag);

    $query = "UPDATE [".$dbDatabase."].[dbo].[EmailParam] "
                . "SET Active = '".$Active."', ParamName = '".$ParamName."', ParamTag = '".$ParamTag."', Modified = getdate() "
                . "WHERE EmailParamID = '".$EmailParamID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);