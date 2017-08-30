<?php
    require("config.php");
    
    $TaskID = filter_input(INPUT_POST, 'TaskID');
    $Active = filter_input(INPUT_POST, 'Active');
    $TaskName = filter_input(INPUT_POST, 'TaskName');
    $html_id = filter_input(INPUT_POST, 'html_id');
    $Note = filter_input(INPUT_POST, 'Note');
    
    $TaskName = str_replace("'", "", $TaskName);
    $html_id = str_replace("'", "", $html_id);
    $Note = str_replace("'", "''", $Note);

    $query = "UPDATE [".$dbDatabase."].[dbo].[Task] "
                . "SET Active = '".$Active."', TaskName = '".$TaskName."', html_id = '".$html_id."', Note = '".$Note."', Modified = getdate() "
                . "WHERE TaskID = '".$TaskID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);