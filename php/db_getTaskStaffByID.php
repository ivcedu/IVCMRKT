<?php
    require("config.php");
    
    $TaskStaffID = filter_input(INPUT_POST, 'TaskStaffID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[TaskStaff] WHERE TaskStaffID = '".$TaskStaffID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);