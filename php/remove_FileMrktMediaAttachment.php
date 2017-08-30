<?php
    $output_dir = "C:/xampp/htdocs/IVCMRKT/media_files/";
    
    $FileLinkName = filter_input(INPUT_POST, 'FileLinkName');
    
    $result = unlink($output_dir.$FileLinkName);
    
    echo json_encode($result);