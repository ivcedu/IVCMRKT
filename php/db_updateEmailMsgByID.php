<?php
    require("config.php");
    
    $EmailMsgID = filter_input(INPUT_POST, 'EmailMsgID');
    $Active = filter_input(INPUT_POST, 'Active');
    $EmailProcID = filter_input(INPUT_POST, 'EmailProcID');
    $EmailMsgName = filter_input(INPUT_POST, 'EmailMsgName');
    $EmailMsgSubject = filter_input(INPUT_POST, 'EmailMsgSubject');
    $EmailMsgContent = filter_input(INPUT_POST, 'EmailMsgContent');
    
    $EmailMsgName = str_replace("'", "", $EmailMsgName);
    $EmailMsgSubject = str_replace("'", "''", $EmailMsgSubject);
    $EmailMsgContent = str_replace("'", "''", $EmailMsgContent);

    $query = "UPDATE [".$dbDatabase."].[dbo].[EmailMsg] "
                . "SET Active = '".$Active."', EmailProcID = '".$EmailProcID."', EmailMsgName = '".$EmailMsgName."', "
                . "EmailMsgSubject = '".$EmailMsgSubject."', EmailMsgContent = '".$EmailMsgContent."', Modified = getdate() "
                . "WHERE EmailMsgID = '".$EmailMsgID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);