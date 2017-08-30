<?php
    require("config.php");

    $query = "SELECT emsg.EmailMsgName, "
            . "CASE WHEN emsg.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "empr.ProcName, stus.Status, emsg.EmailMsgSubject, "
            . "'<a href=# id=''email_msg_id_' + CONVERT(NVARCHAR(255), emsg.EmailMsgID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[EmailMsg] AS emsg INNER JOIN [".$dbDatabase."].[dbo].[EmailProc] AS empr ON emsg.EmailProcID = empr.EmailProcID "
            . "INNER JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON empr.StatusID = stus.StatusID";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);