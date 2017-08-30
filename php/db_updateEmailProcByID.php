<?php
    require("config.php");
    
    $EmailProcID = filter_input(INPUT_POST, 'EmailProcID');
    $Active = filter_input(INPUT_POST, 'Active');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $ProcName = filter_input(INPUT_POST, 'ProcName');
    
    $ProcName = str_replace("'", "", $ProcName);

    $query = "UPDATE [".$dbDatabase."].[dbo].[EmailProc] "
                . "SET Active = '".$Active."', StatusID = '".$StatusID."', ProcName = '".$ProcName."', Modified = getdate() "
                . "WHERE EmailProcID = '".$EmailProcID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);