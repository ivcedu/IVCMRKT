<?php
    require("config.php");
    
    $TaskStaffID = filter_input(INPUT_POST, 'TaskStaffID');
    $Active = filter_input(INPUT_POST, 'Active');
    $TaskID = filter_input(INPUT_POST, 'TaskID');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    $Note = filter_input(INPUT_POST, 'Note');
    
    $Note = str_replace("'", "''", $Note);

    $query = "UPDATE [".$dbDatabase."].[dbo].[TaskStaff] "
                . "SET Active = '".$Active."', TaskID = '".$TaskID."', AdminID = '".$AdminID."', Note = '".$Note."', Modified = getdate() "
                . "WHERE TaskStaffID = '".$TaskStaffID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);