<?php
    require("config.php");

    $query = "SELECT TaskName, "
            . "CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "html_id, Note, "
            . "'<a href=# id=''task_id_' + CONVERT(NVARCHAR(255), TaskID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[Task]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);