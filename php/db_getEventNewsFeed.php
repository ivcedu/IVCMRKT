<?php
    require("config.php");
    
    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[EventNewsFeed] WHERE EventRequestID = '".$EventRequestID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);