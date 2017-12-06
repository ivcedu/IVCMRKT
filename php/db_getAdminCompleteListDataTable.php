<?php
    require("config.php");
    
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    
    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query_create_table = "CREATE TABLE #PROJECTS (MrktRequestID int, Project nvarchar(255), AdminID int, StatusID int, Completed datetime)";
    $query_drop_table = "DROP TABLE #PROJECTS";
    
    $query_get_print = "INSERT INTO #PROJECTS "
                    . "SELECT mkpr.MrktRequestID, 'Print/Graphics', mkpr.AdminID, mkpr.StatusID, mkpr.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktPrint] AS mkpr "
                    . "WHERE mkpr.StatusID = 4";
    
    $query_get_photo = "INSERT INTO #PROJECTS "
                    . "SELECT mkph.MrktRequestID, 'Photography', mkph.AdminID, mkph.StatusID, mkph.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktPhoto] AS mkph "
                    . "WHERE mkph.StatusID = 4";
    
    $query_get_media = "INSERT INTO #PROJECTS "
                    . "SELECT mkmd.MrktRequestID, 'Social Media/Publicity', mkmd.AdminID, mkmd.StatusID, mkmd.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktMedia] AS mkmd "
                    . "WHERE mkmd.StatusID = 4";
    
    $query_get_web = "INSERT INTO #PROJECTS "
                    . "SELECT mkwb.MrktRequestID, 'Web Services', mkwb.AdminID, mkwb.StatusID, mkwb.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktWeb] AS mkwb "
                    . "WHERE mkwb.StatusID = 4";
    
    $query_get_video = "INSERT INTO #PROJECTS "
                    . "SELECT mkvd.MrktRequestID, 'Video', mkvd.AdminID, mkvd.StatusID, mkvd.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktVideo] AS mkvd "
                    . "WHERE mkvd.StatusID = 4";
    
    $query_get_editorial = "INSERT INTO #PROJECTS "
                    . "SELECT mked.MrktRequestID, 'Editorial Services', mked.AdminID, mked.StatusID, mked.Modified "
                    . "FROM [".$dbDatabase."].[dbo].[MrktEditorial] AS mked "
                    . "WHERE mked.StatusID = 4";

    $query_get_result = "SELECT mkrq.MrktRequestID, "
                    . "'<a href=# id=''mrkt_request_id_' + CONVERT(NVARCHAR(255), mkrq.MrktRequestID) + '''>' + mkrq.ReqTitle + '</a>', "
                    . "CONVERT(VARCHAR(10), mkrq.ReqDate, 101), "
                    . "mkrq.Requestor, "
                    . "proj.Project, "
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