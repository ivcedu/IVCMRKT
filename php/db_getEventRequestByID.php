<?php
    require("config.php");

    $EventRequestID = filter_input(INPUT_POST, 'EventRequestID');
    
    $query = "SELECT evrt.*, stus.[Status], srpa.*, somd.*, dgsg.* "
            . "FROM [IVCMRKT].[dbo].[EventRequest] AS evrt LEFT JOIN [IVCMRKT].[dbo].[Status] AS stus ON evrt.StatusID = stus.StatusID "
            . "LEFT JOIN [IVCMRKT].[dbo].[Sherpa] AS srpa ON evrt.EventRequestID = srpa.EventRequestID "
            . "LEFT JOIN [IVCMRKT].[dbo].[SocialMedia] AS somd ON evrt.EventRequestID = somd.EventRequestID "
            . "LEFT JOIN [IVCMRKT].[dbo].[DigitalSignage] AS dgsg ON evrt.EventRequestID = dgsg.EventRequestID "
            . "WHERE evrt.EventRequestID = '".$EventRequestID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);