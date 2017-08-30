<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $EmailProcID = filter_input(INPUT_POST, 'EmailProcID');
    $EmailMsgName = filter_input(INPUT_POST, 'EmailMsgName');
    $EmailMsgSubject = filter_input(INPUT_POST, 'EmailMsgSubject');
    $EmailMsgContent = filter_input(INPUT_POST, 'EmailMsgContent');
    
    $EmailMsgName = str_replace("'", "", $EmailMsgName);
    $EmailMsgSubject = str_replace("'", "''", $EmailMsgSubject);
    $EmailMsgContent = str_replace("'", "''", $EmailMsgContent);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[EmailMsg] (Active, EmailProcID, EmailMsgName, EmailMsgSubject, EmailMsgContent) "
                ."VALUES ('$Active', '$EmailProcID', '$EmailMsgName', '$EmailMsgSubject', '$EmailMsgContent')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);