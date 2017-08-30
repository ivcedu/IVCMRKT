<?php
    require("config.php");
    
    $ProcName = filter_input(INPUT_POST, 'ProcName');
    
    $ProcName = str_replace("'", "", $ProcName);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[EmailProc] WHERE ProcName = '".$ProcName."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);