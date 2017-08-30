<?php
    require("config.php");
    
    $EmailProcID = filter_input(INPUT_POST, 'EmailProcID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[EmailProc] WHERE EmailProcID = '".$EmailProcID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);