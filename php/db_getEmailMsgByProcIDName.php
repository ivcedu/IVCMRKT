<?php
    require("config.php");
    
    $EmailProcID = filter_input(INPUT_POST, 'EmailProcID');
    $EmailMsgName = filter_input(INPUT_POST, 'EmailMsgName');
    
    $EmailMsgName = str_replace("'", "", $EmailMsgName);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[EmailMsg] WHERE EmailProcID = '".$EmailProcID."' OR EmailMsgName = '".$EmailMsgName."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);