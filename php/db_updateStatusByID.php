<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $Active = filter_input(INPUT_POST, 'Active');
    $Status = filter_input(INPUT_POST, 'Status');
    
    $Status = str_replace("'", "''", $Status);

    $query = "UPDATE [".$dbDatabase."].[dbo].[Status] "
                . "SET Active = '".$Active."', Status = '".$Status."', Modified = getdate() "
                . "WHERE StatusID = '".$StatusID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);