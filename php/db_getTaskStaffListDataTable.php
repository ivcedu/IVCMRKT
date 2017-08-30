<?php
    require("config.php");

    $query = "SELECT task.TaskName, "
            . "CASE WHEN tksf.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "admn.AdminName, tksf.Note, "
            . "'<a href=# id=''task_staff_id_' + CONVERT(NVARCHAR(255), tksf.TaskStaffID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[TaskStaff] AS tksf INNER JOIN [".$dbDatabase."].[dbo].[Task] AS task ON tksf.TaskID = task.TaskID "
            . "INNER JOIN [".$dbDatabase."].[dbo].[Admin] AS admn ON tksf.AdminID = admn.AdminID "
            . "ORDER BY task.TaskName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);