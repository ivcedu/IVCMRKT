<?php
    require("config.php");
    
    $MrktRequestID = filter_input(INPUT_POST, 'MrktRequestID');
    $ckb_prt_pst_11_17 = filter_input(INPUT_POST, 'ckb_prt_pst_11_17');
    $Qty_11_X_17 = filter_input(INPUT_POST, 'Qty_11_X_17');
    $ckb_prt_pst_22_28 = filter_input(INPUT_POST, 'ckb_prt_pst_22_28');
    $Qty_22_X_28 = filter_input(INPUT_POST, 'Qty_22_X_28');
    $ckb_prt_pst_other = filter_input(INPUT_POST, 'ckb_prt_pst_other');
    $QtyOther = filter_input(INPUT_POST, 'QtyOther');
    $SizeOther = filter_input(INPUT_POST, 'SizeOther');
    
    $SizeOther = str_replace("'", "", $SizeOther);

    $query = "UPDATE [".$dbDatabase."].[dbo].[MrktPrintPoster] "
                . "SET ckb_prt_pst_11_17 = '".$ckb_prt_pst_11_17."', Qty_11_X_17 = '".$Qty_11_X_17."', ckb_prt_pst_22_28 = '".$ckb_prt_pst_22_28."', Qty_22_X_28 = '".$Qty_22_X_28."', "
                . "ckb_prt_pst_other = '".$ckb_prt_pst_other."', QtyOther = '".$QtyOther."', SizeOther = '".$SizeOther."', Modified = getdate() "
                . "WHERE MrktRequestID = '".$MrktRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);