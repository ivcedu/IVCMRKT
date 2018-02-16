<?php
    require("config.php");
    
    $Administrator = filter_input(INPUT_POST, 'Administrator');
    $AdminID = filter_input(INPUT_POST, 'AdminID');
    
    $query_print_admin = "";
    $query_photo_admin = "";
    $query_media_admin = "";
    $query_web_admin = "";
    $query_video_admin = "";
    $query_editorial_admin= "";
    if ($Administrator === "false") {
        $query_print_admin = " AND mkpr.AdminID = '".$AdminID."'";
        $query_photo_admin = " AND mkph.AdminID = '".$AdminID."'";
        $query_media_admin = " AND mkmd.AdminID = '".$AdminID."'";
        $query_web_admin = " AND mkwb.AdminID = '".$AdminID."'";
        $query_video_admin = " AND mkvd.AdminID = '".$AdminID."'";
        $query_editorial_admin = " AND mked.AdminID = '".$AdminID."'";
    }
    
    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query_create_table = "CREATE TABLE #PROJECTS (MrktRequestID int, Project nvarchar(255), AdminID int, StatusID int, DueDate date)";
    $query_drop_table = "DROP TABLE #PROJECTS";
    
    $query_get_print = "INSERT INTO #PROJECTS "
                    . "SELECT mkpr.MrktRequestID, 'Print/Graphics', mkpr.AdminID, mkpr.StatusID, mkpr.DateNeeded "
                    . "FROM [".$dbDatabase."].[dbo].[MrktPrint] AS mkpr "
                    . "WHERE mkpr.AdminID <> 0 AND mkpr.StatusID <> 0 AND mkpr.StatusID <> 1 AND mkpr.StatusID <> 4 AND mkpr.StatusID <> 7".$query_print_admin;
    
    $query_get_photo = "INSERT INTO #PROJECTS "
                    . "SELECT mkph.MrktRequestID, 'Photography', mkph.AdminID, mkph.StatusID, mkph.EventDate "
                    . "FROM [".$dbDatabase."].[dbo].[MrktPhoto] AS mkph "
                    . "WHERE mkph.AdminID <> 0 AND mkph.StatusID <> 0 AND mkph.StatusID <> 1 AND mkph.StatusID <> 4 AND mkph.StatusID <> 7".$query_photo_admin;
    
    $query_get_media = "INSERT INTO #PROJECTS "
                    . "SELECT mkmd.MrktRequestID, 'Social Media/Publicity', mkmd.AdminID, mkmd.StatusID, mkmd.DueDate "
                    . "FROM [".$dbDatabase."].[dbo].[MrktMedia] AS mkmd "
                    . "WHERE mkmd.AdminID <> 0 AND mkmd.StatusID <> 0 AND mkmd.StatusID <> 1 AND mkmd.StatusID <> 4 AND mkmd.StatusID <> 7".$query_media_admin;
    
    $query_get_web = "INSERT INTO #PROJECTS "
                    . "SELECT mkwb.MrktRequestID, 'Web Services', mkwb.AdminID, mkwb.StatusID, mkwb.DateNeeded "
                    . "FROM [".$dbDatabase."].[dbo].[MrktWeb] AS mkwb "
                    . "WHERE mkwb.AdminID <> 0 AND mkwb.StatusID <> 0 AND mkwb.StatusID <> 1 AND mkwb.StatusID <> 4 AND mkwb.StatusID <> 7".$query_web_admin;
    
    $query_get_video = "INSERT INTO #PROJECTS "
                    . "SELECT mkvd.MrktRequestID, 'Video', mkvd.AdminID, mkvd.StatusID, mkvd.DueDate "
                    . "FROM [".$dbDatabase."].[dbo].[MrktVideo] AS mkvd "
                    . "WHERE mkvd.AdminID <> 0 AND mkvd.StatusID <> 0 AND mkvd.StatusID <> 1 AND mkvd.StatusID <> 4 AND mkvd.StatusID <> 7".$query_video_admin;
    
    $query_get_editorial = "INSERT INTO #PROJECTS "
                    . "SELECT mked.MrktRequestID, 'Editorial Services', mked.AdminID, mked.StatusID, mked.DueDate "
                    . "FROM [".$dbDatabase."].[dbo].[MrktEditorial] AS mked "
                    . "WHERE mked.AdminID <> 0 AND mked.StatusID <> 0 AND mked.StatusID <> 1 AND mked.StatusID <> 4 AND mked.StatusID <> 7".$query_editorial_admin;

    $query_get_result = "SELECT mkrq.MrktRequestID, "
                    . "'<a href=# id=''mrkt_request_id_' + CONVERT(NVARCHAR(255), mkrq.MrktRequestID) + '''>' + mkrq.ReqTitle + '</a>', "
//                    . "CONVERT(VARCHAR(10), mkrq.ReqDate, 101), "
//                    . "mkrq.Requestor, "
                    . "proj.Project, "
                    . "CONVERT(VARCHAR(10), proj.DueDate, 101), "
                    . "CASE WHEN admn.AdminName IS NULL THEN '' ELSE admn.AdminName END, "
                    . "stus.Status "
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