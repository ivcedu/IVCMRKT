<?php
    require("config.php");
    
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    
    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query_create_table = "CREATE TABLE #PROJECTS (MrktRequestID int, Project nvarchar(255), AdminID int, StatusID int, DueDate date, Completed datetime)";
    $query_drop_table = "DROP TABLE #PROJECTS";
    
    $query_get_print = "INSERT INTO #PROJECTS "
                    . "SELECT mkpr.MrktRequestID, 'Print/Graphics', mkpr.AdminID, mkpr.StatusID, mkpr.DateNeeded, mkpr.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktPrint] AS mkpr ON mkrq.MrktRequestID = mkpr.MrktRequestID "
                    . "WHERE mkpr.StatusID = 4 AND mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'";
    
    $query_get_photo = "INSERT INTO #PROJECTS "
                    . "SELECT mkph.MrktRequestID, 'Photography', mkph.AdminID, mkph.StatusID, mkph.EventDate, mkph.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktPhoto] AS mkph ON mkrq.MrktRequestID = mkph.MrktRequestID "
                    . "WHERE mkph.StatusID = 4 AND mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'";
    
    $query_get_media = "INSERT INTO #PROJECTS "
                    . "SELECT mkmd.MrktRequestID, 'Social Media/Publicity', mkmd.AdminID, mkmd.StatusID, mkmd.DueDate, mkmd.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktMedia] AS mkmd ON mkrq.MrktRequestID = mkmd.MrktRequestID "
                    . "WHERE mkmd.StatusID = 4 AND mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'";
    
    $query_get_web = "INSERT INTO #PROJECTS "
                    . "SELECT mkwb.MrktRequestID, 'Web Services', mkwb.AdminID, mkwb.StatusID, mkwb.DateNeeded, mkwb.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktWeb] AS mkwb ON mkrq.MrktRequestID = mkwb.MrktRequestID "
                    . "WHERE mkwb.StatusID = 4 AND mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'";
    
    $query_get_video = "INSERT INTO #PROJECTS "
                    . "SELECT mkvd.MrktRequestID, 'Video', mkvd.AdminID, mkvd.StatusID, mkvd.DueDate, mkvd.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktVideo] AS mkvd ON mkrq.MrktRequestID = mkvd.MrktRequestID "
                    . "WHERE mkvd.StatusID = 4 AND mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'";
    
    $query_get_editorial = "INSERT INTO #PROJECTS "
                    . "SELECT mked.MrktRequestID, 'Editorial Services', mked.AdminID, mked.StatusID, mked.DueDate, mked.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktEditorial] AS mked ON mkrq.MrktRequestID = mked.MrktRequestID "
                    . "WHERE mked.StatusID = 4 AND mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'";

    $query_get_result = "SELECT mkrq.MrktRequestID, "
                    . "'<a href=# id=''mrkt_request_id_' + CONVERT(NVARCHAR(255), mkrq.MrktRequestID) + '''>' + mkrq.ReqTitle + '</a>', "
//                    . "CONVERT(VARCHAR(10), mkrq.ReqDate, 101), "
//                    . "mkrq.Requestor, "
                    . "proj.Project, "
                    . "CONVERT(VARCHAR(10), proj.DueDate, 101), "
                    . "CASE WHEN admn.AdminName IS NULL THEN '' ELSE admn.AdminName END, "
                    . "stus.Status, "
                    . "CASE WHEN proj.Completed IS NULL THEN '' ELSE CONVERT(VARCHAR(10), proj.Completed, 101) END "
                    . "FROM #PROJECTS AS proj INNER JOIN [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq ON proj.MrktRequestID = mkrq.MrktRequestID "
                    . "INNER JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON proj.StatusID = stus.StatusID "
                    . "LEFT JOIN [".$dbDatabase."].[dbo].[Admin] AS admn ON proj.AdminID = admn.AdminID "
                    . "ORDER BY proj.MrktRequestID ASC";
    
    $dbConn->query($query_create_table);
    $dbConn->query($query_get_print);
    $dbConn->query($query_get_photo);
    $dbConn->query($query_get_media);
    $dbConn->query($query_get_web);
    $dbConn->query($query_get_video);
    $dbConn->query($query_get_editorial);

    $cmd = $dbConn->prepare($query_get_result);
    $cmd->execute(); 
    $data = $cmd->fetchAll();
    
    $dbConn->query($query_drop_table);

    echo json_encode($data);