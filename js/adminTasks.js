var m_table;
var task_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null && isLoginAdmin()) {
        getLoginInfo();
        getTaskList();
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
    
    // new task button click ///////////////////////////////////////////////////
    $('#btn_new_task').click(function() {
        task_id = "";
        clearModalSection();
        $('#mod_task_header').html("New Task Setting");
        $("#mod_task_active").iCheck('check');
        $('#mod_task').modal('show');
        return false;
    });
    
    // task list edit button click /////////////////////////////////////////////
    $('table').on('click', 'a[id^="task_id_"]', function() {
        task_id = $(this).attr('id').replace("task_id_", "");
        var result = new Array();
        result = db_getTaskByID(task_id);
        
        clearModalSection();
        $('#mod_task_header').html("Edit Task Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_task_active").iCheck('check');
        }
        else {
            $("#mod_task_active").iCheck('unchecke');
        }
        $('#mod_task_name').val(result[0]['TaskName']);
        $('#mod_html_id').val(result[0]['html_id']);
        $('#mod_task_note').val(result[0]['Note']);
        $('#mod_task').modal('show');
        return false;
    });
    
    // modal save button click /////////////////////////////////////////////////
    $('#mod_btn_task_save').click(function() {         
        var task_active = ($('#mod_task_active').is(':checked') ? true : false);
        var task_name = $.trim($('#mod_task_name').val());
        var html_id = $.trim($('#mod_html_id').val());
        var task_note = $.trim($('#mod_task_note').val());
        
        if (task_id === "") {
            if (!taskValidation()) {
                return false;
            }
            else {
                if (db_insertTask(task_active, task_name, html_id, task_note) === "") {
                    $('#mod_task').modal('hide');
                    var str_msg = "DB system error INSERT TASK";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "New task has been added: " + task_name + " - " + html_id);
                }
            }
        }
        else {
            if (!db_updateTaskByID(task_id, task_active, task_name, html_id, task_note)) {
                $('#mod_task').modal('hide');
                var str_msg = "DB system error UPDATE TASK - TaskID: " + task_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "Task has been updated TaskID: " + task_id + " - " + task_name + " - " + html_id);
            }
        }
        
        getTaskList();
        $('#mod_task').modal('hide');
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - System Tasks<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
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
    m_table = $('#tbl_task_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 4 }] });
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function taskValidation() {
    if ($.trim($('#mod_task_name').val()) === "") {
        swal({title: "Error", text: "Task name is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#mod_html_id').val()) === "") {
        swal({title: "Error", text: "HTML ID is a required field", type: "error"});
        return false;
    }
    
    var result = new Array();
    result = db_getTaskByName($.trim($('#mod_task_name').val()));
    if (result.length === 1) {
        swal({title: "Error", text: "Task name " + $('#mod_access_name').val() + " already exist", type: "error"});
        return false;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTaskList() {    
    var result = new Array();
    result = db_getTaskListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_task_header').html("");
    $('#mod_task_active').iCheck('uncheck');
    $('#mod_task_name').val("");
    $('#mod_html_id').val("");
    $('#mod_task_note').val("");
}