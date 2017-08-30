<?php
    require("config.php");

    $query = "SELECT admn.AdminName, "
            . "CASE WHEN admn.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "admn.AdminEmail, adpr.AccessLevel, "
            . "'<a href=# id=''admin_id_' + CONVERT(NVARCHAR(255), admn.AdminID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[Admin] admn INNER JOIN [".$dbDatabase."].[dbo].[AdminPrivilege] adpr ON admn.AdminPrivilegeID = adpr.AdminPrivilegeID "
            . "ORDER BY admn.AdminName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);