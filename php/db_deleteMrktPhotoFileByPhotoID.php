<?php
    require("config.php");
    
    $MrktPhotoID = filter_input(INPUT_POST, 'MrktPhotoID');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[MrktPhotoFile] WHERE MrktPhotoID = '".$MrktPhotoID."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);