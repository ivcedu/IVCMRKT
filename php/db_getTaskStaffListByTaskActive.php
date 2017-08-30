<?php
    require("config.php");
    
    $TaskID = filter_input(INPUT_POST, 'TaskID');

    $query = "SELECT tksf.AdminID, admn.AdminName "
            . "FROM [".$dbDatabase."].[dbo].[TaskStaff] AS tksf INNER JOIN [".$dbDatabase."].[dbo].[Admin] AS admn ON tksf.AdminID = admn.AdminID "
            . "WHERE tksf.Active = 1 AND tksf.TaskID = '".$TaskID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);