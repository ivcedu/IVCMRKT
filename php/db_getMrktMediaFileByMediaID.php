<?php
    require("config.php");
    
    $MrktMediaID = filter_input(INPUT_POST, 'MrktMediaID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[MrktMediaFile] WHERE MrktMediaID = '".$MrktMediaID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);