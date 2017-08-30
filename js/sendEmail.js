var task_print_id = "2";
var task_photo_id = "3";
var task_media_id = "4";
var task_web_id = "5";
var task_video_id = "6";
var task_editorial_id = "7";

var arr_mrkt_request = new Array();
var arr_admin = new Array();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function proc_sendEmailToTechSupport(Subject, Message, StrImages) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/sendEmailToTechSupport.php",
        data:{Subject:Subject, Message:Message, StrImages:StrImages},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function proc_sendEmail(email, cc_email, subject, message) {
//    var Result = false;
//    $.ajax({
//        type:"POST",
//        url:"php/sendEmail.php",
//        data:{Email:email, CCEmail:cc_email, Subject:subject, Message:message},
//        async: false,  
//        success:function(data) {
//            Result = JSON.parse(data);
//        }
//    });
//    return Result;

    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function appSystemTechSupport(str_message, str_problems, img_base64) {
    var subject = "From IVC Web Application: Tech Request";
    str_message += "Name: " + sessionStorage.getItem('ss_mrkt_loginName') + "<br/>";
    str_message += "Email: " + sessionStorage.getItem('ss_mrkt_loginEmail') + "<br/><br/>";
    str_message += "Describe Your Technical Support Issue:<br/>" + str_problems.replace(/\n/g, "<br/>");  
    img_base64 = img_base64.replace("data:image/png;base64,", "");
    return proc_sendEmailToTechSupport(subject, str_message, img_base64);
}

function dbSystemErrorHandling(str_msg) {
    sendEmailToDeveloper(str_msg);
    swal({  title: "System Error",
            text: str_msg + ", please contact IVC Tech Support at 949.451.5696",
            type: "error",
            confirmButtonText: "OK" },
            function() {
                sessionStorage.clear();
                window.open('login.html', '_self');
                return false;
            }
    );
}

function sendEmailToDeveloper(str_msg) {
    proc_sendEmail("ykim160@ivc.edu", "", "Marketing Request 2017: DB System Error", str_msg);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function systemEmailNotification(mrkt_request_id, status_id, task_id, admin_note) {
    getMrktDBParameters(mrkt_request_id, task_id);
    var result = new Array();
    result = db_getEmailNotificationByStatusID(status_id);
    
    for (var i = 0; i < result.length; i++) {
        var email_to = getEmailToList(result[i]['EmailMsgID']);
        email_to = parseAdminInfo(email_to);
        
        var email_cc = getEmailCCList(result[i]['EmailMsgID']);
        email_cc = parseAdminInfo(email_cc);
        
        var email_subject = result[i]['EmailMsgSubject'];
        email_subject = parseAdminInfo(email_subject);
        
        var email_content = parseEmailContent(mrkt_request_id, status_id, result[i]['EmailMsgContent'], admin_note);
        email_content = parseAdminInfo(email_content);

        if (!proc_sendEmail(email_to, email_cc, email_subject, email_content)) {
            var str_msg = "SENDING EMAIL error New/Update Marketing Request - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMrktDBParameters(mrkt_request_id, task_id) {
    arr_mrkt_request = db_getMrktRequestByID(mrkt_request_id);
    if (task_id === task_print_id) {
        arr_admin = db_getAdminByID(getMrktPrintAdminInfo(mrkt_request_id));
    }
    else if (task_id === task_photo_id) {
        arr_admin = db_getAdminByID(getMrktPhotoAdminInfo(mrkt_request_id));
    }
    else if (task_id === task_media_id) {
        arr_admin = db_getAdminByID(getMrktMediaAdminInfo(mrkt_request_id));
    }
    else if (task_id === task_web_id) {
        arr_admin = db_getAdminByID(getMrktWebAdminInfo(mrkt_request_id));
    }
    else if (task_id === task_video_id) {
        arr_admin = db_getAdminByID(getMrktVideoAdminInfo(mrkt_request_id));
    }
    else if (task_id === task_editorial_id) {
        arr_admin = db_getAdminByID(getMrktEditorialAdminInfo(mrkt_request_id));
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getEmailToList(email_msg_id) {
    var str_to_list = "";
    var result = new Array();
    result = db_getEmailToListByEmailMsgID(email_msg_id);
    
    for (var i = 0; i < result.length; i++) {
        str_to_list += result[i]['ToEmail'] + ";";
    }
    
    if (str_to_list.indexOf("<[Requestor Email]>") !== -1 && arr_mrkt_request.length === 1) {
        str_to_list = str_to_list.replace("<[Requestor Email]>", arr_mrkt_request[0]['ReqEmail']);
    }
    
    return str_to_list;
}

function getEmailCCList(email_msg_id) {
    var str_cc_list = "";
    var result = new Array();
    result = db_getEmailCCListByEmailMsgID(email_msg_id);
    
    for (var i = 0; i < result.length; i++) {
        str_cc_list += result[i]['CCEmail'] + ";";
    }
    
    if (str_cc_list.indexOf("<[Requestor Email]>") !== -1 && arr_mrkt_request.length === 1) {
        str_cc_list = str_cc_list.replace("<[Requestor Email]>", arr_mrkt_request[0]['ReqEmail']);
    }
    
    return str_cc_list;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMrktPrintAdminInfo(mrkt_request_id) {
    var result = new Array();
    result = db_getMrktPrintByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        return result[0]['AdminID'];
    }
    else {
        return "0";
    }
}

function getMrktPhotoAdminInfo(mrkt_request_id) {
    var result = new Array();
    result = db_getMrktPhotoByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        return result[0]['AdminID'];
    }
    else {
        return "0";
    }
}

function getMrktMediaAdminInfo(mrkt_request_id) {
    var result = new Array();
    result = db_getMrktMediaByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        return result[0]['AdminID'];
    }
    else {
        return "0";
    }
}

function getMrktWebAdminInfo(mrkt_request_id) {
    var result = new Array();
    result = db_getMrktWebByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        return result[0]['AdminID'];
    }
    else {
        return "0";
    }
}

function getMrktVideoAdminInfo(mrkt_request_id) {
    var result = new Array();
    result = db_getMrktVideoByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        return result[0]['AdminID'];
    }
    else {
        return "0";
    }
}

function getMrktEditorialAdminInfo(mrkt_request_id) {
    var result = new Array();
    result = db_getMrktEditorialByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        return result[0]['AdminID'];
    }
    else {
        return "0";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function parseEmailContent(mrkt_request_id, status_id, str_input, admin_note) {
    if (arr_mrkt_request.length === 1) {
        if (str_input.indexOf("<[Requestor]>") !== -1) {
            str_input = str_input.replace("<[Requestor]>", arr_mrkt_request[0]['Requestor']);
        }
        if (str_input.indexOf("&lt;[Requestor]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Requestor]&gt;", arr_mrkt_request[0]['Requestor']);
        }
        if (str_input.indexOf("<[Requestor Email]>") !== -1) {
            str_input = str_input.replace("<[Requestor Email]>", arr_mrkt_request[0]['ReqEmail']);
        }
        if (str_input.indexOf("&lt;[Requestor Email]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Requestor Email]&gt;", arr_mrkt_request[0]['ReqEmail']);
        }
        if (str_input.indexOf("<[Department]>") !== -1) {
            str_input = str_input.replace("<[Department]>", arr_mrkt_request[0]['ReqDepart']);
        }
        if (str_input.indexOf("&lt;[Department]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Department]&gt;", arr_mrkt_request[0]['ReqDepart']);
        }
        if (str_input.indexOf("<[Request Title]>") !== -1) {
            str_input = str_input.replace("<[Request Title]>", arr_mrkt_request[0]['ReqTitle']);
        }
        if (str_input.indexOf("&lt;[Request Title]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Request Title]&gt;", arr_mrkt_request[0]['ReqTitle']);
        }
        if (str_input.indexOf("<[Task]>") !== -1) {
            str_input = str_input.replace("<[Task]>", parseMrktTaksList(mrkt_request_id));
        }
        if (str_input.indexOf("&lt;[Task]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Task]&gt;", parseMrktTaksList(mrkt_request_id));
        }
        if (str_input.indexOf("<[Status]>") !== -1) {
            str_input = str_input.replace("<[Status]>", parseStatus(status_id));
        }
        if (str_input.indexOf("&lt;[Status]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Status]&gt;", parseStatus(status_id));
        }
        if (str_input.indexOf("<[Login Name]>") !== -1) {
            str_input = str_input.replace("<[Login Name]>", sessionStorage.getItem('ss_mrkt_loginName'));
        }
        if (str_input.indexOf("&lt;[Login Name]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Login Name]&gt;", sessionStorage.getItem('ss_mrkt_loginName'));
        }
        if (str_input.indexOf("<[Task Status Note]>") !== -1) {
            str_input = str_input.replace("<[Task Status Note]>", admin_note.replace(/\\r\\n/g, "<br/>"));
        }
        if (str_input.indexOf("&lt;[Task Status Note]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Task Status Note]&gt;", admin_note.replace(/\\r\\n/g, "<br/>"));
        }
    }
    return $.trim(str_input);
}

function parseAdminInfo(str_input) {
    if (arr_admin.length === 1) {
        if (str_input.indexOf("<[Staff Email]>") !== -1) {
            str_input = str_input.replace("<[Staff Email]>", arr_admin[0]['AdminEmail']);
        }
        if (str_input.indexOf("&lt;[Staff Email]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Staff Email]&gt;", arr_admin[0]['AdminEmail']);
        }
        if (str_input.indexOf("<[Staff Name]>") !== -1) {
            str_input = str_input.replace("<[Staff Name]>", arr_admin[0]['AdminName']);
        }
        if (str_input.indexOf("&lt;[Staff Name]&gt;") !== -1) {
            str_input = str_input.replace("&lt;[Staff Name]&gt;", arr_admin[0]['AdminName']);
        }
    }
    return $.trim(str_input);
}

function parseMrktTaksList(mrkt_request_id) {
    var result = new Array();
    result = db_getMrktTaskByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        var str_task_list = "";
        if (result[0]['ckbMrktPrint'] === "1") {
            str_task_list += "Print/Graphics, ";
        }
        if (result[0]['ckbMrktPhoto'] === "1") {
            str_task_list += "Photographic, ";
        }
        if (result[0]['ckbMrktMedia'] === "1") {
            str_task_list += "Social Media/Publicity, ";
        }
        if (result[0]['ckbMrktWeb'] === "1") {
            str_task_list += "Web Services, ";
        }
        if (result[0]['ckbMrktVideo'] === "1") {
            str_task_list += "Video, ";
        }
        if (result[0]['ckbMrktEditorial'] === "1") {
            str_task_list += "Editorial Services, ";
        }
        return $.trim(str_task_list).slice(0, -1);
    }
    else {
        return "";
    }
}

function parseStatus(status_id) {
    var result = new Array();
    result = db_getStatusByID(status_id);
    
    if (result.length === 1) {
        return $.trim(result[0]['Status']);
    }
    else {
        return "";
    }
}