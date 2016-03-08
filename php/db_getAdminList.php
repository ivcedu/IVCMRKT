<?php
    require("config.php");

    $query = "SELECT AdminName, AdminEmail, "
            . "'<a href=# id=''admin_id_' + CONVERT(NVARCHAR(255), AdminID) + '''><i class=''fa fa-edit''></i></a>' AS AdminID "
            . "FROM [IVCMRKT].[dbo].[Admin] ORDER BY AdminName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);