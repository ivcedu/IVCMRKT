<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/IVCMRKT/attach_files/";

    if(isset($_FILES["files"])) {
        $file_name = $_FILES["files"]["name"][0];        
        
        $file_name = str_replace("'", "", $file_name);
        $file_name = preg_replace("/[^a-zA-Z0-9 ._]/", "", $file_name);

        $result = move_uploaded_file($_FILES["files"]["tmp_name"][0], $output_dir.$file_name);
        echo json_encode($result); 
    }