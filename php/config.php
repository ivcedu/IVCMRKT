<?php
    $dbHost = "ivcintdb1";
    $dbDatabase = "IVCMRKT";
    $dbUser = "ivcmrkt";
    $dbPass = "~7QM#pd?X*";

    // MSSQL database connection
    try {
        $dbConn = new PDO("sqlsrv:server=$dbHost;Database=$dbDatabase", $dbUser, $dbPass);
    } 
    catch (PDOException $e) {
        die ($e->getMessage());
    }
