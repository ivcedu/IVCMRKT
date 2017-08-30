<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $Requestor = filter_input(INPUT_POST, 'Requestor');
    $ReqEmail = filter_input(INPUT_POST, 'ReqEmail');
    $ReqPhone = filter_input(INPUT_POST, 'ReqPhone');
    $ReqDepart = filter_input(INPUT_POST, 'ReqDepart');
    $ReqDate = filter_input(INPUT_POST, 'ReqDate');
    $ReqTitle = filter_input(INPUT_POST, 'ReqTitle');
    $Description = filter_input(INPUT_POST, 'Description');
    
    $Requestor = str_replace("'", "''", $Requestor);
    $ReqEmail = str_replace("'", "", $ReqEmail);
    $ReqDepart = str_replace("'", "''", $ReqDepart);
    $ReqTitle = str_replace("'", "''", $ReqTitle);
    $Description = str_replace("'", "''", $Description);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktRequest] (StatusID, Requestor, ReqEmail, ReqPhone, ReqDepart, ReqDate, ReqTitle, Description) "
                ."VALUES ('$StatusID', '$Requestor', '$ReqEmail', '$ReqPhone', '$ReqDepart', '$ReqDate', '$ReqTitle', '$Description')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);