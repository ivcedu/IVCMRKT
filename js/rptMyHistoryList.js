var m_table;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        isLoginAdmin();
        getLoginInfo();
        getMyHistoryList();
    }
    else {
        window.open('login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });

    // table wsample title click event /////////////////////////////////////////
    $('#tbl_my_history_list').on('click', 'a[id^="event_request_id_"]', function() {
        var event_request_id = $(this).attr('id').replace("event_request_id_", "");
        window.open('viewRequest.html?event_request_id=' + event_request_id, '_self');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_my_history_list').DataTable({ paging: false, bInfo: false,
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
function isLoginAdmin() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_mrkt_loginEmail'));
    
    if (result.length === 1) {
        $('#nav_rpt_complete_list').show();
        $('#menu_administrator').show();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_mrkt_loginName');
    $('#login_user').html(login_name);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMyHistoryList() {
//    var result = new Array();
//    result = db_getAdminEventReqList();
//    
//    m_table.clear();
//    m_table.rows.add(result).draw();
}