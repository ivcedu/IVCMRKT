var m_table_param;
var m_table_proc;
var m_table_msg;

var email_param_id = "";
var email_proc_id = "";
var email_msg_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null && isLoginAdmin()) {
        getLoginInfo();
        getStatusListDropDown();
        getEmailProcListDropDown();
        getEmailTagListDropDown();
        getSystemStaffListAddOn();
        
        getEmailParamList();
        getEmailProcList();
        getEmailMsgList();
    }
    else {
        window.open('login.html', '_self');
        return false;
    }
};
////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // theme page setting //////////////////////////////////////////////////////
    $('.widget').widgster();
    $('[data-toggle=tooltip]').tooltip();
    $('[data-toggle=popover]').popover();
    
    // navigation bar setting to static ////////////////////////////////////////
    SingSettings.set('nav-static', true);
    SingSettings.save();
    
    // auto size initialize ////////////////////////////////////////////////////
    autosize($('.autogrow'));

    // summernote initialize ///////////////////////////////////////////////////
    $('.summernote').summernote({ height: 200, toolbar: [['style', ['bold', 'italic', 'underline']], ['textsize', ['fontsize']], ['color', ['color']], ['link', ['linkDialogShow']]] });
    
    // iCheck initialize ///////////////////////////////////////////////////////
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '-10%' // optional
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // logout button click /////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // ivc tech support dialog occures when the modal is fully shown ///////////
    $('#mod_ivc_tech_support').on('shown.bs.modal', function () {
        autosize.update($('#mod_ivc_tech_problems').val(""));
    });
    
    // ivc tech support click //////////////////////////////////////////////////
    $('#nav_ivc_tech').click(function() {
        capture();
        $('#mod_ivc_tech_problems').val("");
        $('#mod_ivc_tech_img_screen').prop('src', str_img);
        $('#mod_ivc_tech_support').modal('show');
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // new request click ///////////////////////////////////////////////////////
    $('#nav_new_request').click(function() {        
        sessionStorage.removeItem('ss_mrkt_request_id');
        window.open('mrktRequest.html', '_self');
        return false;
    });
    
    // report all request click ////////////////////////////////////////////////
    $('#nav_rpt_all_request').click(function() {        
        sessionStorage.setItem('ss_rpt_option_id', "0");
        window.open('rptAllRequest.html', '_self');
        return false;
    });
    
    // report in process click /////////////////////////////////////////////////
    $('#nav_rpt_in_process').click(function() {        
        sessionStorage.setItem('ss_rpt_option_id', status_in_progress_id);
        window.open('rptAllRequest.html', '_self');
        return false;
    });
    
    // report completed click //////////////////////////////////////////////////
    $('#nav_rpt_completed').click(function() {        
        sessionStorage.setItem('ss_rpt_option_id', status_complete_id);
        window.open('rptAllRequest.html', '_self');
        return false;
    });
    
    // report canceled click ///////////////////////////////////////////////////
    $('#nav_rpt_canceled').click(function() {        
        sessionStorage.setItem('ss_rpt_option_id', status_cancel_id);
        window.open('rptAllRequest.html', '_self');
        return false;
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // new email parameter button click ////////////////////////////////////////
    $('#btn_new_email_param').click(function() {
        email_param_id = "";
        clearModalEmailParamSection();
        $('#mod_email_param_header').html("New Email Parameter Setting");
        $("#mod_email_param_active").iCheck('check');
        $('#mod_email_param').modal('show');
        return false;
    });
    
    // new email procedure button click ////////////////////////////////////////
    $('#btn_new_email_proc').click(function() {
        email_proc_id = "";
        clearModalEmailProcSection();
        $('#mod_email_proc_header').html("New Email Procedure Setting");
        $("#mod_email_proc_active").iCheck('check');
        $('#mod_email_proc').modal('show');
        return false;
    });
    
    // new email notification button click /////////////////////////////////////
    $('#btn_new_email_msg').click(function() {
        email_msg_id = "";
        getEmailProcListDropDown();
        getEmailTagListDropDown();
        clearModalEmailMsgSection();
        $('#mod_email_msg_header').html("New Email Notification Setting");
        $("#mod_email_msg_active").iCheck('check');
        $('#mod_email_msg').modal('show');
        return false;
    });
    
    // email parameter list edit button click //////////////////////////////////
    $('#tbl_email_param_list').on('click', 'a[id^="email_param_id_"]', function() {
        email_param_id = $(this).attr('id').replace("email_param_id_", "");
        var result = new Array();
        result = db_getEmailParamByID(email_param_id);
        
        clearModalEmailParamSection();
        $('#mod_email_param_header').html("Edit Email Parameter Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_email_param_active").iCheck('check');
        }
        else {
            $("#mod_email_param_active").iCheck('unchecke');
        }
        $('#mod_email_param_name').val(result[0]['ParamName']);
        $('#mod_email_param_tag').val(result[0]['ParamTag']);
        $('#mod_email_param').modal('show');
        return false;
    });
    
    // email procedure list edit button click //////////////////////////////////
    $('#tbl_email_proc_list').on('click', 'a[id^="email_proc_id_"]', function() {
        email_proc_id = $(this).attr('id').replace("email_proc_id_", "");
        var result = new Array();
        result = db_getEmailProcByID(email_proc_id);
        
        clearModalEmailProcSection();
        $('#mod_email_proc_header').html("Edit Email Procedure Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_email_proc_active").iCheck('check');
        }
        else {
            $("#mod_email_proc_active").iCheck('unchecke');
        }
        $('#mod_email_proc_status_list').val(result[0]['StatusID']);
        $('#mod_email_proc_name').val(result[0]['ProcName']);
        $('#mod_email_proc').modal('show');
        return false;
    });
    
    // email msg list edit button click ////////////////////////////////////////
    $('#tbl_email_msg_list').on('click', 'a[id^="email_msg_id_"]', function() {
        email_msg_id = $(this).attr('id').replace("email_msg_id_", "");
        var result = new Array();
        result = db_getEmailMsgByID(email_msg_id);
        
        getEmailProcListDropDown();
        getEmailTagListDropDown();
        clearModalEmailMsgSection();
        $('#mod_email_msg_header').html("Edit Email Notification Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_email_msg_active").iCheck('check');
        }
        else {
            $("#mod_email_msg_active").iCheck('unchecke');
        }
        $('#mod_email_msg_proc_list').val(result[0]['EmailProcID']);
        $('#mod_email_msg_status').html(getEmailMsgProcStatus(result[0]['EmailProcID']));
        $('#mod_email_msg_name').val(result[0]['EmailMsgName']);
        $('#mod_email_msg_to').val(getEmailMsgToList());
        $('#mod_email_msg_cc').val(getEmailMsgCCList());
        $('#mod_email_msg_subject').val(result[0]['EmailMsgSubject']);
        $('#mod_email_msg_content').summernote('code', result[0]['EmailMsgContent']);
        $('#mod_email_msg').modal('show');
        return false;
    });
    
    // modal email parameter save button click /////////////////////////////////
    $('#mod_btn_email_param_save').click(function() {         
        var email_param_active = ($('#mod_email_param_active').is(':checked') ? true : false);
        var param_name = $.trim($('#mod_email_param_name').val());
        var param_tag = $.trim($('#mod_email_param_tag').val());
        
        if (email_param_id === "") {
            if (!emailParamValidation()) {
                return false;
            }
            else {
                if (db_insertEmailParam(email_param_active, param_name, param_tag) === "") {
                    $('#mod_email_param').modal('hide');
                    var str_msg = "DB system error INSERT EMAIL_PARAM";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "New email param has been added: " + param_name + ", " + param_tag);
                }
            }
        }
        else {
            if (!db_updateEmailParamByID(email_param_id, email_param_active, param_name, param_tag)) {
                $('#mod_email_param').modal('hide');
                var str_msg = "DB system error UPDATE EMAIL_PARAM - EmailParamID: " + email_param_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "Email Param has been updated EmailParamID: " + email_param_id + " - " + param_name + ", " + param_tag);
            }
        }
        
        getEmailParamList();
        $('#mod_email_param').modal('hide');
        return false;
    });
    
    // modal email procedure save button click //////////////////////////////////
    $('#mod_btn_email_proc_save').click(function() {         
        var email_proc_active = ($('#mod_email_proc_active').is(':checked') ? true : false);
        var status_id = $('#mod_email_proc_status_list').val();
        var proc_name = $.trim($('#mod_email_proc_name').val());
        
        if (email_proc_id === "") {
            if (!emailProcValidation()) {
                return false;
            }
            else {
                if (db_insertEmailProc(email_proc_active, status_id, proc_name) === "") {
                    $('#mod_email_msg').modal('hide');
                    var str_msg = "DB system error INSERT EMAIL_PROC";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "New email proc has been added: " + proc_name);
                }
            }
        }
        else {
            if (!db_updateEmailProcByID(email_proc_id, email_proc_active, status_id, proc_name)) {
                $('#mod_email_msg').modal('hide');
                var str_msg = "DB system error UPDATE EMAIL_PROC - EmailProcID: " + email_proc_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "Email Proc has been updated EmailProcID: " + email_proc_id + " - " + proc_name);
            }
        }
        
        getEmailProcList();
        $('#mod_email_proc').modal('hide');
        return false;
    });
    
    // modal email notification save button click ///////////////////////////////
    $('#mod_btn_email_msg_save').click(function() {
        var email_msg_active = ($('#mod_email_msg_active').is(':checked') ? true : false);
        var email_proc_id = $('#mod_email_msg_proc_list').val();
        var email_msg_name = $.trim($('#mod_email_msg_name').val());
        var email_msg_subject = $.trim($('#mod_email_msg_subject').val());
        var email_msg_content = $.trim($('#mod_email_msg_content').summernote('code'));
        
        if (email_msg_id === "") {
            if (!emailMsgValidation()) {
                return false;
            }
            else {
                email_msg_id = db_insertEmailMsg(email_msg_active, email_proc_id, email_msg_name, email_msg_subject, email_msg_content);
                if (email_msg_id === "") {
                    $('#mod_email_msg').modal('hide');
                    var str_msg = "DB system error INSERT EMAIL_MSG";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    if (!insertEmailMsgToList()) {
                        var str_msg = "DB system error INSERT EMAIL_TO";
                        return dbSystemErrorHandling(str_msg);
                    }
                    if (!insertEmailMsgCCList()) {
                        var str_msg = "DB system error INSERT EMAIL_CC";
                        return dbSystemErrorHandling(str_msg);
                    }
                    db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "New email msg has been added: " + email_msg_name);
                }
            }
        }
        else {
            if (!emailMsgValidation()) {
                return false;
            }
            if (!db_updateEmailMsgByID(email_msg_id, email_msg_active, email_proc_id, email_msg_name, email_msg_subject, email_msg_content)) {
                $('#mod_email_msg').modal('hide');
                var str_msg = "DB system error UPDATE EMAIL_MSG - EmailMsgID: " + email_msg_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                if (!db_deleteEmailToByEmailMsgID(email_msg_id)) {
                    var str_msg = "DB system error DELETE EMAIL_TO";
                    return dbSystemErrorHandling(str_msg);
                }
                if (!insertEmailMsgToList()) {
                    var str_msg = "DB system error INSERT EMAIL_TO";
                    return dbSystemErrorHandling(str_msg);
                }
                if (!db_deleteEmailCCByEmailMsgID(email_msg_id)) {
                    var str_msg = "DB system error DELETE EMAIL_CC";
                    return dbSystemErrorHandling(str_msg);
                }
                if (!insertEmailMsgCCList()) {
                    var str_msg = "DB system error INSERT EMAIL_CC";
                    return dbSystemErrorHandling(str_msg);
                }
                db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "Email Msg has been updated EmailMsgID: " + email_msg_id + " - " + email_msg_name);
            }
        }
        
        getEmailMsgList();
        $('#mod_email_msg').modal('hide');
        return false;
    });
    
    // mod email notification procedure change event ////////////////////////////
    $('#mod_email_msg_proc_list').change(function() {
        var email_proc_id = $(this).val();
        if (email_proc_id === "1") {
            $('#mod_email_msg_to').val("<[Requestor Email]>;");
        }
        else {
            $('#mod_email_msg_to').val("");
        }
        
        var result = new Array();
        result = db_getEmailProcByID(email_proc_id);
        
        var result2 = new Array();
        result2 = db_getStatusByID(result[0]['StatusID']);
        
        if (result2.length === 1) {
            $('#mod_email_msg_status').html(result2[0]['Status']);
        }
        else {
            $('#mod_email_msg_status').html("");
        }
        return false;
    });
       
    // modal email notification To icon list click event ////////////////////////
    $('#mod_icon_email_to_list').on('click', 'a[id^="mod_icon_email_to_"]', function() {
        var admin_email = $(this).attr('id').replace("mod_icon_email_to_", "") + ";";
        var eamil_to = $('#mod_email_msg_to').val();

        if (eamil_to === "") {
            $('#mod_email_msg_to').val(admin_email);
        }
        else {
            $('#mod_email_msg_to').val(eamil_to + " " + admin_email);
        }
        return false;
    });
    
    // modal email notification CC icon list click event ////////////////////////
    $('#mod_icon_email_cc_list').on('click', 'a[id^="mod_icon_email_cc_"]', function() {
        var admin_email = $(this).attr('id').replace("mod_icon_email_cc_", "") + ";";
        var eamil_cc = $('#mod_email_msg_cc').val();
        
        if (eamil_cc === "") {
            $('#mod_email_msg_cc').val(admin_email);
        }
        else {
            $('#mod_email_msg_cc').val(eamil_cc + " " + admin_email);
        }
        return false;
    });
    
    // modal email notification tag insert button click /////////////////////////
    $('#mod_btn_email_tag_insert').click(function() { 
        var email_tag = $('#mod_email_msg_tag_list').val();
        
        if (email_tag !== "0") {
            $('#mod_email_msg_content').summernote('insertText', email_tag);
        }
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - Email System Setting<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
            $('#mod_ivc_tech_support').modal('hide');
            var str_subject = "Marketing Request: IVC Tech Support Request Error";
            var str_msg = "Home: IVC tech support request error";
            sendEmailToDeveloper(str_subject, str_msg);
            swal("Error!", str_msg + "\nplease contact IVC Tech Support at 949.451.5696", "error");
            return false;
        }
        
        swal("Success!", "Your request has been submitted successfully", "success");
        $('#mod_ivc_tech_support').modal('hide');
    });
    
    // ivc tech support image click event //////////////////////////////////////
    $('#mod_ivc_tech_img_screen').click(function() {
        if (str_img !== "") {
            $.fancybox.open({ href: str_img });
        }
    });
    
    // get screen shot image ///////////////////////////////////////////////////
    html2canvas($('body'), {
        onrendered: function(canvas) { str_img = canvas.toDataURL("image/jpg"); }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // jquery datatables initialize /////////////////////////////////////////////
    m_table_param = $('#tbl_email_param_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 3 }] });
    m_table_proc = $('#tbl_email_proc_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 3 }] });
    m_table_msg = $('#tbl_email_msg_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 5 }] });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function capture() {    
    html2canvas($('body')).then(function(canvas) { str_img = canvas.toDataURL(); });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isLoginAdmin() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_mrkt_loginEmail'));
    
    if (result.length === 1 && result[0]['Active'] === "1" && (result[0]['AdminPrivilegeID'] === "1" || result[0]['AdminPrivilegeID'] === "2")) {
        if (result[0]['AdminPrivilegeID'] === "1") {
            $('#nav_sidebar_sys_access_level').show();
            $('#nav_sidebar_sys_task').show();
            
            $('#email_param_section').show();
            $('#email_proc_section').show();
        }
        return true;
    }
    else {
        return false;
    }
}

function getLoginInfo() {
    $('#login_user').html("<b>" + sessionStorage.getItem('ss_mrkt_loginName') + "</b> ");
    setNewRequestCount();
}

function setNewRequestCount() {
    var result = new Array();
    result = db_getAdminNewListDataTable();
    if (result.length > 0) {
        $('#new_req_count').html(result.length);
        $('#new_req_count').show();
    }
    else {
        $('#new_req_count').html("");
        $('#new_req_count').hide();
    }
}

function getStatusListDropDown() {
    var result = new Array();
    result = db_getStatusListActive();
    
    $('#mod_email_proc_status_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['StatusID']  + "'>" + result[i]['Status'] + "</option>";
    }
    
    $('#mod_email_proc_status_list').append(html);
}

function getEmailProcListDropDown() {
    var result = new Array();
    result = db_getEmailProcListActive();
    
    $('#mod_email_msg_proc_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['EmailProcID']  + "'>" + result[i]['ProcName'] + "</option>";
    }
    
    $('#mod_email_msg_proc_list').append(html);
}

function getEmailTagListDropDown() {
    var result = new Array();
    result = db_getEmailParamListActive();
    
    $('#mod_email_msg_tag_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['ParamTag']  + "'>" + result[i]['ParamName'] + "</option>";
    }
    
    $('#mod_email_msg_tag_list').append(html);
}

function getSystemStaffListAddOn() {
    var result = new Array();
    result = db_getAdminListActive();
    
    $('#mod_icon_email_to_list').empty();
    $('#mod_icon_email_cc_list').empty();
    var html_to = "";
    var html_cc = "";
    for (var i = 0; i < result.length; i++) {
        if (result[i]['AdminPrivilegeID'] === "1") {
            continue;
        }
        html_to += "<li><a href='#' id='mod_icon_email_to_" + result[i]['AdminEmail'] + "'>" + result[i]['AdminName'] + "</a></li>";
        html_cc += "<li><a href='#' id='mod_icon_email_cc_" + result[i]['AdminEmail'] + "'>" + result[i]['AdminName'] + "</a></li>";
    }
    
    $('#mod_icon_email_to_list').append(html_to);
    $('#mod_icon_email_cc_list').append(html_cc);
}

function getEmailMsgProcStatus(email_proc_id) {
    var result = new Array();
    result = db_getEmailProcByID(email_proc_id);
    
    if (result.length === 1) {
        var result2 = new Array();
        result2 = db_getStatusByID(result[0]['StatusID']);
        
        if (result2.length === 1) {
            return result2[0]['Status'];
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function emailParamValidation() {
    if ($.trim($('#mod_email_param_name').val()) === "") {
        swal({title: "Error", text: "Parameter is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#mod_email_param_tag').val()) === "") {
        swal({title: "Error", text: "Tag is a required field", type: "error"});
        return false;
    }

    var result = new Array();
    result = db_getEmailParamByNameTag($.trim($('#mod_email_param_name').val()), $.trim($('#mod_email_param_tag').val()));
    if (result.length === 1) {
        swal({title: "Error", text: "Parameter or Tag " + $('#mod_email_param_name').val() + ", " + $('#mod_email_param_tag').val() + " already exist", type: "error"});
        return false;
    }

    return true;
}

function emailProcValidation() {
    if ($('#mod_email_proc_status_list').val() === "0") {
        swal({title: "Error", text: "Status is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#mod_email_proc_name').val()) === "") {
        swal({title: "Error", text: "Procedure is a required field", type: "error"});
        return false;
    }

    var result = new Array();
    result = db_getEmailProcByName($.trim($('#mod_email_proc_name').val()));
    if (result.length === 1) {
        swal({title: "Error", text: "Procedure " + $('#mod_email_proc_name').val() + " already exist", type: "error"});
        return false;
    }

    return true;
}

function emailMsgValidation() {
    if ($('#mod_email_msg_proc_list').val() === "0") {
        swal({title: "Error", text: "Procedure is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#mod_email_msg_name').val()) === "") {
        swal({title: "Error", text: "System Email is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#mod_email_msg_to').val()) === "") {
        swal({title: "Error", text: "Email To is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#mod_email_msg_subject').val()) === "") {
        swal({title: "Error", text: "Email Subject is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#mod_email_msg_content').summernote('code')) === "") {
        swal({title: "Error", text: "Email Message is a required field", type: "error"});
        return false;
    }

    var result = new Array();
    result = db_getEmailMsgByProcIDName($('#mod_email_msg_proc_list').val(), $.trim($('#mod_email_msg_name').val()));
    if (result.length === 1) {
        swal({title: "Error", text: "Email Procedure or System Email " + $('#mod_email_msg_proc_list option:selected').text() + ", " + $('#mod_email_msg_name').val() + " already exist", type: "error"});
        return false;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertEmailMsgToList() {
    var email_msg_to_value = $('#mod_email_msg_to').val();
    var arr_email_msg_to = email_msg_to_value.split(";");
    
    for (var i = 0; i < arr_email_msg_to.length - 1; i++) {
        if (db_insertEmailTo(email_msg_id, $.trim(arr_email_msg_to[i])) === "") {
            return false;
        }
    }
    return true;
}

function insertEmailMsgCCList() {
    var email_msg_cc_value = $('#mod_email_msg_cc').val();
    var arr_email_msg_cc = email_msg_cc_value.split(";");
    
    for (var i = 0; i < arr_email_msg_cc.length - 1; i++) {
        if (db_insertEmailCC(email_msg_id, $.trim(arr_email_msg_cc[i])) === "") {
            return false;
        }
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getEmailMsgToList() {
    var result = new Array();
    result = db_getEmailToListByEmailMsgID(email_msg_id);
    
    var str_to_list = "";
    for (var i = 0; i < result.length; i++) {
        str_to_list += result[i]['ToEmail'] + "; ";
    }
    return $.trim(str_to_list);
}

function getEmailMsgCCList() {
    var result = new Array();
    result = db_getEmailCCListByEmailMsgID(email_msg_id);
    
    var str_cc_list = "";
    for (var i = 0; i < result.length; i++) {
        str_cc_list += result[i]['CCEmail'] + "; ";
    }
    return $.trim(str_cc_list);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getEmailParamList() {    
    var result = new Array();
    result = db_getEmailParamListDataTable();
    
    m_table_param.clear();
    m_table_param.rows.add(result).draw();
}

function getEmailProcList() {
    var result = new Array();
    result = db_getEmailProcListDataTable();
    
    m_table_proc.clear();
    m_table_proc.rows.add(result).draw();
}

function getEmailMsgList() {
    var result = new Array();
    result = db_getEmailMsgListDataTable();
    
    m_table_msg.clear();
    m_table_msg.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalEmailParamSection() {
    $('#mod_email_param_header').html("");
    $('#mod_email_param_active').iCheck('uncheck');
    $('#mod_email_param_name').val("");
    $('#mod_email_param_tag').val("");
}

function clearModalEmailProcSection() {
    $('#mod_email_proc_header').html("");
    $('#mod_email_proc_active').iCheck('uncheck');
    $('#mod_email_proc_status_list').val("0");
    $('#mod_email_proc_name').val("");
}

function clearModalEmailMsgSection() {
    $('#mod_email_msg_header').html("");
    $('#mod_email_msg_active').iCheck('uncheck');
    $('#mod_email_msg_proc_list').val("0");
    $('#mod_email_msg_status').html("");
    $('#mod_email_msg_name').val("");
    $('#mod_email_msg_to').val("");
    $('#mod_email_msg_cc').val("");
    $('#mod_email_msg_subject').val("");
    $('#mod_email_msg_content').summernote('code', "");
}