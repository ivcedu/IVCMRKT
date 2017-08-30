<?php
    require("config.php");
    
    $TaskName = filter_input(INPUT_POST, 'TaskName');
    
    $TaskName = str_replace("'", "", $TaskName);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Task] WHERE TaskName = '".$TaskName."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);