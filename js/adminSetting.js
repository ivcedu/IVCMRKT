var m_table;
var admin_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        isLoginAdmin();
        getLoginInfo();
        getAdminList();
    }
    else {
        window.open('login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // new admin button click //////////////////////////////////////////////////
    $('#btn_new_admin').click(function() {
        admin_id = "";
        clearModalSection();
        $('#mod_admin_header').html("New Admin Setting");
        $('#mod_admin_setting').modal('show');
        return false;
    });
    
    // rating user list edit button click //////////////////////////////////////
    $('table').on('click', 'a[id^="admin_id_"]', function() {
        admin_id = $(this).attr('id').replace("admin_id_", "");
        var result = new Array();
        result = db_getAdminByID(admin_id);
        
        clearModalSection();
        $('#mod_admin_header').html("Edit Admin Setting");
        $('#mod_user_mame').val(result[0]['AdminName']);
        $('#mod_user_email').val(result[0]['AdminEmail']);
        $('#mod_access_level').val(result[0]['FullAccess']);
        $('#mod_admin_setting').modal('show');
        return false;
    });
    
    // modal save button click /////////////////////////////////////////////////
    $('#mod_btn_admin_save').click(function() {         
        var admin_name = $.trim(textReplaceApostrophe($('#mod_user_mame').val()));
        var admin_email = $.trim(textReplaceApostrophe($('#mod_user_email').val()));
        var full_access = $('#mod_access_level').val();
        
        if (admin_id === "") {
            db_insertAdmin(admin_name, admin_email, full_access);
        }
        else {
            db_updateAdmin(admin_id, admin_name, admin_email, full_access);
        }
        
        getAdminList();
        $('#mod_admin_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_admin_list').DataTable({ paging: false, bInfo: false, searching: false });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isLoginAdmin() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_mrkt_loginEmail'));
    
    if (result.length === 1) {
        $('#menu_administrator').show();
    }
    else {
        $('#menu_administrator').hide();
    }
}

function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_mrkt_loginName');
    $('#login_user').html(login_name);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAdminList() {    
    var result = new Array();
    result = db_getAdminList();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_admin_header').html("");
    $('#mod_user_mame').val("");
    $('#mod_user_email').val("");
    $('#mod_access_level').val("0");
}