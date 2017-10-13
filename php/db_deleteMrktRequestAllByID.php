<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    
    $query1 = "DELETE [".$dbDatabase."].[dbo].[MrktRequest] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query2 = "DELETE [".$dbDatabase."].[dbo].[MrktAttachment] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query3 = "DELETE [".$dbDatabase."].[dbo].[MrktTask] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query4 = "DELETE [".$dbDatabase."].[dbo].[MrktPrint] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query5 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintAd] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query6 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintBrochure] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query7 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintBanner] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query8 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintFlyer] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query9 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintCert] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query10 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintPostCard] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query11 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintPoster] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query12 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintProgram] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query13 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintOther] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query14 = "DELETE [".$dbDatabase."].[dbo].[MrktPrintWGraphic] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query15 = "DELETE [".$dbDatabase."].[dbo].[MrktPhoto] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query16 = "DELETE [".$dbDatabase."].[dbo].[MrktMedia] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query17 = "DELETE [".$dbDatabase."].[dbo].[MrktMediaCollege] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query18 = "DELETE [".$dbDatabase."].[dbo].[MrktMediaSherpa] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query19 = "DELETE [".$dbDatabase."].[dbo].[MrktMediaMonitor] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query20 = "DELETE [".$dbDatabase."].[dbo].[MrktMediaPost] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query21 = "DELETE [".$dbDatabase."].[dbo].[MrktWeb] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query22 = "DELETE [".$dbDatabase."].[dbo].[MrktVideo] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query23 = "DELETE [".$dbDatabase."].[dbo].[MrktVideoFilming] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query24 = "DELETE [".$dbDatabase."].[dbo].[MrktVideoOther] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query25 = "DELETE [".$dbDatabase."].[dbo].[MrktEditorial] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query26 = "DELETE [".$dbDatabase."].[dbo].[MrktProcessLog] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query27 = "DELETE [".$dbDatabase."].[dbo].[Transaction] WHERE MrktRequestID = '".$MrktRequestID."'";
    $query28 = "DELETE [".$dbDatabase."].[dbo].[MrktMediaEntrance] WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query1);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query2);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query3);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query4);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query5);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query6);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query7);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query8);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query9);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query10);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query11);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query12);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query13);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query14);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query15);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query16);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query17);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query18);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query19);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query20);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query21);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query22);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query23);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query24);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query25);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query26);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query27);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query28);
    $result = $cmd->execute();

    echo json_encode($result);