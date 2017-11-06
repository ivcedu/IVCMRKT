var str_img = "";
var m_table;
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {        
        sessionStorage.setItem('ss_mrkt_referrer', "home.html");
        isLoginAdmin();
        getLoginInfo();
        getMyRequestList();
    }
    else {
        window.open('login.html', '_self');
        return false;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    
    // my project list click event /////////////////////////////////////////////
    $('table').on('click', 'a[id^="mrkt_request_id_"]', function() {
        var mrkt_request_id = $(this).attr('id').replace("mrkt_request_id_", "");
        var result = new Array();
        result = db_getMrktRequestByID(mrkt_request_id);
        
        if (result.length === 1) {
            sessionData_MrktRequestID(mrkt_request_id);
            if (result[0]['StatusID'] === "1" || result[0]['StatusID'] === "3") {
                window.open('mrktRequest.html', '_self');
                return false;
            }
            else {
                window.open('rptMrktReqView.html', '_self');
                return false;
            }
        }
        return false;
    });
    
    // my project list click event /////////////////////////////////////////////
    $('table').on('click', 'a[id^="mrkt_delete_id_"]', function() {
        var mrkt_request_id = $(this).attr('id').replace("mrkt_delete_id_", "");

        swal({ title: "Are you sure?",
               text: "You will not be able to recover this marketing request!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false },
               function() {
                    if (!deleteMrktAttachmentFile(mrkt_request_id)) {
                        return false;
                    }
                    if (!deleteMrktRequestAll(mrkt_request_id)) {
                        return false;
                    }
                    getMyRequestList();
                    swal("Deleted!", "Your marketing request has been deleted.", "success"); });
                
        this.blur();
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - Home<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
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
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_my_request_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 4 }] });
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
    
    if (result.length === 1 && result[0]['Active'] === "1") {
        $('.rpt_mrkt_staff').show();
        $('#nav_sidebar_mrkt_staff').show();
        if (result[0]['AdminPrivilegeID'] === "1" || result[0]['AdminPrivilegeID'] === "2") {
            $('#nav_sidebar_system').show();
            if (result[0]['AdminPrivilegeID'] === "1") {
                $('#nav_sidebar_sys_access_level').show();
                $('#nav_sidebar_sys_task').show();
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMyRequestList() {    
    var result = new Array();
    result = db_getMyRequestListDataTable(sessionStorage.getItem('ss_mrkt_loginEmail'));
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertTransaction(mrkt_request_id, note) {       
    if (db_insertTransaction(mrkt_request_id, sessionStorage.getItem('ss_mrkt_loginName'), note) === "") {
        var str_msg = "DB system error INSERT TRANSACTION - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteMrktRequestAll(mrkt_request_id) {
    if (!db_deleteMrktRequestAllByID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT REQUEST ALL - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktAttachmentFile(mrkt_request_id) {
    var result = new Array();
    result = db_getMrktAttachmentByReqID(mrkt_request_id);
    for (var i = 0; i < result.length; i++) {
        var file_link_name = result[i]['FileLinkName'];
        if (!removeFileMrktAttachment(file_link_name)) {
            var str_msg = "FILE system error DELETE MRKT_ATTACHMENT - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    return true;
}