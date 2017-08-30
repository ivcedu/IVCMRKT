<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
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

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktRequest] "
                . "SET StatusID = '".$StatusID."', Requestor = '".$Requestor."', ReqEmail = '".$ReqEmail."', ReqPhone = '".$ReqPhone."', "
                . "ReqDepart = '".$ReqDepart."', ReqDate = '".$ReqDate."', ReqTitle = '".$ReqTitle."', Description = '".$Description."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);