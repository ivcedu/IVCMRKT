<?php
    require("config.php");
    
    $MrktPhotoID = filter_input(INPUT_POST, 'MrktPhotoID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[MrktPhotoFile] WHERE MrktPhotoID = '".$MrktPhotoID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);