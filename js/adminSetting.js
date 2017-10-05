var m_table;
var admin_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null && isLoginAdmin()) {
        getLoginInfo();
        getAdminPrivilegeList();
        getAdminList();
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
    
    // new admin button click //////////////////////////////////////////////////
    $('#btn_new_admin').click(function() {
        admin_id = "";
        clearModalSection();
        $('#mod_admin_header').html("New Admin Setting");
        $("#mod_user_active").iCheck('check');
        $('#mod_admin_setting').modal('show');
        return false;
    });
    
    // admin user list edit button click ////////////////////////////////////////
    $('table').on('click', 'a[id^="admin_id_"]', function() {
        admin_id = $(this).attr('id').replace("admin_id_", "");
        var result = new Array();
        result = db_getAdminByID(admin_id);
        
        clearModalSection();
        $('#mod_admin_header').html("Edit Admin Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_user_active").iCheck('check');
        }
        else {
            $("#mod_user_active").iCheck('unchecke');
        }
        $('#mod_user_mame').val(result[0]['AdminName']);
        $('#mod_user_email').val(result[0]['AdminEmail']);
        $('#mod_access_level').val(result[0]['AdminPrivilegeID']);
        $('#mod_admin_setting').modal('show');
        return false;
    });
    
    // modal save button click /////////////////////////////////////////////////
    $('#mod_btn_admin_save').click(function() { 
        var admin_active = ($('#mod_user_active').is(':checked') ? true : false);
        var admin_name = $.trim($('#mod_user_mame').val());
        var admin_email = $.trim($('#mod_user_email').val());
        var admin_privilege_id = $('#mod_access_level').val();
        
        if (admin_id === "") {
            if (!adminValidation()) {
                return false;
            }
            else {
                if (db_insertAdmin(admin_active, admin_name, admin_email, admin_privilege_id) === "") {
                    $('#mod_admin_setting').modal('hide');
                    var str_msg = "DB system error INSERT ADMIN";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "New marketing staff has been added: " + admin_name + " - " + admin_email);
                }
            }
        }
        else {
            if (!db_updateAdminByID(admin_id, admin_active, admin_name, admin_email, admin_privilege_id)) {
                $('#mod_admin_setting').modal('hide');
                var str_msg = "DB system error UPDATE ADMIN - AdminID: " + admin_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                db_insertSystemLog(sessionStorage.getItem('ss_mrkt_loginName'), "Marketing staff has been updated AdminID: " + admin_id + " - " + admin_name + " - " + admin_email);
            }
        }
        
        getAdminList();
        $('#mod_admin_setting').modal('hide');
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - System Staff Access<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
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
    m_table = $('#tbl_admin_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 4 }] });
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

function getAdminPrivilegeList() {
    var result = new Array();
    result = db_getAdminPrivilegeListActive();
    
    $('#mod_access_level').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AdminPrivilegeID']  + "'>" + result[i]['AccessLevel'] + "</option>";
    }
    
    $('#mod_access_level').append(html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function adminValidation() {
    if ($.trim($('#mod_user_mame').val()) === "") {
        swal({title: "Error", text: "Marketing staff name is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#mod_user_email').val()) === "") {
        swal({title: "Error", text: "Marketing staff email is a required field", type: "error"});
        return false;        
    }
    if ($('#mod_access_level').val() === "0") {
        swal({title: "Error", text: "User access level is a required field", type: "error"});
        return false;
    }

    var result = new Array();
    result = db_getAdminByEmail($.trim($('#mod_user_email').val()));
    if (result.length === 1) {
        swal({title: "Error", text: "Marketing staff email " + $('#mod_user_email').val() + " already exist", type: "error"});
        return false;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAdminList() {    
    var result = new Array();
    result = db_getAdminListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_admin_header').html("");
    $('#mod_user_active').iCheck('uncheck');
    $('#mod_user_mame').val("");
    $('#mod_user_email').val("");
    $('#mod_access_level').val("0");
}