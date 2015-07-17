// get AD login info ///////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// get DB //////////////////////////////////////////////////////////////////////
function db_getAdminByEmail(AdminEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminByEmail.php",
        data:{AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSelectedAdmin(AdminID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSelectedAdmin.php",
        data:{AdminID:AdminID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// insert DB ///////////////////////////////////////////////////////////////////
function db_insertAdmin(AdminName, AdminEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAdmin.php",
        data:{AdminName:AdminName, AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertEventRequest(StatusID, ReqName, ReqPhone, ReqEmail, Department, ReqDate, EventTitle, EventDate, EventTime,
                                Location, ContactName, ContactPhone, ContactEmail, AnnounceStart, AnnounceEnd, AnnounceText) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertEventRequest.php",
        data:{StatusID:StatusID, ReqName:ReqName, ReqPhone:ReqPhone, ReqEmail:ReqEmail, Department:Department, ReqDate:ReqDate, EventTitle:EventTitle, EventDate:EventDate, EventTime:EventTime,
                Location:Location, ContactName:ContactName, ContactPhone:ContactPhone, ContactEmail:ContactEmail, AnnounceStart:AnnounceStart, AnnounceEnd:AnnounceEnd, AnnounceText:AnnounceText},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAttachment(EventRequestID, FileName, PDFData) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAttachment.php",
        data:{EventRequestID:EventRequestID, FileName:FileName, PDFData:PDFData},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertSherpa(EventRequestID, Email, Newsfeed) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSherpa.php",
        data:{EventRequestID:EventRequestID, Email:Email, Newsfeed:Newsfeed},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertSocialMedia(EventRequestID, Facebook, Twitter, Instagram) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSocialMedia.php",
        data:{EventRequestID:EventRequestID, Facebook:Facebook, Twitter:Twitter, Instagram:Instagram},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertDigitalSignage(EventRequestID, BSTIC, SSC, LSB) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertDigitalSignage.php",
        data:{EventRequestID:EventRequestID, BSTIC:BSTIC, SSC:SSC, LSB:LSB},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertTransaction(EventRequestID, LoginName, Note) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertTransaction.php",
        data:{EventRequestID:EventRequestID, LoginName:LoginName, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// update DB ///////////////////////////////////////////////////////////////////
function db_updateAdmin(AdminID, AdminName, AdminEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAdmin.php",
        data:{AdminID:AdminID, AdminName:AdminName, AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

//function db_updateReader(ReaderID, Active, ReaderName, ReaderEmail) {
//    var Result = false;
//    $.ajax({
//        type:"POST",
//        url:"php/db_updateReader.php",
//        data:{ReaderID:ReaderID, Active:Active, ReaderName:ReaderName, ReaderEmail:ReaderEmail},
//        async: false,  
//        success:function(data) {
//            Result = JSON.parse(data);
//        }
//    });
//    return Result;
//}

// delete DB ///////////////////////////////////////////////////////////////////
//function db_deleteAdmin(AdminID) {
//    var Result = false;
//    $.ajax({
//        type:"POST",
//        url:"php/db_deleteAdmin.php",
//        data:{AdminID:AdminID},
//        async: false,  
//        success:function(data) {
//            Result = JSON.parse(data);
//        }
//    });
//    return Result;
//}