<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    
    $query_print_option = "";
    $query_photo_option = "";
    $query_media_option = "";
    $query_web_option = "";
    $query_video_option = "";
    $query_editorial_option = "";
    if ($StatusID === "0") {        //all request
        $query_print_option = " AND mkpr.StatusID <> 1 AND mkpr.StatusID <> 0";
        $query_photo_option = " AND mkph.StatusID <> 1 AND mkph.StatusID <> 0";
        $query_media_option = " AND mkmd.StatusID <> 1 AND mkmd.StatusID <> 0";
        $query_web_option = " AND mkwb.StatusID <> 1 AND mkwb.StatusID <> 0";
        $query_video_option = " AND mkvd.StatusID <> 1 AND mkvd.StatusID <> 0";
        $query_editorial_option = " AND mked.StatusID <> 1 AND mked.StatusID <> 0";
    }
    else if ($StatusID === "9") {   // in progress
        $query_print_option = " AND (mkpr.StatusID = 5 OR mkpr.StatusID = 3 OR mkpr.StatusID = 6 OR mkpr.StatusID = 9 OR mkpr.StatusID = 10)";
        $query_photo_option = " AND (mkph.StatusID = 5 OR mkph.StatusID = 3 OR mkph.StatusID = 6 OR mkph.StatusID = 9 OR mkph.StatusID = 10)";
        $query_media_option = " AND (mkmd.StatusID = 5 OR mkmd.StatusID = 3 OR mkmd.StatusID = 6 OR mkmd.StatusID = 9 OR mkmd.StatusID = 10)";
        $query_web_option = " AND (mkwb.StatusID = 5 OR mkwb.StatusID = 3 OR mkwb.StatusID = 6 OR mkwb.StatusID = 9 OR mkwb.StatusID = 10)";
        $query_video_option = " AND (mkvd.StatusID = 5 OR mkvd.StatusID = 3 OR mkvd.StatusID = 6 OR mkvd.StatusID = 9 OR mkvd.StatusID = 10)";
        $query_editorial_option = " AND (mked.StatusID = 5 OR mked.StatusID = 3 OR mked.StatusID = 6 OR mked.StatusID = 9 OR mked.StatusID = 10)";
    }
    else if ($StatusID === "4") {   // complted
        $query_print_option = " AND mkpr.StatusID = 4";
        $query_photo_option = " AND mkph.StatusID = 4";
        $query_media_option = " AND mkmd.StatusID = 4";
        $query_web_option = " AND mkwb.StatusID = 4";
        $query_video_option = " AND mkvd.StatusID = 4";
        $query_editorial_option = " AND mked.StatusID = 4";
    }
    else if ($StatusID === "7") {   // canceled
        $query_print_option = " AND mkpr.StatusID = 7";
        $query_photo_option = " AND mkph.StatusID = 7";
        $query_media_option = " AND mkmd.StatusID = 7";
        $query_web_option = " AND mkwb.StatusID = 7";
        $query_video_option = " AND mkvd.StatusID = 7";
        $query_editorial_option = " AND mked.StatusID = 7";
    }
    
    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query_create_table = "CREATE TABLE #PROJECTS (MrktRequestID int, Project nvarchar(255), AdminID int, StatusID int, Modified datetime)";
    $query_drop_table = "DROP TABLE #PROJECTS";
    
    $query_get_print = "INSERT INTO #PROJECTS "
                    . "SELECT mkpr.MrktRequestID, 'Print/Graphics', mkpr.AdminID, mkpr.StatusID, mkpr.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktPrint] AS mkpr ON mkrq.MrktRequestID = mkpr.MrktRequestID "
                    . "WHERE mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'".$query_print_option;
    
    $query_get_photo = "INSERT INTO #PROJECTS "
                    . "SELECT mkph.MrktRequestID, 'Photography', mkph.AdminID, mkph.StatusID, mkph.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktPhoto] AS mkph ON mkrq.MrktRequestID = mkph.MrktRequestID "
                    . "WHERE mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'".$query_photo_option;
    
    $query_get_media = "INSERT INTO #PROJECTS "
                    . "SELECT mkmd.MrktRequestID, 'Social Media/Publicity', mkmd.AdminID, mkmd.StatusID, mkmd.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktMedia] AS mkmd ON mkrq.MrktRequestID = mkmd.MrktRequestID "
                    . "WHERE mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'".$query_media_option;
    
    $query_get_web = "INSERT INTO #PROJECTS "
                    . "SELECT mkwb.MrktRequestID, 'Web Services', mkwb.AdminID, mkwb.StatusID, mkwb.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktWeb] AS mkwb ON mkrq.MrktRequestID = mkwb.MrktRequestID "
                    . "WHERE mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'".$query_web_option;
    
    $query_get_video = "INSERT INTO #PROJECTS "
                    . "SELECT mkvd.MrktRequestID, 'Video', mkvd.AdminID, mkvd.StatusID, mkvd.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktVideo] AS mkvd ON mkrq.MrktRequestID = mkvd.MrktRequestID "
                    . "WHERE mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'".$query_video_option;
    
    $query_get_editorial = "INSERT INTO #PROJECTS "
                    . "SELECT mked.MrktRequestID, 'Editorial Services', mked.AdminID, mked.StatusID, mked.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq INNER JOIN [".$dbDatabase."].[dbo].[MrktEditorial] AS mked ON mkrq.MrktRequestID = mked.MrktRequestID "
                    . "WHERE mkrq.ReqDate BETWEEN '".$StartDate."' AND '".$EndDate."'".$query_editorial_option;

    $query_get_result = "SELECT mkrq.MrktRequestID, "
                    . "'<a href=# id=''mrkt_request_id_' + CONVERT(NVARCHAR(255), mkrq.MrktRequestID) + '''>' + mkrq.ReqTitle + '</a>', "
                    . "CONVERT(VARCHAR(10), mkrq.ReqDate, 101), "
                    . "mkrq.Requestor, "
                    . "mkrq.ReqDepart, "
                    . "proj.Project, "
                    . "CASE WHEN admn.AdminName IS NULL THEN '' ELSE admn.AdminName END, "
                    . "stus.Status, "
                    . "CASE WHEN proj.Modified IS NULL THEN '' WHEN PROJ.StatusID <> 4 THEN '' ELSE CONVERT(VARCHAR(10), proj.Modified, 101) END "
                    . "FROM #PROJECTS AS proj INNER JOIN [".$dbDatabase."].[dbo].[MrktRequest] AS mkrq ON proj.MrktRequestID = mkrq.MrktRequestID "
                    . "INNER JOIN [".$dbDatabase."].[dbo].[Status] AS stus ON proj.StatusID = stus.StatusID "
                    . "LEFT JOIN [".$dbDatabase."].[dbo].[Admin] AS admn ON proj.AdminID = admn.AdminID";
    
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