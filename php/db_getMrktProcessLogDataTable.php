<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');

    $query = "SELECT mplg.LoginName, "
            . "CASE WHEN mplg.TaskID = 0 THEN '' ELSE task.TaskName END AS Task, "
            . "stus.Status, "
            . "mplg.Note, "
            . "FORMAT(mplg.DTStamp,'MM/dd/yyyy hh:mm:s tt') AS DTStamp "
            . "FROM [".$dbDatabase."].[dbo].[MrktProcessLog] AS mplg LEFT JOIN [".$dbDatabase."].[dbo].[Task] AS task ON mplg.TaskID = task.TaskID "
            . "LEFT JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON mplg.StatusID = stus.StatusID "
            . "WHERE mplg.MrktRequestID = '".$MrktRequestID."' ORDER BY mplg.MrktProcessLogID ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);