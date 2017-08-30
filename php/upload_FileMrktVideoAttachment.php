<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/IVCMRKT/video_files/";

    if(isset($_FILES["files"])) {    
        $fileString = $_FILES["files"]["name"][0];
        
        $file_ext = pathinfo($fileString, PATHINFO_EXTENSION);
        $pos_1 = strpos($fileString, "_fileIndex_");
        $str_index = substr($fileString, 0, $pos_1);
        
        $arr_tmp = explode("_", $str_index);
        $mrkt_video_id = $arr_tmp[0];
        $mrkt_request_id = $arr_tmp[1];
        
        $file_name = substr($fileString, $pos_1 + 11);
        $file_name = str_replace("'", "", $file_name);
        $file_name = preg_replace("/[^a-zA-Z0-9 ._]/", "", $file_name);
        $file_link_name = $mrkt_video_id . "_" . $mrkt_request_id . "_" . $file_name;

        $result = move_uploaded_file($_FILES["files"]["tmp_name"][0], $output_dir.$file_link_name);
        if ($result) {
            $MrktVideoFileID = insertAttachToDB($dbConn, $dbDatabase, $mrkt_video_id, $mrkt_request_id, $file_link_name, $file_name, $file_ext);
        }
        else {
            $MrktVideoFileID = "";
        }

        echo json_encode($MrktVideoFileID); 
    }
    
    function insertAttachToDB($dbConn, $dbDatabase, $mrkt_video_id, $mrkt_request_id, $FileLinkName, $FileName, $FileType) {        
        $query = "INSERT INTO [".$dbDatabase."].[dbo].[MrktVideoFile] "
                    ."(MrktVideoID, MrktRequestID, FileLinkName, FileName, FileType) "
                    ."VALUES ('$mrkt_video_id', '$mrkt_request_id', '$FileLinkName', '$FileName', '$FileType')";

        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $ResultID = $dbConn->lastInsertId();
        
        return $ResultID;
    }