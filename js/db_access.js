// get AD login info ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

// get DB //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

function db_getAdminByID(AdminID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminByID.php",
        data:{AdminID:AdminID},
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

function db_getAdminListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminPrivilegeByID(AdminPrivilegeID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminPrivilegeByID.php",
        data:{AdminPrivilegeID:AdminPrivilegeID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminPrivilegeByAccessLevel(AccessLevel) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatusByAccessLevel.php",
        data:{AccessLevel:AccessLevel},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminPrivilegeList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminPrivilegeList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminPrivilegeListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminPrivilegeListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminPrivilegeListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminPrivilegeListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStatusByID(StatusID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatusByID.php",
        data:{StatusID:StatusID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStatusByName(Status) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatusByName.php",
        data:{Status:Status},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStatusList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatusList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStatusListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatusListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStatusListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatusListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskByID(TaskID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskByID.php",
        data:{TaskID:TaskID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskByName(TaskName) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskByName.php",
        data:{TaskName:TaskName},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskStaffByID(TaskStaffID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskStaffByID.php",
        data:{TaskStaffID:TaskStaffID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskStaffByTaskAdmin(TaskID, AdminID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskStaffByTaskAdmin.php",
        data:{TaskID:TaskID, AdminID:AdminID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskStaffList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskStaffList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskStaffListByTaskActive(TaskID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskStaffListByTaskActive.php",
        data:{TaskID:TaskID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTaskStaffListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTaskStaffListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktProcessLogByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktProcessLogByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktProcessLogDataTable(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktProcessLogDataTable.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTransaction(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTransaction.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailParamByID(EmailParamID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailParamByID.php",
        data:{EmailParamID:EmailParamID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailParamByNameTag(ParamName, ParamTag) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailParamByNameTag.php",
        data:{ParamName:ParamName, ParamTag:ParamTag},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailParamList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailParamList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailParamListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailParamListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailParamListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailParamListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailProcByID(EmailProcID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailProcByID.php",
        data:{EmailProcID:EmailProcID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailProcByName(ProcName) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailProcByName.php",
        data:{ProcName:ProcName},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailProcList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailProcList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailProcListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailProcListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailProcListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailProcListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailMsgByID(EmailMsgID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailMsgByID.php",
        data:{EmailMsgID:EmailMsgID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailMsgByProcIDName(EmailProcID, EmailMsgName) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailMsgByProcIDName.php",
        data:{EmailProcID:EmailProcID, EmailMsgName:EmailMsgName},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailMsgListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailMsgListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailToListByEmailMsgID(EmailMsgID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailToListByEmailMsgID.php",
        data:{EmailMsgID:EmailMsgID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailCCListByEmailMsgID(EmailMsgID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailCCListByEmailMsgID.php",
        data:{EmailMsgID:EmailMsgID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMyRequestListDataTable(ReqEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMyRequestListDataTable.php",
        data:{ReqEmail:ReqEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMyHistoryListDataTable(ReqEmail, StartDate, EndDate) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMyHistoryListDataTable.php",
        data:{ReqEmail:ReqEmail, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminNewListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminNewListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminRequestListDataTable(Administrator, AdminID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminRequestListDataTable.php",
        data:{Administrator:Administrator, AdminID:AdminID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminCompleteListDataTable(StartDate, EndDate) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminCompleteListDataTable.php",
        data:{StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktRequestByID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktRequestByID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktAttachmentByID(MrktAttachmentID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktAttachmentByID.php",
        data:{MrktAttachmentID:MrktAttachmentID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktAttachmentByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktAttachmentByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktTaskByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktTaskByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintFileByPrintID(MrktPrintID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintFileByPrintID.php",
        data:{MrktPrintID:MrktPrintID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintAdByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintAdByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintBrochureByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintBrochureByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintBannerByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintBannerByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintFlyerByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintFlyerByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintCertByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintCertByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintPostCardByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintPostCardByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintPosterByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintPosterByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintProgramByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintProgramByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintOtherByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintOtherByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPrintWGraphicByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPrintWGraphicByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPhotoByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPhotoByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktPhotoFileByPhotoID(MrktPhotoID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktPhotoFileByPhotoID.php",
        data:{MrktPhotoID:MrktPhotoID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktMediaByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktMediaByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktMediaFileByMediaID(MrktMediaID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktMediaFileByMediaID.php",
        data:{MrktMediaID:MrktMediaID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktMediaCollegeByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktMediaCollegeByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktMediaSherpaByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktMediaSherpaByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktMediaMonitorByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktMediaMonitorByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktMediaPostByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktMediaPostByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktWebByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktWebByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktWebFileByWebID(MrktWebID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktWebFileByWebID.php",
        data:{MrktWebID:MrktWebID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktVideoByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktVideoByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktVideoFileByVideoID(MrktVideoID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktVideoFileByVideoID.php",
        data:{MrktVideoID:MrktVideoID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktVideoFilmingByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktVideoFilmingByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktVideoOtherByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktVideoOtherByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktEditorialByReqID(MrktRequestID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktEditorialByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getMrktEditorialFileByEditorialID(MrktEditorialID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getMrktEditorialFileByEditorialID.php",
        data:{MrktEditorialID:MrktEditorialID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getEmailNotificationByStatusID(StatusID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getEmailNotificationByStatusID.php",
        data:{StatusID:StatusID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getRptAllRequestListDataTable(StatusID, StartDate, EndDate) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getRptAllRequestListDataTable.php",
        data:{StatusID:StatusID, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// insert DB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_insertAdmin(Active, AdminName, AdminEmail, AdminPrivilegeID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAdmin.php",
        data:{Active:Active, AdminName:AdminName, AdminEmail:AdminEmail, AdminPrivilegeID:AdminPrivilegeID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAdminPrivilege(Active, AccessLevel) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAdminPrivilege.php",
        data:{Active:Active, AccessLevel:AccessLevel},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStatus(Active, Status) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStatus.php",
        data:{Active:Active, Status:Status},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertTask(Active, TaskName, html_id, Note) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertTask.php",
        data:{Active:Active, TaskName:TaskName, html_id:html_id, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertTaskStaff(Active, TaskID, AdminID, Note) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertTaskStaff.php",
        data:{Active:Active, TaskID:TaskID, AdminID:AdminID, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertSystemLog(LoginName, Note) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSystemLog.php",
        data:{LoginName:LoginName, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktProcessLog(MrktRequestID, LoginName, TaskID, StatusID, Note, PreviousLogID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktProcessLog.php",
        data:{MrktRequestID:MrktRequestID, LoginName:LoginName, TaskID:TaskID, StatusID:StatusID, Note:Note, PreviousLogID:PreviousLogID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertTransaction(MrktRequestID, LoginName, Note) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertTransaction.php",
        data:{MrktRequestID:MrktRequestID, LoginName:LoginName, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertEmailParam(Active, ParamName, ParamTag) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertEmailParam.php",
        data:{Active:Active, ParamName:ParamName, ParamTag:ParamTag},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertEmailProc(Active, StatusID, ProcName) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertEmailProc.php",
        data:{Active:Active, StatusID:StatusID, ProcName:ProcName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertEmailMsg(Active, EmailProcID, EmailMsgName, EmailMsgSubject, EmailMsgContent) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertEmailMsg.php",
        data:{Active:Active, EmailProcID:EmailProcID, EmailMsgName:EmailMsgName, EmailMsgSubject:EmailMsgSubject, EmailMsgContent:EmailMsgContent},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertEmailTo(EmailMsgID, ToEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertEmailTo.php",
        data:{EmailMsgID:EmailMsgID, ToEmail:ToEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertEmailCC(EmailMsgID, CCEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertEmailCC.php",
        data:{EmailMsgID:EmailMsgID, CCEmail:CCEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktRequest(StatusID, Requestor, ReqEmail, ReqPhone, ReqDepart, ReqDate, ReqTitle, Description) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktRequest.php",
        data:{StatusID:StatusID, Requestor:Requestor, ReqEmail:ReqEmail, ReqPhone:ReqPhone, ReqDepart:ReqDepart, ReqDate:ReqDate, ReqTitle:ReqTitle, Description:Description},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktTask(MrktRequestID, ckbMrktPrint, ckbMrktPhoto, ckbMrktMedia, ckbMrktWeb, ckbMrktVideo, ckbMrktEditorial) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktTask.php",
        data:{MrktRequestID:MrktRequestID, ckbMrktPrint:ckbMrktPrint, ckbMrktPhoto:ckbMrktPhoto, ckbMrktMedia:ckbMrktMedia, ckbMrktWeb:ckbMrktWeb, ckbMrktVideo:ckbMrktVideo, ckbMrktEditorial:ckbMrktEditorial},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrint(MrktRequestID, AdminID, StatusID, DateNeeded,
                            ckb_prt_ad, ckb_prt_brochure, ckb_prt_banner, ckb_prt_flyer, ckb_prt_certificate, ckb_prt_postcard, ckb_prt_poster, ckb_prt_program, ckb_prt_other, ckb_prt_web_graphic) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrint.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, DateNeeded:DateNeeded, 
                ckb_prt_ad:ckb_prt_ad, ckb_prt_brochure:ckb_prt_brochure, ckb_prt_banner:ckb_prt_banner, ckb_prt_flyer:ckb_prt_flyer, ckb_prt_certificate:ckb_prt_certificate,
                ckb_prt_postcard:ckb_prt_postcard, ckb_prt_program:ckb_prt_program, ckb_prt_poster:ckb_prt_poster, ckb_prt_other:ckb_prt_other, ckb_prt_web_graphic:ckb_prt_web_graphic},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintAd(MrktPrintID, MrktRequestID, AdSize) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintAd.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, AdSize:AdSize},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintBrochure(MrktPrintID, MrktRequestID, Qty) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintBrochure.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintBanner(MrktPrintID, MrktRequestID, Qty) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintBanner.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintFlyer(MrktPrintID, MrktRequestID, Qty) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintFlyer.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintCert(MrktPrintID, MrktRequestID, Qty) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintCert.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintPostCard(MrktPrintID, MrktRequestID, Size, Qty) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintPostCard.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, Size:Size, Qty:Qty},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintPoster(MrktPrintID, MrktRequestID, ckb_prt_pst_11_17, Qty_11_X_17, ckb_prt_pst_22_28, Qty_22_X_28, ckb_prt_pst_other, QtyOther, SizeOther) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintPoster.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, ckb_prt_pst_11_17:ckb_prt_pst_11_17, Qty_11_X_17:Qty_11_X_17,
                ckb_prt_pst_22_28:ckb_prt_pst_22_28, Qty_22_X_28:Qty_22_X_28, ckb_prt_pst_other:ckb_prt_pst_other, QtyOther:QtyOther, SizeOther:SizeOther},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintProgram(MrktPrintID, MrktRequestID, Qty) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintProgram.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintOther(MrktPrintID, MrktRequestID, OtherDescrip) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintOther.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, OtherDescrip:OtherDescrip},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPrintWGraphic(MrktPrintID, MrktRequestID, WebGraphic, Dimension) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPrintWGraphic.php",
        data:{MrktPrintID:MrktPrintID, MrktRequestID:MrktRequestID, WebGraphic:WebGraphic, Dimension:Dimension},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktPhoto(MrktRequestID, AdminID, StatusID, EventDate, EventTime, Location, EstimatedTime) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktPhoto.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, EventDate:EventDate, EventTime:EventTime, Location:Location, EstimatedTime:EstimatedTime},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktMedia(MrktRequestID, AdminID, StatusID, ckb_mda_collegewide_email, ckb_mda_sherpa_email, ckb_mda_monitor, ckb_mda_social_media) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktMedia.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, ckb_mda_collegewide_email:ckb_mda_collegewide_email, 
                ckb_mda_sherpa_email:ckb_mda_sherpa_email, ckb_mda_monitor:ckb_mda_monitor, ckb_mda_social_media:ckb_mda_social_media},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktMediaCollege(MrktMediaID, MrktRequestID, CollegeEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktMediaCollege.php",
        data:{MrktMediaID:MrktMediaID, MrktRequestID:MrktRequestID, CollegeEmail:CollegeEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktMediaSherpa(MrktMediaID, MrktRequestID, SherpaEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktMediaSherpa.php",
        data:{MrktMediaID:MrktMediaID, MrktRequestID:MrktRequestID, SherpaEmail:SherpaEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktMediaMonitor(MrktMediaID, MrktRequestID, StartDate, EndDate) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktMediaMonitor.php",
        data:{MrktMediaID:MrktMediaID, MrktRequestID:MrktRequestID, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktMediaPost(MrktMediaID, MrktRequestID, PostDate) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktMediaPost.php",
        data:{MrktMediaID:MrktMediaID, MrktRequestID:MrktRequestID, PostDate:PostDate},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktWeb(MrktRequestID, AdminID, StatusID, DateNeeded, ckb_web_create_new, ckb_web_update_existing, ckb_web_add_page, ckb_web_request_access, ckb_web_request_website, ckb_web_report_problem) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktWeb.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, DateNeeded:DateNeeded, ckb_web_create_new:ckb_web_create_new, ckb_web_update_existing:ckb_web_update_existing,
                ckb_web_add_page:ckb_web_add_page, ckb_web_request_access:ckb_web_request_access, ckb_web_request_website:ckb_web_request_website, ckb_web_report_problem:ckb_web_report_problem},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktVideo(MrktRequestID, AdminID, StatusID, ckb_vdo_filming_request, ckb_vdo_other) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktVideo.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, ckb_vdo_filming_request:ckb_vdo_filming_request, ckb_vdo_other:ckb_vdo_other},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktVideoFilming(MrktVideoID, MrktRequestID, EventDate, EventTime, Location, Purpose, EstimatedTime) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktVideoFilming.php",
        data:{MrktVideoID:MrktVideoID, MrktRequestID:MrktRequestID, EventDate:EventDate, EventTime:EventTime, Location:Location, Purpose:Purpose, EstimatedTime:EstimatedTime},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktVideoOther(MrktVideoID, MrktRequestID, Other) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktVideoOther.php",
        data:{MrktVideoID:MrktVideoID, MrktRequestID:MrktRequestID, Other:Other},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktEditorial(MrktRequestID, AdminID, StatusID, ckb_edt_copywriting, CWDateNeeded, ckb_edt_proofreading, PRDateNeeded) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktEditorial.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, ckb_edt_copywriting:ckb_edt_copywriting, CWDateNeeded:CWDateNeeded, ckb_edt_proofreading:ckb_edt_proofreading, PRDateNeeded:PRDateNeeded},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertMrktAttachment(FileName, FileType) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertMrktAttachment.php",
        data:{FileName:FileName, FileType:FileType},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// update DB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_updateAdminByID(AdminID, Active, AdminName, AdminEmail, AdminPrivilegeID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAdminByID.php",
        data:{AdminID:AdminID, Active:Active, AdminName:AdminName, AdminEmail:AdminEmail, AdminPrivilegeID:AdminPrivilegeID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateAdminPrivilegeByID(AdminPrivilegeID, Active, AccessLevel) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAdminPrivilegeByID.php",
        data:{AdminPrivilegeID:AdminPrivilegeID, Active:Active, AccessLevel:AccessLevel},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateStatusByID(StatusID, Active, Status) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateStatusByID.php",
        data:{StatusID:StatusID, Active:Active, Status:Status},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateTaskByID(TaskID, Active, TaskName, html_id, Note) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateTaskByID.php",
        data:{TaskID:TaskID, Active:Active, TaskName:TaskName, html_id:html_id, Note:Note},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateTaskStaffByID(TaskStaffID, Active, TaskID, AdminID, Note) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateTaskStaffByID.php",
        data:{TaskStaffID:TaskStaffID, Active:Active, TaskID:TaskID, AdminID:AdminID, Note:Note},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateEmailParamByID(EmailParamID, Active, ParamName, ParamTag) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateEmailParamByID.php",
        data:{EmailParamID:EmailParamID, Active:Active, ParamName:ParamName, ParamTag:ParamTag},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateEmailProcByID(EmailProcID, Active, StatusID, ProcName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateEmailProcByID.php",
        data:{EmailProcID:EmailProcID, Active:Active, StatusID:StatusID, ProcName:ProcName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateEmailMsgByID(EmailMsgID, Active, EmailProcID, EmailMsgName, EmailMsgSubject, EmailMsgContent) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateEmailMsgByID.php",
        data:{EmailMsgID:EmailMsgID, Active:Active, EmailProcID:EmailProcID, EmailMsgName:EmailMsgName, EmailMsgSubject:EmailMsgSubject, EmailMsgContent:EmailMsgContent},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktRequestByID(MrktRequestID, StatusID, Requestor, ReqEmail, ReqPhone, ReqDepart, ReqDate, ReqTitle, Description) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktRequestByID.php",
        data:{MrktRequestID:MrktRequestID, StatusID:StatusID, Requestor:Requestor, ReqEmail:ReqEmail, ReqPhone:ReqPhone, ReqDepart:ReqDepart, ReqDate:ReqDate, ReqTitle:ReqTitle, Description:Description},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktRequestStatusByID(MrktRequestID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktRequestStatusByReqID.php",
        data:{MrktRequestID:MrktRequestID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktTaskByReqID(MrktRequestID, ckbMrktPrint, ckbMrktPhoto, ckbMrktMedia, ckbMrktWeb, ckbMrktVideo, ckbMrktEditorial) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktTaskByReqID.php",
        data:{MrktRequestID:MrktRequestID, ckbMrktPrint:ckbMrktPrint, ckbMrktPhoto:ckbMrktPhoto, ckbMrktMedia:ckbMrktMedia, ckbMrktWeb:ckbMrktWeb, ckbMrktVideo:ckbMrktVideo, ckbMrktEditorial:ckbMrktEditorial},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintByReqID(MrktRequestID, AdminID, StatusID, DateNeeded,
                                    ckb_prt_ad, ckb_prt_brochure, ckb_prt_banner, ckb_prt_flyer, ckb_prt_certificate, ckb_prt_postcard, ckb_prt_poster, ckb_prt_program, ckb_prt_other, ckb_prt_web_graphic) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, DateNeeded:DateNeeded, 
                ckb_prt_ad:ckb_prt_ad, ckb_prt_brochure:ckb_prt_brochure, ckb_prt_banner:ckb_prt_banner, ckb_prt_flyer:ckb_prt_flyer, ckb_prt_certificate:ckb_prt_certificate,
                ckb_prt_postcard:ckb_prt_postcard, ckb_prt_poster:ckb_prt_poster, ckb_prt_program:ckb_prt_program, ckb_prt_other:ckb_prt_other, ckb_prt_web_graphic:ckb_prt_web_graphic},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintAdminByReqID(MrktRequestID, AdminID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintAdminByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintStatusByReqID(MrktRequestID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintStatusByReqID.php",
        data:{MrktRequestID:MrktRequestID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintAdByReqID(MrktRequestID, AdSize) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintAdByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdSize:AdSize},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintBrochureByReqID(MrktRequestID, Qty) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintBrochureByReqID.php",
        data:{MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintBannerByReqID(MrktRequestID, Qty) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintBannerByReqID.php",
        data:{MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintFlyerByReqID(MrktRequestID, Qty) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintFlyerByReqID.php",
        data:{MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintCertByReqID(MrktRequestID, Qty) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintCertByReqID.php",
        data:{MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintPostCardByReqID(MrktRequestID, Size, Qty) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintPostCardByReqID.php",
        data:{MrktRequestID:MrktRequestID, Size:Size, Qty:Qty},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintPosterByReqID(MrktRequestID, ckb_prt_pst_11_17, Qty_11_X_17, ckb_prt_pst_22_28, Qty_22_X_28, ckb_prt_pst_other, QtyOther, SizeOther) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintPosterByReqID.php",
        data:{MrktRequestID:MrktRequestID, ckb_prt_pst_11_17:ckb_prt_pst_11_17, Qty_11_X_17:Qty_11_X_17, ckb_prt_pst_22_28:ckb_prt_pst_22_28, 
                Qty_22_X_28:Qty_22_X_28, ckb_prt_pst_other:ckb_prt_pst_other, QtyOther:QtyOther, SizeOther:SizeOther},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintProgramByReqID(MrktRequestID, Qty) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintProgramByReqID.php",
        data:{MrktRequestID:MrktRequestID, Qty:Qty},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintOtherByReqID(MrktRequestID, OtherDescrip) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintOtherByReqID.php",
        data:{MrktRequestID:MrktRequestID, OtherDescrip:OtherDescrip},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPrintWGraphicByReqID(MrktRequestID, WebGraphic, Dimension) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPrintWGraphicByReqID.php",
        data:{MrktRequestID:MrktRequestID, WebGraphic:WebGraphic, Dimension:Dimension},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPhotoByReqID(MrktRequestID, AdminID, StatusID, EventDate, EventTime, Location, EstimatedTime) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPhotoByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, EventDate:EventDate, EventTime:EventTime, Location:Location, EstimatedTime:EstimatedTime},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPhotoAdminByReqID(MrktRequestID, AdminID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPhotoAdminByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktPhotoStatusByReqID(MrktRequestID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktPhotoStatusByReqID.php",
        data:{MrktRequestID:MrktRequestID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktMediaByReqID(MrktRequestID, AdminID, StatusID, ckb_mda_collegewide_email, ckb_mda_sherpa_email, ckb_mda_monitor, ckb_mda_social_media) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktMediaByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, ckb_mda_collegewide_email:ckb_mda_collegewide_email, 
                ckb_mda_sherpa_email:ckb_mda_sherpa_email, ckb_mda_monitor:ckb_mda_monitor, ckb_mda_social_media:ckb_mda_social_media},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktMediaAdminByReqID(MrktRequestID, AdminID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktMediaAdminByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktMediaStatusByReqID(MrktRequestID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktMediaStatusByReqID.php",
        data:{MrktRequestID:MrktRequestID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktMediaCollegeByReqID(MrktRequestID, CollegeEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktMediaCollegeByReqID.php",
        data:{MrktRequestID:MrktRequestID, CollegeEmail:CollegeEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktMediaSherpaByReqID(MrktRequestID, SherpaEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktMediaSherpaByReqID.php",
        data:{MrktRequestID:MrktRequestID, SherpaEmail:SherpaEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktMediaMonitorByReqID(MrktRequestID, StartDate, EndDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktMediaMonitorByReqID.php",
        data:{MrktRequestID:MrktRequestID, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktMediaPostByReqID(MrktRequestID, PostDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktMediaPostByReqID.php",
        data:{MrktRequestID:MrktRequestID, PostDate:PostDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktWebByReqID(MrktRequestID, AdminID, StatusID, DateNeeded, ckb_web_create_new, ckb_web_update_existing, ckb_web_add_page, ckb_web_request_access, ckb_web_request_website, ckb_web_report_problem) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktWebByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, DateNeeded:DateNeeded, ckb_web_create_new:ckb_web_create_new, ckb_web_update_existing:ckb_web_update_existing,
                ckb_web_add_page:ckb_web_add_page, ckb_web_request_access:ckb_web_request_access, ckb_web_request_website:ckb_web_request_website, ckb_web_report_problem:ckb_web_report_problem},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktWebAdminByReqID(MrktRequestID, AdminID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktWebAdminByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktWebStatusByReqID(MrktRequestID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktWebStatusByReqID.php",
        data:{MrktRequestID:MrktRequestID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktVideoByReqID(MrktRequestID, AdminID, StatusID, ckb_vdo_filming_request, ckb_vdo_other) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktVideoByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, ckb_vdo_filming_request:ckb_vdo_filming_request, ckb_vdo_other:ckb_vdo_other},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktVideoAdminByReqID(MrktRequestID, AdminID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktVideoAdminByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktVideoStatusByReqID(MrktRequestID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktVideoStatusByReqID.php",
        data:{MrktRequestID:MrktRequestID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktVideoFilmingByReqID(MrktRequestID, EventDate, EventTime, Location, Purpose, EstimatedTime) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktVideoFilmingByReqID.php",
        data:{MrktRequestID:MrktRequestID, EventDate:EventDate, EventTime:EventTime, Location:Location, Purpose:Purpose, EstimatedTime:EstimatedTime},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktVideoOtherByReqID(MrktRequestID, Other) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktVideoOtherByReqID.php",
        data:{MrktRequestID:MrktRequestID, Other:Other},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktEditorialByReqID(MrktRequestID, AdminID, StatusID, ckb_edt_copywriting, CWDateNeeded, ckb_edt_proofreading, PRDateNeeded) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktEditorialByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID, StatusID:StatusID, ckb_edt_copywriting:ckb_edt_copywriting, CWDateNeeded:CWDateNeeded, ckb_edt_proofreading:ckb_edt_proofreading, PRDateNeeded:PRDateNeeded},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktEditorialAdminByReqID(MrktRequestID, AdminID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktEditorialAdminByReqID.php",
        data:{MrktRequestID:MrktRequestID, AdminID:AdminID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktEditorialStatusByReqID(MrktRequestID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktEditorialStatusByReqID.php",
        data:{MrktRequestID:MrktRequestID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktAttachmentFileLinkNameByID(MrktAttachmentID, FileLinkName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktAttachmentFileLinkNameByID.php",
        data:{MrktAttachmentID:MrktAttachmentID, FileLinkName:FileLinkName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateMrktAttachmentRequestIDByID(MrktAttachmentID, MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateMrktAttachmentRequestIDByID.php",
        data:{MrktAttachmentID:MrktAttachmentID, MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// delete DB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_deleteAdminByID(AdminID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteAdminByID.php",
        data:{AdminID:AdminID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteEmailToByEmailMsgID(EmailMsgID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteEmailToByEmailMsgID.php",
        data:{EmailMsgID:EmailMsgID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteEmailCCByEmailMsgID(EmailMsgID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteEmailCCByEmailMsgID.php",
        data:{EmailMsgID:EmailMsgID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktRequestByID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktRequestByID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktRequestAllByID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktRequestAllByID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktAttachmentByID(MrktAttachmentID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktAttachmentByID.php",
        data:{MrktAttachmentID:MrktAttachmentID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktAttachmentByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktAttachmentByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktTaskByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktTaskByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintFileByPrintID(MrktPrintID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintFileByPrintID.php",
        data:{MrktPrintID:MrktPrintID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintAdByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintAdByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintBrochureByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintBrochureByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintBannerByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintBannerByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintFlyerByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintFlyerByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintCertByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintCertByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintPostCardByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintPostCardByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintPosterByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintPosterByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintProgramByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintProgramByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintOtherByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintOtherByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPrintWGraphicByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPrintWGraphicByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPhotoByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPhotoByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktPhotoFileByPhotoID(MrktPhotoID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktPhotoFileByPhotoID.php",
        data:{MrktPhotoID:MrktPhotoID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktMediaByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktMediaByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktMediaFileByMediaID(MrktMediaID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktMediaFileByMediaID.php",
        data:{MrktMediaID:MrktMediaID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktMediaCollegeByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktMediaCollegeByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktMediaSherpaByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktMediaSherpaByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktMediaMonitorByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktMediaMonitorByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktMediaPostByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktMediaPostByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktWebByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktWebByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktWebFileByWebID(MrktWebID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktWebFileByWebID.php",
        data:{MrktWebID:MrktWebID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktVideoByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktVideoByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktVideoFileByVideoID(MrktVideoID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktVideoFileByVideoID.php",
        data:{MrktVideoID:MrktVideoID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktVideoFilmingByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktVideoFilmingByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktVideoOtherByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktVideoOtherByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktEditorialByReqID(MrktRequestID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktEditorialByReqID.php",
        data:{MrktRequestID:MrktRequestID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteMrktEditorialFileByEditorialID(MrktEditorialID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteMrktEditorialFileByEditorialID.php",
        data:{MrktEditorialID:MrktEditorialID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ireportDBgetUserAccess(Username) {   
    var Result = "";
    $.ajax({
        type:"POST",
        url:"php/ireport_db_getUserAccess.php",
        data:{Username:Username},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function uploadFileMrktAttachment(file_data) {
    var Result = "";
    $.ajax({  
        type: "POST",
        url: "php/upload_FileMrktAttachment.php",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function uploadFileMrktPrintAttachment(file_data) {
    var Result = "";
    $.ajax({  
        type: "POST",
        url: "php/upload_FileMrktPrintAttachment.php",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function uploadFileMrktPhotoAttachment(file_data) {
    var Result = "";
    $.ajax({  
        type: "POST",
        url: "php/upload_FileMrktPhotoAttachment.php",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function uploadFileMrktMediaAttachment(file_data) {
    var Result = "";
    $.ajax({  
        type: "POST",
        url: "php/upload_FileMrktMediaAttachment.php",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function uploadFileMrktWebAttachment(file_data) {
    var Result = "";
    $.ajax({  
        type: "POST",
        url: "php/upload_FileMrktWebAttachment.php",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function uploadFileMrktVideoAttachment(file_data) {
    var Result = "";
    $.ajax({  
        type: "POST",
        url: "php/upload_FileMrktVideoAttachment.php",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function uploadFileMrktEditorialAttachment(file_data) {
    var Result = "";
    $.ajax({  
        type: "POST",
        url: "php/upload_FileMrktEditorialAttachment.php",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeFileMrktAttachment(FileLinkName) {
    var Result = false;
    $.ajax({ 
        type: "POST",
        url: "php/remove_FileMrktAttachment.php",
        data:{FileLinkName:FileLinkName}, 
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function removeFileMrktPrintAttachment(FileLinkName) {
    var Result = false;
    $.ajax({ 
        type: "POST",
        url: "php/remove_FileMrktPrintAttachment.php",
        data:{FileLinkName:FileLinkName}, 
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function removeFileMrktPhotoAttachment(FileLinkName) {
    var Result = false;
    $.ajax({ 
        type: "POST",
        url: "php/remove_FileMrktPhotoAttachment.php",
        data:{FileLinkName:FileLinkName}, 
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function removeFileMrktMediaAttachment(FileLinkName) {
    var Result = false;
    $.ajax({ 
        type: "POST",
        url: "php/remove_FileMrktMediaAttachment.php",
        data:{FileLinkName:FileLinkName}, 
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function removeFileMrktWebAttachment(FileLinkName) {
    var Result = false;
    $.ajax({ 
        type: "POST",
        url: "php/remove_FileMrktWebAttachment.php",
        data:{FileLinkName:FileLinkName}, 
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function removeFileMrktVideoAttachment(FileLinkName) {
    var Result = false;
    $.ajax({ 
        type: "POST",
        url: "php/remove_FileMrktVideoAttachment.php",
        data:{FileLinkName:FileLinkName}, 
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

function removeFileMrktEditorialAttachment(FileLinkName) {
    var Result = false;
    $.ajax({ 
        type: "POST",
        url: "php/remove_FileMrktEditorialAttachment.php",
        data:{FileLinkName:FileLinkName}, 
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}