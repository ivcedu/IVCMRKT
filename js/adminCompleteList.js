var m_table;

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
    
    sessionStorage.setItem('ss_mrkt_referrer', "adminCompleteList.html");
    getLoginInfo();
    getDefaultStartEndDate();
    getAdminCompleteList();
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
    
    // datepicker initialize ///////////////////////////////////////////////////
    $('.ivcmarkt_date_only_format').datetimepicker({ format: 'MM/DD/YYYY', useCurrent: false, ignoreReadonly: true }); 
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    
    // admin new list click event //////////////////////////////////////////////
    $('table').on('click', 'a[id^="mrkt_request_id_"]', function() {
        var mrkt_request_id = $(this).attr('id').replace("mrkt_request_id_", "");
        var result = new Array();
        result = db_getMrktRequestByID(mrkt_request_id);
        
        if (result.length === 1) {
            sessionData_MrktRequestID(mrkt_request_id);
            window.open('mrktPrintView.html', '_self');
            return false;
        }
    });
    
    // refresh button click ////////////////////////////////////////////////////
    $('#btn_refresh').click(function() {
        getAdminCompleteList();
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - MRKT Staff Complete Request List<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
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
    m_table = $('#tbl_complete_req_list').DataTable({ paging: false, bInfo: false,
                                                        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
                                                        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                                                        buttons: [  {extend: 'copy',className: 'btn-sm'},
                                                                    {extend: 'csv',title: 'export_csv', className: 'btn-sm'},
                                                                    {extend: 'pdf', title: 'export_pdf', className: 'btn-sm'},
                                                                    {extend: 'print',className: 'btn-sm'}
                                                                ] });
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
        $('#nav_sidebar_system').show();
        $('#nav_sidebar_sys_access_level').show();
        $('#nav_sidebar_sys_task').show();
        return true;
    }
    if (privilege === "Administrator") {
        $('#nav_sidebar_system').show();
        return true;
    }
    if (privilege === "Staff") {
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
function getDefaultStartEndDate() {    
    $('#start_date').data("DateTimePicker").date(getFistDayOfMothWithSetMonth(-2));
    $('#end_date').data("DateTimePicker").date(getCurrentLastDayOfMonth());
} 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAdminCompleteList() {
    var start_date = $('#start_date').find('input').val();
    var end_date = $('#end_date').find('input').val();
    
    var result = new Array();
    result = db_getAdminCompleteListDataTable(start_date, end_date);
    
    m_table.clear();
    m_table.rows.add(result).draw();
}