<?php
    require("config.php");

    $query = "SELECT empr.ProcName, "
            . "CASE WHEN empr.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "stus.Status, "
            . "'<a href=# id=''email_proc_id_' + CONVERT(NVARCHAR(255), empr.EmailProcID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[EmailProc] AS empr INNER JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON empr.StatusID = stus.StatusID";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);