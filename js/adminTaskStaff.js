var m_table;
var task_staff_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null && isLoginAdmin()) {
        getLoginInfo();
        getTaskListActive();
        getAdminListActive();
        getTaskStaffList();
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
    
    // new task staff button click /////////////////////////////////////////////
    $('#btn_new_task_staff').click(function() {
        task_staff_id = "";
        clearModalSection();
        $('#mod_task_staff_header').html("New Task Staff Setting");
        $("#mod_task_staff_active").iCheck('check');
        $('#mod_task_staff').modal('show');
        return false;
    });
    
    // task staff list edit button click ///////////////////////////////////////
    $('table').on('click', 'a[id^="task_staff_id_"]', function() {
        task_staff_id = $(this).attr('id').replace("task_staff_id_", "");
        var result = new Array();
        result = db_getTaskStaffByID(task_staff_id);
        
        clearModalSection();
        $('#mod_task_header').html("Edit Task Staff Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_task_staff_active").iCheck('check');
        }
        else {
            $("#mod_task_staff_active").iCheck('unchecke');
        }
        $('#mod_task_name_list').val(result[0]['TaskID']);
        $('#mod_staff_name_list').val(result[0]['AdminID']);
        $('#mod_task_staff_note').val(result[0]['Note']);
        $('#mod_task_staff').modal('show');
        return false;
    });
    
    // modal save button click /////////////////////////////////////////////////
    $('#mod_btn_task_staff_save').click(function() {         
        var task_staff_active = ($('#mod_task_staff_active').is(':checked') ? true : false);
        var task_id = $('#mod_task_name_list').val();
        var admin_id = $('#mod_staff_name_list').val();
        var task_staff_note = $.trim($('#mod_task_staff_note').val());
        
        if (task_staff_id === "") {
            if (!taskStaffValidation()) {
                return false;
            }
            else {
                if (db_insertTaskStaff(task_staff_active, task_id, admin_id, task_staff_note) === "") {
                    $('#mod_task_staff').modal('hide');
                    var str_msg = "DB system error INSERT TASK_STAFF";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "New marketing task staff has been added: TaskID - " + task_id + " AdminID - " + admin_id);
                }
            }
        }
        else {
            if (!db_updateTaskStaffByID(task_staff_id, task_staff_active, task_id, admin_id, task_staff_note)) {
                $('#mod_task_staff').modal('hide');
                var str_msg = "DB system error UPDATE TASK_STAFF - TaskStaffID: " + task_staff_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "Task staff has been updated TaskStaffID: " + task_staff_id + " TaskID - " + task_id + " AdminID - " + admin_id);
            }
        }
        
        getTaskStaffList();
        $('#mod_task_staff').modal('hide');
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - System Task Staff<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
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
    m_table = $('#tbl_task_staff_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 4 }] });
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

function getTaskListActive() {
    var result = new Array();
    result = db_getTaskListActive();
    
    $('#mod_task_name_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['TaskID']  + "'>" + result[i]['TaskName'] + "</option>";
    }
    
    $('#mod_task_name_list').append(html);
}

function getAdminListActive() {
    var result = new Array();
    result = db_getAdminListActive();
    
    $('#mod_staff_name_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AdminID']  + "'>" + result[i]['AdminName'] + "</option>";
    }
    
    $('#mod_staff_name_list').append(html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function taskStaffValidation() {
    if ($('#mod_task_name_list').val() === "0") {
        swal({title: "Error", text: "Task name is a required field", type: "error"});
        return false;
    }
    if ($('#mod_staff_name_list').val() === "0") {
        swal({title: "Error", text: "Marketing staff is a required field", type: "error"});
        return false;
    }

    var result = new Array();
    result = db_getTaskStaffByTaskAdmin($('#mod_task_name_list').val(), $('#mod_staff_name_list').val());
    if (result.length === 1) {
        swal({title: "Error", text: "Selected task assigned to staff already exist", type: "error"});
        return false;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTaskStaffList() {    
    var result = new Array();
    result = db_getTaskStaffListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_task_staff_header').html("");
    $('#mod_task_staff_active').iCheck('uncheck');
    $('#mod_task_name_list').val("0");
    $('#mod_staff_name_list').val("0");
    $('#mod_task_staff_note').val("");
}