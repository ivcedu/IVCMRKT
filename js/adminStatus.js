var m_table;
var status_id = "";

var m_obj_User;
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) === null) {
        window.open('login.html', '_self');
        return false;
    }
    m_obj_User =  new userRole.isActiveMRKTStaff();
    if (typeof m_obj_User.AdminID === 'undefined' || !getAdminAccessLevel()) {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    }
    
    getLoginInfo();
    getStatusList();
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
    
    // new status button click //////////////////////////////////////////////////
    $('#btn_new_status').click(function() {
        status_id = "";
        clearModalSection();
        $('#mod_status_header').html("New Status Setting");
        $("#mod_status_active").iCheck('check');
        $('#mod_status_setting').modal('show');
        return false;
    });
    
    // status list edit button click ////////////////////////////////////////////
    $('table').on('click', 'a[id^="status_id_"]', function() {
        status_id = $(this).attr('id').replace("status_id_", "");
        var result = new Array();
        result = db_getStatusByID(status_id);
        
        clearModalSection();
        $('#mod_status_header').html("Edit Status Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_status_active").iCheck('check');
        }
        else {
            $("#mod_status_active").iCheck('unchecke');
        }
        $('#mod_status_name').val(result[0]['Status']);
        $('#mod_status_setting').modal('show');
        return false;
    });
    
    // modal save button click /////////////////////////////////////////////////
    $('#mod_btn_status_save').click(function() {         
        var status_active = ($('#mod_status_active').is(':checked') ? true : false);
        var status_name = $.trim($('#mod_status_name').val());
        
        if (status_id === "") {
            if (!statusValidation()) {
                return false;
            }
            else {
                if (db_insertStatus(status_active, status_name) === "") {
                    $('#mod_status_setting').modal('hide');
                    var str_msg = "DB system error INSERT STATUS";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "New status has been added: " + status_name);
                }
            }
        }
        else {
            if (!db_updateStatusByID(status_id, status_active, status_name)) {
                $('#mod_status_setting').modal('hide');
                var str_msg = "DB system error UPDATE STATUS - StatusID: " + status_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "Status has been updated StatusID: " + status_id + " - " + status_name);
            }
        }
        
        getStatusList();
        $('#mod_status_setting').modal('hide');
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - System Status Setting<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
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
    m_table = $('#tbl_status_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 2 }] });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function capture() {    
    html2canvas($('body')).then(function(canvas) { 
        str_img = canvas.toDataURL(); 
        $('#mod_ivc_tech_img_screen').prop('src', str_img);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAdminAccessLevel() {
    var privilege = userRole.getActiveAdminPrivilege(m_obj_User.AdminPrivilegeID);
    if (privilege === "Master") {
        m_master = true;
        $('#nav_sidebar_sys_access_level').show();
        $('#nav_sidebar_sys_task').show();
        return true;
    }
    if (privilege === "Administrator") {
        return true;
    }

    return false;
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
function statusValidation() {
    if ($.trim($('#mod_status_name').val()) === "") {
        swal({title: "Error", text: "Status is a required field", type: "error"});
        return false;
    }

    var result = new Array();
    result = db_getStatusByName($.trim($('#mod_status_name').val()));
    if (result.length === 1) {
        swal({title: "Error", text: "Status " + $('#mod_status_name').val() + " already exist", type: "error"});
        return false;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getStatusList() {    
    var result = new Array();
    result = db_getStatusListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_status_header').html("");
    $('#mod_status_active').iCheck('uncheck');
    $('#mod_status_name').val("");
}