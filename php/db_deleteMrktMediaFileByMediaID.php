<?php
    require("config.php");
    
    $MrktMediaID = filter_input(INPUT_POST, 'MrktMediaID');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[MrktMediaFile] WHERE MrktMediaID = '".$MrktMediaID."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);