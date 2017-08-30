<?php
    require("config.php");

    $query = "SELECT ParamName, "
            . "CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "ParamTag, "
            . "'<a href=# id=''email_param_id_' + CONVERT(NVARCHAR(255), EmailParamID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[EmailParam]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);