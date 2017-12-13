var m_table;
var admin_privilege_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null && isLoginAdmin()) {
        getLoginInfo();
        getAccessLevelList();
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
    
    // new access button click /////////////////////////////////////////////////
    $('#btn_new_access').click(function() {
        admin_privilege_id = "";
        clearModalSection();
        $('#mod_access_header').html("New Access Level Setting");
        $("#mod_access_active").iCheck('check');
        $('#mod_access_level').modal('show');
        return false;
    });
    
    // access level list edit button click /////////////////////////////////////
    $('table').on('click', 'a[id^="admin_privilege_id_"]', function() {
        admin_privilege_id = $(this).attr('id').replace("admin_privilege_id_", "");
        var result = new Array();
        result = db_getAdminPrivilegeByID(admin_privilege_id);
        
        clearModalSection();
        $('#mod_access_header').html("Edit Access Level Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_access_active").iCheck('check');
        }
        else {
            $("#mod_access_active").iCheck('unchecke');
        }
        $('#mod_access_name').val(result[0]['AccessLevel']);
        $('#mod_access_level').modal('show');
        return false;
    });
    
    // modal save button click /////////////////////////////////////////////////
    $('#mod_btn_access_save').click(function() {         
        var access_active = ($('#mod_access_active').is(':checked') ? true : false);
        var access_level = $.trim($('#mod_access_name').val());
        
        if (admin_privilege_id === "") {
            if (!accessValidation()) {
                return false;
            }
            else {
                if (db_insertAdminPrivilege(access_active, access_level) === "") {
                    $('#mod_access_level').modal('hide');
                    var str_msg = "DB system error INSERT ADMIN_PRIVILEGE";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "New access level has been added: " + access_level);
                }
            }
        }
        else {
            if (!db_updateAdminPrivilegeByID(admin_privilege_id, access_active, access_level)) {
                $('#mod_access_level').modal('hide');
                var str_msg = "DB system error UPDATE ADMIN_PRIVILEGE - AdminPrivilegeID: " + admin_privilege_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "Access level has been updated AdminPrivilegeID: " + admin_privilege_id + " Access Level: " + access_level);
            }
        }
        
        getAccessLevelList();
        $('#mod_access_level').modal('hide');
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - System Access Level<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
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
    m_table = $('#tbl_access_level_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 2 }] });
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
function accessValidation() {
    if ($.trim($('#mod_access_name').val()) === "") {
        swal({title: "Error", text: "Access level is a required field", type: "error"});
        return false;
    }

    var result = new Array();
    result = db_getAdminPrivilegeByAccessLevel($.trim($('#mod_access_name').val()));
    if (result.length === 1) {
        swal({title: "Error", text: "Access level " + $('#mod_access_name').val() + " already exist", type: "error"});
        return false;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAccessLevelList() {    
    var result = new Array();
    result = db_getAdminPrivilegeListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_access_header').html("");
    $('#mod_access_active').iCheck('uncheck');
    $('#mod_access_name').val("");
}