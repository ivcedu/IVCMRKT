<?php
    require("config.php");
    
    $AdminPrivilegeID = filter_input(INPUT_POST, 'AdminPrivilegeID');
    $Active = filter_input(INPUT_POST, 'Active');
    $AccessLevel = filter_input(INPUT_POST, 'AccessLevel');
    
    $AccessLevel = str_replace("'", "", $AccessLevel);

    $query = "UPDATE [".$dbDatabase."].[dbo].[AdminPrivilege] "
                . "SET Active = '".$Active."', AccessLevel = '".$AccessLevel."', Modified = getdate() "
                . "WHERE AdminPrivilegeID = '".$AdminPrivilegeID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);