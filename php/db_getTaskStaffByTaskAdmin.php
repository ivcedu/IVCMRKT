<?php
    require("config.php");
    
    $TaskID = filter_input(INPUT_POST, 'TaskID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[TaskStaff] WHERE TaskID = '".$TaskID."' AND AdminID = '".$AdminID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);