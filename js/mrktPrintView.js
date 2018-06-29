var m_previous_url = "";
var m_administrator = false;
var m_task_staff = false;

var mrkt_request_id = "";
var mrkt_print_id = "";
var mrkt_print_admin_id = "";
var mrkt_print_status_id = "";
var mrkt_print_log = "";
var mrkt_photo_id = "";
var mrkt_photo_admin_id = "";
var mrkt_photo_status_id = "";
var mrkt_photo_log = "";
var mrkt_media_id = "";
var mrkt_media_admin_id = "";
var mrkt_media_status_id = "";
var mrkt_media_log = "";
var mrkt_web_id = "";
var mrkt_web_admin_id = "";
var mrkt_web_status_id = "";
var mrkt_web_log = "";
var mrkt_video_id = "";
var mrkt_video_admin_id = "";
var mrkt_video_status_id = "";
var mrkt_video_log = "";
var mrkt_editorial_id = "";
var mrkt_editorial_admin_id = "";
var mrkt_editorial_status_id = "";
var mrkt_editorial_log = "";

var m_obj_User;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) === null) {
        window.open('login.html', '_self');
        return false;
    }
    m_obj_User =  new userRole.isActiveMRKTStaff();
    if (typeof m_obj_User.AdminID === 'undefined') {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    }
  
    setActiveNavMenu();
    setUserAccessView();
    getLoginInfo();

    if(!getMrktRequestID()) {
        sessionStorage.clear();
        window.open('home.html', '_self');
        return false;
    }

    getTaskStatusListActive();
    getMrktRequest();
    setAdminTaskStaffAssign();
    getMrktTask();
    setTaskStaffStatus();
    getMrktProcessLog();
    getTransactions();
    
    $(window).scrollTop(0);
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
    
    // datepicker initialize ///////////////////////////////////////////////////
    $('.ivcmarkt_date_only_format').datetimepicker({ format: 'MM/DD/YYYY', useCurrent: false, /* daysOfWeekDisabled: [0,6], */ ignoreReadonly: true }); 
    $('.ivcmarkt_time_only_format').datetimepicker({ format: 'LT', ignoreReadonly: true }); 
    
    // iCheck initialize ///////////////////////////////////////////////////////
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '-10%' // optional
    });
    
    // jQuery form validator initialize ////////////////////////////////////////
    $.validate();
    
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
        return false;
    });
    
    // ivc tech support click //////////////////////////////////////////////////
    $('#nav_ivc_tech').click(function() {
        capture();
        $('#mod_ivc_tech_problems').val("");
        $('#mod_ivc_tech_support').modal('show');
        return false;
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
    // admin task staff status section checkbox click event ////////////////////
    $('#ckb_admin_show_task_staff').on('ifChanged', function() {
        if ($('#ckb_admin_show_task_staff').is(':checked')) {
            $('#task_staff_section').show();
        }
        else {
            $('#task_staff_section').hide();
        }
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // marketing request status update button click ////////////////////////////
    $('#btn_mrkt_req_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var mrkt_req_status_name = $('#mrkt_req_status_list option:selected').text();
        var mrkt_note = $.trim($('#mrkt_req_status_note').val());
        if (mrkt_note !== "") {
            mrkt_note = "\n" + mrkt_note;
        }
        
        if (!updateMrktRequestStatus(mrkt_req_status_id)) {
            return false;
        }
        if (!insertMrktProcessLog(0, mrkt_req_status_id, "Request Status Update", getMrktProcessLogPreLogID())) {
            return false;
        }
        if (!insertTransaction("Marketing request status status has been updated: " + mrkt_req_status_name + mrkt_note)) {
            return false;
        }
        if (!systemEmailNotification(mrkt_request_id, mrkt_req_status_id, null, mrkt_note)) {
            return false;
        }
        
        $('#mrkt_req_status_note').val("");
        getMrktProcessLog();
        getTransactions();
        setNewRequestCount();
        swal({title: "Updated", text: "Marketing request status has been updated successfuly", type: "success"});
        return false;
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // admin task staff print update button click //////////////////////////////
    $('#btn_admin_task_staff_print_update').click(function() {        
        var print_admin_id = $('#print_task_staff_list').val();
        if (print_admin_id === "0") {
            swal({title: "Error", text: "Please select Print/Graphics task staff!", type: "error"});
            return false;
        }
        var print_task_staff = $('#print_task_staff_list option:selected').text();
        var admin_note = $.trim($('#admin_task_staff_note').val());
        if (admin_note !== "") {
            admin_note = "\n" + admin_note;
        }
        
        if (!updateMrktPrintAdmin(print_admin_id)) {
            return false;
        }
        if (!updateMrktPrintStatus(status_task_assigned_id)) {
            return false;
        }
        if (!insertMrktProcessLog(task_print_id, status_task_assigned_id, print_task_staff + admin_note, getMrktProcessLogPreLogID())) {
            return false;
        }
        if (!insertTransaction("Print/Graphics Task Staff has been assigned to " + print_task_staff + admin_note)) {
            return false;
        }
        var status_id = getAllTaskAssignedStatus();
        if (!updateMrktRequestStatus(status_id)) {
            return false;
        }
        if (!systemEmailNotification(mrkt_request_id, status_task_assigned_id, task_print_id, admin_note)) {
            return false;
        }

        swal({title: "Updated", text: "Print/Graphics task staff has been updated successfuly", type: "success"});
        $('#mrkt_req_status_list').val(status_id);
        $('#task_print_status_list').val(status_id);
        $('#admin_task_staff_note').val("");
        getMrktProcessLog();
        getTransactions();
        setNewRequestCount();
        return false;
    });
    
    // admin task staff photo update button click //////////////////////////////
    $('#btn_admin_task_staff_photo_update').click(function() {        
        var photo_admin_id = $('#photo_task_staff_list').val();
        if (photo_admin_id === "0") {
            swal({title: "Error", text: "Please select Photography task staff!", type: "error"});
            return false;
        }
        var photo_task_staff = $('#photo_task_staff_list option:selected').text();
        var admin_note = $.trim($('#admin_task_staff_note').val());
        if (admin_note !== "") {
            admin_note = "\n" + admin_note;
        }
        
        if (!updateMrktPhotoAdmin(photo_admin_id)) {
            return false;
        }
        if (!updateMrktPhotoStatus(status_task_assigned_id)) {
            return false;
        }
        if (!insertMrktProcessLog(task_photo_id, status_task_assigned_id, photo_task_staff + admin_note, getMrktProcessLogPreLogID())) {
            return false;
        }
        if (!insertTransaction("Photography Task Staff has been assigned to " + photo_task_staff + admin_note)) {
            return false;
        }
        var status_id = getAllTaskAssignedStatus();
        if (!updateMrktRequestStatus(status_id)) {
            return false;
        }
        if (!systemEmailNotification(mrkt_request_id, status_task_assigned_id, task_photo_id, admin_note)) {
            return false;
        }

        swal({title: "Updated", text: "Photography task staff has been updated successfuly", type: "success"});
        $('#mrkt_req_status_list').val(status_id);
        $('#task_photo_status_list').val(status_id);
        $('#admin_task_staff_note').val("");
        getMrktProcessLog();
        getTransactions();
        setNewRequestCount();
        return false;
    });
    
    // admin task staff media update button click //////////////////////////////
    $('#btn_admin_task_staff_media_update').click(function() {        
        var media_admin_id = $('#media_task_staff_list').val();
        if (media_admin_id === "0") {
            swal({title: "Error", text: "Please select Social Media/Publicity task staff!", type: "error"});
            return false;
        }
        var media_task_staff = $('#media_task_staff_list option:selected').text();
        var admin_note = $.trim($('#admin_task_staff_note').val());
        if (admin_note !== "") {
            admin_note = "\n" + admin_note;
        }
        
        if (!updateMrktMediaAdmin(media_admin_id)) {
            return false;
        }
        if (!updateMrktMediaStatus(status_task_assigned_id)) {
            return false;
        }
        if (!insertMrktProcessLog(task_media_id, status_task_assigned_id, media_task_staff + admin_note, getMrktProcessLogPreLogID())) {
            return false;
        }
        if (!insertTransaction("Social Media/Publicity Task Staff has been assigned to " + media_task_staff + admin_note)) {
            return false;
        }
        var status_id = getAllTaskAssignedStatus();
        if (!updateMrktRequestStatus(status_id)) {
            return false;
        }
        if (!systemEmailNotification(mrkt_request_id, status_task_assigned_id, task_media_id, admin_note)) {
            return false;
        }

        swal({title: "Updated", text: "Social Media/Publicity task staff has been updated successfuly", type: "success"});
        $('#mrkt_req_status_list').val(status_id);
        $('#task_media_status_list').val(status_id);
        $('#admin_task_staff_note').val("");
        getMrktProcessLog();
        getTransactions();
        setNewRequestCount();
        return false;
    });
    
    // admin task staff web update button click ////////////////////////////////
    $('#btn_admin_task_staff_web_update').click(function() {        
        var web_admin_id = $('#web_task_staff_list').val();
        if (web_admin_id === "0") {
            swal({title: "Error", text: "Please select Web Services task staff!", type: "error"});
            return false;
        }
        var web_task_staff = $('#web_task_staff_list option:selected').text();
        var admin_note = $.trim($('#admin_task_staff_note').val());
        if (admin_note !== "") {
            admin_note = "\n" + admin_note;
        }
        
        if (!updateMrktWebAdmin(web_admin_id)) {
            return false;
        }
        if (!updateMrktWebStatus(status_task_assigned_id)) {
            return false;
        }
        if (!insertMrktProcessLog(task_web_id, status_task_assigned_id, web_task_staff + admin_note, getMrktProcessLogPreLogID())) {
            return false;
        }
        if (!insertTransaction("Web Services Task Staff has been assigned to " + web_task_staff + admin_note)) {
            return false;
        }
        var status_id = getAllTaskAssignedStatus();
        if (!updateMrktRequestStatus(status_id)) {
            return false;
        }
        if (!systemEmailNotification(mrkt_request_id, status_task_assigned_id, task_web_id, admin_note)) {
            return false;
        }

        swal({title: "Updated", text: "Web Services task staff has been updated successfuly", type: "success"});
        $('#mrkt_req_status_list').val(status_id);
        $('#task_web_status_list').val(status_id);
        $('#admin_task_staff_note').val("");
        getMrktProcessLog();
        getTransactions();
        setNewRequestCount();
        return false;
    });
    
    // admin task staff video update button click //////////////////////////////
    $('#btn_admin_task_staff_video_update').click(function() {        
        var video_admin_id = $('#video_task_staff_list').val();
        if (video_admin_id === "0") {
            swal({title: "Error", text: "Please select Video task staff!", type: "error"});
            return false;
        }
        var video_task_staff = $('#video_task_staff_list option:selected').text();
        var admin_note = $.trim($('#admin_task_staff_note').val());
        if (admin_note !== "") {
            admin_note = "\n" + admin_note;
        }
        
        if (!updateMrktVideoAdmin(video_admin_id)) {
            return false;
        }
        if (!updateMrktVideoStatus(status_task_assigned_id)) {
            return false;
        }
        if (!insertMrktProcessLog(task_video_id, status_task_assigned_id, video_task_staff + admin_note, getMrktProcessLogPreLogID())) {
            return false;
        }
        if (!insertTransaction("Video Task Staff has been assigned to " + video_task_staff + admin_note)) {
            return false;
        }
        var status_id = getAllTaskAssignedStatus();
        if (!updateMrktRequestStatus(status_id)) {
            return false;
        }
        if (!systemEmailNotification(mrkt_request_id, status_task_assigned_id, task_video_id, admin_note)) {
            return false;
        }

        swal({title: "Updated", text: "Video task staff has been updated successfuly", type: "success"});
        $('#mrkt_req_status_list').val(status_id);
        $('#task_video_status_list').val(status_id);
        $('#admin_task_staff_note').val("");
        getMrktProcessLog();
        getTransactions();
        setNewRequestCount();
        return false;
    });
    
    // admin task staff editorial update button click //////////////////////////
    $('#btn_admin_task_staff_editorial_update').click(function() {        
        var editorial_admin_id = $('#editorial_task_staff_list').val();
        if (editorial_admin_id === "0") {
            swal({title: "Error", text: "Please select Editorial Services task staff!", type: "error"});
            return false;
        }
        var editorial_task_staff = $('#editorial_task_staff_list option:selected').text();
        var admin_note = $.trim($('#admin_task_staff_note').val());
        if (admin_note !== "") {
            admin_note = "\n" + admin_note;
        }
        
        if (!updateMrktEditorialAdmin(editorial_admin_id)) {
            return false;
        }
        if (!updateMrktEditorialStatus(status_task_assigned_id)) {
            return false;
        }
        if (!insertMrktProcessLog(task_editorial_id, status_task_assigned_id, editorial_task_staff + admin_note, getMrktProcessLogPreLogID())) {
            return false;
        }
        if (!insertTransaction("Editorial Services Task Staff has been assigned to " + editorial_task_staff + admin_note)) {
            return false;
        }
        var status_id = getAllTaskAssignedStatus();
        if (!updateMrktRequestStatus(status_id)) {
            return false;
        }
        if (!systemEmailNotification(mrkt_request_id, status_task_assigned_id, task_editorial_id, admin_note)) {
            return false;
        }

        swal({title: "Updated", text: "Editorial Services task staff has been updated successfuly", type: "success"});
        $('#mrkt_req_status_list').val(status_id);
        $('#task_editorial_status_list').val(status_id);
        $('#admin_task_staff_note').val("");
        getMrktProcessLog();
        getTransactions();
        setNewRequestCount();
        return false;
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // task print status change event //////////////////////////////////////////
    $('#task_print_status_list').change(function() {
        getMrktPrintFileAttachment($(this).val());
        return false;
    });
    
    // task photo status change event //////////////////////////////////////////
    $('#task_photo_status_list').change(function() {
        getMrktPhotoFileAttachment($(this).val());
        return false;
    });
    
    // task media status change event //////////////////////////////////////////
    $('#task_media_status_list').change(function() {
        getMrktMediaFileAttachment($(this).val());
        return false;
    });
    
    // task web status change event ////////////////////////////////////////////
    $('#task_web_status_list').change(function() {
        getMrktWebFileAttachment($(this).val());
        return false;
    });
    
    // task video status change event //////////////////////////////////////////
    $('#task_video_status_list').change(function() {
        getMrktVideoFileAttachment($(this).val());
        return false;
    });
    
    // task editorial status change event //////////////////////////////////////
    $('#task_editorial_status_list').change(function() {
        getMrktEditorialFileAttachment($(this).val());
        return false;
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // task input file change event ////////////////////////////////////////////
    $('.task_project_file_input').change(function() {
        var file = $(this).get(0).files[0];
        if (typeof file !== "undefined" && file !== null) {
            if (file.size >= 10000000) {
                swal({title: "Error", text: "Attached file size is too big, max. file size allow is 10Mb or less", type: "error"});
                $(this).val(null);
            }  
        }
        return false;
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // task print status update button click ///////////////////////////////////
    $('#btn_task_print_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var print_status_id = $('#task_print_status_list').val();
        var print_status_name = $('#task_print_status_list option:selected').text();
        var print_file_name = getMrktPrintFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning("spinner_loader_task", "spinner_img_task");
        setTimeout(function() {
            if (!insertMrktPrintFile()) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!updateMrktPrintStatus(print_status_id)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!insertMrktProcessLog(task_print_id, print_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (print_file_name !== "") {
                print_file_name = "\nPrint/Graphics project file has been attached: " + print_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Print/Graphics status has been updated: " + print_status_name + print_file_name + task_note)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning("spinner_loader_task", "spinner_img_task");
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (print_status_id === status_complete_id || print_status_id === status_cancel_id) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({ title: "Updated", 
                        text: "Print/Graphics status has been updated successfuly", 
                        type: "success",
                        confirmButtonText: "OK" }, 
                        function() {
                            window.open(m_previous_url, '_self');
                            return false; });
            }
            else {
                $('#mrkt_req_status_list').val(status_id);
                $('#task_status_note').val("");
                getMrktProcessLog();
                getTransactions();
                setNewRequestCount();
                
                stopSpinning("spinner_loader_task", "spinner_img_task");        
                swal({title: "Updated", text: "Print/Graphics status has been updated successfuly", type: "success"});
            }
        }, 1500);
        
        return false;
    });
    
    // task photo status update button click ///////////////////////////////////
    $('#btn_task_photo_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var photo_status_id = $('#task_photo_status_list').val();
        var photo_status_name = $('#task_photo_status_list option:selected').text();
        var photo_file_name = getMrktPhotoFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning("spinner_loader_task", "spinner_img_task");
        setTimeout(function() {
            if (!insertMrktPhotoFile()) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!updateMrktPhotoStatus(photo_status_id)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!insertMrktProcessLog(task_photo_id, photo_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (photo_file_name !== "") {
                photo_file_name = "\nPhotography project file has been attached: " + photo_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Photography status has been updated: " + photo_status_name + photo_file_name + task_note)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning("spinner_loader_task", "spinner_img_task");
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (photo_status_id === status_complete_id || photo_status_id === status_cancel_id) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({ title: "Updated", 
                        text: "Photography status has been updated successfuly", 
                        type: "success",
                        confirmButtonText: "OK" }, 
                        function() {
                            window.open(m_previous_url, '_self');
                            return false; });
            }
            else {
                $('#mrkt_req_status_list').val(status_id);
                $('#task_status_note').val("");
                getMrktProcessLog();
                getTransactions();
                setNewRequestCount();
                
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({title: "Updated", text: "Photography status has been updated successfuly", type: "success"});
            }
        }, 1500);

        return false;
    });
    
    // task media status update button click ///////////////////////////////////
    $('#btn_task_media_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var media_status_id = $('#task_media_status_list').val();
        var media_status_name = $('#task_media_status_list option:selected').text();
        var media_file_name = getMrktMediaFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning("spinner_loader_task", "spinner_img_task");
        setTimeout(function() {
            if (!insertMrktMediaFile()) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!updateMrktMediaStatus(media_status_id)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!insertMrktProcessLog(task_media_id, media_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (media_file_name !== "") {
                media_file_name = "\nSocial Media/Publicity project file has been attached: " + media_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Social Media/Publicity status has been updated: " + media_status_name + media_file_name + task_note)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning("spinner_loader_task", "spinner_img_task");
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (media_status_id === status_complete_id || media_status_id === status_cancel_id) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({ title: "Updated", 
                        text: "Social Media/Publicity status has been updated successfuly", 
                        type: "success",
                        confirmButtonText: "OK" }, 
                        function() {
                            window.open(m_previous_url, '_self');
                            return false; });
            }
            else {
                $('#mrkt_req_status_list').val(status_id);
                $('#task_status_note').val("");
                getMrktProcessLog();
                getTransactions();
                setNewRequestCount();
                
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({title: "Updated", text: "Social Media/Publicity status has been updated successfuly", type: "success"});
            }
        }, 1500);

        return false;
    });
    
    // task web status update button click /////////////////////////////////////
    $('#btn_task_web_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var web_status_id = $('#task_web_status_list').val();
        var web_status_name = $('#task_web_status_list option:selected').text();
        var web_file_name = getMrktWebFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning("spinner_loader_task", "spinner_img_task");
        setTimeout(function() {
            if (!insertMrktWebFile()) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!updateMrktWebStatus(web_status_id)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!insertMrktProcessLog(task_web_id, web_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (web_file_name !== "") {
                web_file_name = "\nWeb Services project file has been attached: " + web_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Web Services status has been updated: " + web_status_name + web_file_name + task_note)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning("spinner_loader_task", "spinner_img_task");
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (web_status_id === status_complete_id || web_status_id === status_cancel_id) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({ title: "Updated", 
                        text: "Web Services status has been updated successfuly", 
                        type: "success",
                        confirmButtonText: "OK" }, 
                        function() {
                            window.open(m_previous_url, '_self');
                            return false; });
            }
            else {
                $('#mrkt_req_status_list').val(status_id);
                $('#task_status_note').val("");
                getMrktProcessLog();
                getTransactions();
                setNewRequestCount();
                
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({title: "Updated", text: "Web Services status has been updated successfuly", type: "success"});
            }
        }, 1500);

        return false;
    });
    
    // task video status update button click ///////////////////////////////////
    $('#btn_task_video_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var video_status_id = $('#task_video_status_list').val();
        var video_status_name = $('#task_video_status_list option:selected').text();
        var video_file_name = getMrktVideoFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning("spinner_loader_task", "spinner_img_task");
        setTimeout(function() {
            if (!insertMrktVideoFile()) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!updateMrktVideoStatus(video_status_id)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!insertMrktProcessLog(task_video_id, video_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (video_file_name !== "") {
                video_file_name = "\nVideo project file has been attached: " + video_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Video status has been updated: " + video_status_name + video_file_name + task_note)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning("spinner_loader_task", "spinner_img_task");
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (video_status_id === status_complete_id || video_status_id === status_cancel_id) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({ title: "Updated", 
                        text: "Video status has been updated successfuly", 
                        type: "success",
                        confirmButtonText: "OK" }, 
                        function() {
                            window.open(m_previous_url, '_self');
                            return false; });
            }
            else {
                $('#mrkt_req_status_list').val(status_id);
                $('#task_status_note').val("");
                getMrktProcessLog();
                getTransactions();
                setNewRequestCount();
                
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({title: "Updated", text: "Video status has been updated successfuly", type: "success"});
            }
        }, 1500);

        return false;
    });
    
    // task editorial status update button click ///////////////////////////////
    $('#btn_task_editorial_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var editorial_status_id = $('#task_editorial_status_list').val();
        var editorial_status_name = $('#task_editorial_status_list option:selected').text();
        var editorial_file_name = getMrktEditorialFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning("spinner_loader_task", "spinner_img_task");
        setTimeout(function() {
            if (!insertMrktEditorialFile()) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!updateMrktEditorialStatus(editorial_status_id)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (!insertMrktProcessLog(task_editorial_id, editorial_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (editorial_file_name !== "") {
                editorial_file_name = "\nEditorial Services project file has been attached: " + editorial_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Editorial Services status has been updated: " + editorial_status_name + editorial_file_name + task_note)) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning("spinner_loader_task", "spinner_img_task");
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }
            
            if (editorial_status_id === status_complete_id || editorial_status_id === status_cancel_id) {
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({ title: "Updated", 
                        text: "Editorial Services status has been updated successfuly", 
                        type: "success",
                        confirmButtonText: "OK" }, 
                        function() {
                            window.open(m_previous_url, '_self');
                            return false; });
            }
            else {
                $('#mrkt_req_status_list').val(status_id);
                $('#task_status_note').val("");
                getMrktProcessLog();
                getTransactions();
                setNewRequestCount();
                
                stopSpinning("spinner_loader_task", "spinner_img_task");
                swal({title: "Updated", text: "Editorial Services status has been updated successfuly", type: "success"});
            }
        }, 1500);

        return false;
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // task print file download button click ///////////////////////////////////
    $('#btn_print_file_download').click(function() {
        var result = new Array();
        result = db_getMrktPrintFileByPrintID(mrkt_print_id);
        if (result.length === 1) {
            var site_url = window.location.href.replace("mrktPrintView.html", "print_files/");
            var file_link_name = result[0]['FileLinkName'];
            window.open(site_url + file_link_name, '_blank');
            return false;
        }
        return false;
    });
    
    // task photo file download button click ///////////////////////////////////
    $('#btn_photo_file_download').click(function() {
        var result = new Array();
        result = db_getMrktPhotoFileByPhotoID(mrkt_photo_id);
        if (result.length === 1) {
            var site_url = window.location.href.replace("mrktPrintView.html", "photo_files/");
            var file_link_name = result[0]['FileLinkName'];
            window.open(site_url + file_link_name, '_blank');
            return false;
        }
        return false;
    });
    
    // task media file download button click ///////////////////////////////////
    $('#btn_media_file_download').click(function() {
        var result = new Array();
        result = db_getMrktMediaFileByMediaID(mrkt_media_id);
        if (result.length === 1) {
            var site_url = window.location.href.replace("mrktPrintView.html", "media_files/");
            var file_link_name = result[0]['FileLinkName'];
            window.open(site_url + file_link_name, '_blank');
            return false;
        }
        return false;
    });
    
    // task web file download button click /////////////////////////////////////
    $('#btn_web_file_download').click(function() {
        var result = new Array();
        result = db_getMrktWebFileByWebID(mrkt_web_id);
        if (result.length === 1) {
            var site_url = window.location.href.replace("mrktPrintView.html", "web_files/");
            var file_link_name = result[0]['FileLinkName'];
            window.open(site_url + file_link_name, '_blank');
            return false;
        }
        return false;
    });
    
    // task video file download button click ///////////////////////////////////
    $('#btn_video_file_download').click(function() {
        var result = new Array();
        result = db_getMrktVideoFileByVideoID(mrkt_video_id);
        if (result.length === 1) {
            var site_url = window.location.href.replace("mrktPrintView.html", "video_files/");
            var file_link_name = result[0]['FileLinkName'];
            window.open(site_url + file_link_name, '_blank');
            return false;
        }
        return false;
    });
    
    // task editorial file download button click ///////////////////////////////
    $('#btn_editorial_file_download').click(function() {
        var result = new Array();
        result = db_getMrktEditorialFileByEditorialID(mrkt_editorial_id);
        if (result.length === 1) {
            var site_url = window.location.href.replace("mrktPrintView.html", "editorial_files/");
            var file_link_name = result[0]['FileLinkName'];
            window.open(site_url + file_link_name, '_blank');
            return false;
        }
        return false;
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // task print file delete button click /////////////////////////////////////
    $('#btn_print_file_delete').click(function() {
        var status_id = $('#task_print_status_list').val();
        swal({ title: "Are you sure?",
               text: "You will not be able to recover this attached file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false },
               function() {
                    var result = new Array();
                    result = db_getMrktPrintFileByPrintID(mrkt_print_id);
                    if (result.length === 1) {
                        if (!deleteMrktPrintFile()) {
                            return false;
                        }
                        if (!deleteFilePrintAttachment(result[0]['FileLinkName'])) {
                            return false;
                        }
                        if (!insertTransaction("Task Print Project file has been Deleted - File name: " + result[0]['FileName'])) {
                            return false;
                        }
                        
                        getMrktPrintFileAttachment(status_id);
                        getTransactions();
                        swal("Deleted!", "Your attached file has been deleted.", "success"); 
                    }
                });
        return false;
    });
    
    // task photo file delete button click /////////////////////////////////////
    $('#btn_photo_file_delete').click(function() {
        var status_id = $('#task_photo_status_list').val();
        swal({ title: "Are you sure?",
               text: "You will not be able to recover this attached file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false },
               function() {
                    var result = new Array();
                    result = db_getMrktPhotoFileByPhotoID(mrkt_photo_id);
                    if (result.length === 1) {
                        if (!deleteMrktPhotoFile()) {
                            return false;
                        }
                        if (!deleteFilePhotoAttachment(result[0]['FileLinkName'])) {
                            return false;
                        }
                        if (!insertTransaction("Task Photo Project file has been Deleted - File name: " + result[0]['FileName'])) {
                            return false;
                        }
                        
                        getMrktPhotoFileAttachment(status_id);
                        getTransactions();
                        swal("Deleted!", "Your attached file has been deleted.", "success"); 
                    }
                });
        return false;
    });
    
    // task media file delete button click /////////////////////////////////////
    $('#btn_media_file_delete').click(function() {
        var status_id = $('#task_media_status_list').val();
        swal({ title: "Are you sure?",
               text: "You will not be able to recover this attached file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false },
               function() {
                    var result = new Array();
                    result = db_getMrktMediaFileByMediaID(mrkt_media_id);
                    if (result.length === 1) {
                        if (!deleteMrktMediaFile()) {
                            return false;
                        }
                        if (!deleteFileMediaAttachment(result[0]['FileLinkName'])) {
                            return false;
                        }
                        if (!insertTransaction("Task Media Project file has been Deleted - File name: " + result[0]['FileName'])) {
                            return false;
                        }
                        
                        getMrktMediaFileAttachment(status_id);
                        getTransactions();
                        swal("Deleted!", "Your attached file has been deleted.", "success"); 
                    }
                });
        return false;
    });
    
    // task web file delete button click ///////////////////////////////////////
    $('#btn_web_file_delete').click(function() {
        var status_id = $('#task_web_status_list').val();
        swal({ title: "Are you sure?",
               text: "You will not be able to recover this attached file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false },
               function() {
                    var result = new Array();
                    result = db_getMrktWebFileByWebID(mrkt_web_id);
                    if (result.length === 1) {
                        if (!deleteMrktWebFile()) {
                            return false;
                        }
                        if (!deleteFileWebAttachment(result[0]['FileLinkName'])) {
                            return false;
                        }
                        if (!insertTransaction("Task Web Project file has been Deleted - File name: " + result[0]['FileName'])) {
                            return false;
                        }
                        
                        getMrktWebFileAttachment(status_id);
                        getTransactions();
                        swal("Deleted!", "Your attached file has been deleted.", "success"); 
                    }
                });
        return false;
    });
    
    // task video file delete button click /////////////////////////////////////
    $('#btn_video_file_delete').click(function() {
        var status_id = $('#task_video_status_list').val();
        swal({ title: "Are you sure?",
               text: "You will not be able to recover this attached file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false },
               function() {
                    var result = new Array();
                    result = db_getMrktVideoFileByVideoID(mrkt_video_id);
                    if (result.length === 1) {
                        if (!deleteMrktVideoFile()) {
                            return false;
                        }
                        if (!deleteFileVideoAttachment(result[0]['FileLinkName'])) {
                            return false;
                        }
                        if (!insertTransaction("Task Video Project file has been Deleted - File name: " + result[0]['FileName'])) {
                            return false;
                        }
                        
                        getMrktVideoFileAttachment(status_id);
                        getTransactions();
                        swal("Deleted!", "Your attached file has been deleted.", "success"); 
                    }
                });
        return false;
    });
    
    // task editorial file delete button click /////////////////////////////////
    $('#btn_editorial_file_delete').click(function() {
        var status_id = $('#task_editorial_status_list').val();
        swal({ title: "Are you sure?",
               text: "You will not be able to recover this attached file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false },
               function() {
                    var result = new Array();
                    result = db_getMrktEditorialFileByEditorialID(mrkt_editorial_id);
                    if (result.length === 1) {
                        if (!deleteMrktEditorialFile()) {
                            return false;
                        }
                        if (!deleteFileEditorialAttachment(result[0]['FileLinkName'])) {
                            return false;
                        }
                        if (!insertTransaction("Task Editorial Project file has been Deleted - File name: " + result[0]['FileName'])) {
                            return false;
                        }
                        
                        getMrktEditorialFileAttachment(status_id);
                        getTransactions();
                        swal("Deleted!", "Your attached file has been deleted.", "success"); 
                    }
                });
        return false;
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // icon print button click /////////////////////////////////////////////////
    $('#ico_btn_print').click(function() {        
        window.print();
        return false;
    });
    
    // icon close button click /////////////////////////////////////////////////
    $('#ico_btn_close').click(function() {        
        window.open(m_previous_url, '_self');
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // file upload button click ////////////////////////////////////////////////
    $('#btn_file_upload').click(function() {
        if (!mainAttachmentFileValidation()) {
            $('.fileinput').fileinput('clear');
            return false;
        }
        
        startSpinning("spinner_loader_main", "spinner_img_main");
        setTimeout(function() {
            if (!insertMrktAttachment()) {
                stopSpinning("spinner_loader_main", "spinner_img_main");
                return false;
            }
            
            getTransactions();
            stopSpinning("spinner_loader_main", "spinner_img_main");
        }, 1500);
        
        return false;
    });
    
    // file download button click //////////////////////////////////////////////
    $(document).on('click', '[id^="btn_file_download_"]', function() {
        var mrkt_attachment_id = $(this).attr('id').replace("btn_file_download_", "");
        var result = new Array();
        result = db_getMrktAttachmentByID(mrkt_attachment_id);
        
        if (result.length === 1) {
            var site_url = window.location.href.replace("mrktPrintView.html", "attach_files/");
            var file_link_name = result[0]['FileLinkName'];
            window.open(site_url + file_link_name, '_blank');
            return false;
        }
        return false;
    });
    
    // file delete button click ////////////////////////////////////////////////
    $(document).on('click', '[id^="btn_file_delete_"]', function() {
        var mrkt_attachment_id = $(this).attr('id').replace("btn_file_delete_", "");
        
        swal({ title: "Are you sure?",
               text: "You will not be able to recover this attached file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false },
               function() {
                    var result = new Array();
                    result = db_getMrktAttachmentByID(mrkt_attachment_id);
                    if (result.length === 1) {
                        if (!deleteMrktAttachment(mrkt_attachment_id)) {
                            return false;
                        }
                        if (!deleteMrktAttachmentFile(result[0]['FileLinkName'])) {
                            return false;
                        }
                        if (!insertTransaction(getAttachmentChange(result[0]['FileName'], "Attached file has been deleted"))) {
                            return false;
                        }
                        
                        $('#mrkt_attachment_id_' + mrkt_attachment_id).remove();                        
                        if($('#req_file_view_section').is(':empty')) {
                            $('#req_file_view_section').hide();
                        }
                        else {
                            $('#req_file_view_section').show();
                        }
                        swal("Deleted!", "Your attached file has been deleted.", "success"); 
                        
                        getTransactions();
                        return false;
                    }
                }
            );
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // qty field change event //////////////////////////////////////////////////
    $('.ivcmarkt_qty_data').change(function() {
        var input_data = Number($(this).val().replace(/[^0-9\.]/g, ''));
        input_data = Math.abs(input_data);
        input_data = Math.floor(input_data);
        if (input_data === 0) {
            $(this).val("");
        }
        else {
            $(this).val(input_data);
        }
        return false;
    });
    
    // print categories checkbox click event ///////////////////////////////////
    $('#ckb_prt_ad').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_ad').is(':checked')) {
            $('#prt_ad_section').show();
        }
        else {
            $('#prt_ad_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_brochure').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_brochure').is(':checked')) {
            $('#prt_brochure_section').show();
        }
        else {
            $('#prt_brochure_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_banner').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_banner').is(':checked')) {
            $('#prt_banner_section').show();
        }
        else {
            $('#prt_banner_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_flyer').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_flyer').is(':checked')) {
            $('#prt_flyer_section').show();
        }
        else {
            $('#prt_flyer_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_certificate').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_certificate').is(':checked')) {
            $('#prt_certificate_section').show();
        }
        else {
            $('#prt_certificate_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_postcard').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_postcard').is(':checked')) {
            $('#prt_postcard_section').show();
        }
        else {
            $('#prt_postcard_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////
    $('#ckb_prt_poster').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_poster').is(':checked')) {
            $('#prt_poster_section').show();
        }
        else {
            $('#prt_poster_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_pst_11_17').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_pst_11_17').is(':checked')) {
            $('#prt_pst_11_17_qty').attr('data-validation', 'number');
        }
        else {
            $('#prt_pst_11_17_qty').attr('data-validation', '');
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_pst_22_28').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_pst_22_28').is(':checked')) {
            $('#prt_pst_22_28_qty').attr('data-validation', 'number');
        }
        else {
            $('#prt_pst_22_28_qty').attr('data-validation', '');
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_pst_other').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_pst_other').is(':checked')) {
            $('#prt_pst_other_qty').attr('data-validation', 'number');
            $('#prt_pst_other_size').attr('data-validation', 'required');
        }
        else {
            $('#prt_pst_other_qty').attr('data-validation', '');
            $('#prt_pst_other_size').attr('data-validation', '');
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    ////////////////////////////////////////////////////////////////////////////
    
    $('#ckb_prt_program').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_program').is(':checked')) {
            $('#prt_program_section').show();
        }
        else {
            $('#prt_program_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_other').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_other').is(':checked')) {
            $('#prt_other_section').show();
        }
        else {
            $('#prt_other_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_prt_web_graphic').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_prt_web_graphic').is(':checked')) {
            $('#prt_web_graphic_section').show();
        }
        else {
            $('#prt_web_graphic_section').hide();
        }
        $('#print_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    // social media categories checkbox click event ////////////////////////////
    $('#ckb_mda_collegewide_email').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_mda_collegewide_email').is(':checked')) {
            $('#mda_collegewide_email_section').show();
        }
        else {
            $('#mda_collegewide_email_section').hide();
        }
        $('#media_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_mda_sherpa_email').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_mda_sherpa_email').is(':checked')) {
            $('#mda_sherpa_email_section').show();
        }
        else {
            $('#mda_sherpa_email_section').hide();
        }
        $('#media_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_mda_monitor').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        $('#mda_monitor_start_date').data("DateTimePicker").date(null);
        $('#mda_monitor_end_date').data("DateTimePicker").date(null);
        if ($('#ckb_mda_monitor').is(':checked')) {
            $('#mda_monitor_section').show();
        }
        else {
            $('#mda_monitor_section').hide();
        }
        $('#media_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_mda_social_media').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        $('#mda_soc_media_date').data("DateTimePicker").date(null);
        if ($('#ckb_mda_social_media').is(':checked')) {
            $('#mda_social_media_section').show();
        }
        else {
            $('#mda_social_media_section').hide();
        }
        $('#media_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_mda_college_entrance').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        $('#mda_college_entrance_start_date').data("DateTimePicker").date(null);
        $('#mda_college_entrance_end_date').data("DateTimePicker").date(null);
        if ($('#ckb_mda_college_entrance').is(':checked')) {
            $('#mda_college_entrance_section').show();
        }
        else {
            $('#mda_college_entrance_section').hide();
        }
        $('#media_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    // web services checkbox click event ///////////////////////////////////////
    $('#ckb_web_create_new').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        $('#web_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_web_update_existing').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_web_update_existing').is(':checked')) {
            $('#web_update_existing_section').show();
        }
        else {
            $('#web_update_existing_section').hide();
        }
        $('#web_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_web_add_page').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_web_add_page').is(':checked')) {
            $('#web_add_page_section').show();
        }
        else {
            $('#web_add_page_section').hide();
        }
        $('#web_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_web_request_website').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        $('#web_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_web_report_problem').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        $('#web_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    // video categories checkbox click event ///////////////////////////////////
    $('#ckb_vdo_filming_request').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        $('#vdo_filming_date').data("DateTimePicker").date(null);
        $('#vdo_filming_time').find('input').val(null);
        if ($('#ckb_vdo_filming_request').is(':checked')) {
            $('#vdo_filming_request_section').show();
        }
        else {
            $('#vdo_filming_request_section').hide();
        }
        $('#video_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_vdo_other').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        if ($('#ckb_vdo_other').is(':checked')) {
            $('#vdo_other_section').show();
        }
        else {
            $('#vdo_other_section').hide();
        }
        $('#video_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    // editorial categories checkbox click event ///////////////////////////////
    $('#ckb_edt_copywriting').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        $('#edt_copywriting_date_needed').data("DateTimePicker").date(null);
        if ($('#ckb_edt_copywriting').is(':checked')) {
            $('#edt_copywriting_date_needed').data("DateTimePicker").enable();
            $('#edt_copywriting_icon').addClass('ivcmrkt-bk-color-white');
            $('#edt_copywriting_date_needed').find('input').attr('data-validation', 'date');
        }
        else {
            $('#edt_copywriting_date_needed').data("DateTimePicker").disable();
            $('#edt_copywriting_icon').removeClass('ivcmrkt-bk-color-white');
            $('#edt_copywriting_date_needed').find('input').attr('data-validation', '');
        }
        $('#editorial_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    $('#ckb_edt_proofreading').on('ifChanged', function() {
        var tempScrollTop = $(window).scrollTop();
        $('#edt_proofreading_date_needed').data("DateTimePicker").date(null);
        if ($('#ckb_edt_proofreading').is(':checked')) {
            $('#edt_proofreading_date_needed').data("DateTimePicker").enable();
            $('#edt_proofreading_icon').addClass('ivcmrkt-bk-color-white');
            $('#edt_proofreading_date_needed').find('input').attr('data-validation', 'date');
        }
        else {
            $('#edt_proofreading_date_needed').data("DateTimePicker").disable();
            $('#edt_proofreading_icon').removeClass('ivcmrkt-bk-color-white');
            $('#edt_proofreading_date_needed').find('input').attr('data-validation', '');
        }
        $('#editorial_form_validation').isValid();
        $(window).scrollTop(tempScrollTop);
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // print/graphic section save button click /////////////////////////////////
    $('#btn_save_prt_section').click(function(e) {
        e.preventDefault();
        if(!$('#print_form_validation').isValid()) {
            swal({title: "Error", text: "Please fill out all required field(s)", type: "error"});
            return false;
        }
        
        startSpinning("spinner_loader_print", "spinner_img_print");
        setTimeout(function() {
            if (!updatePrintTaskSection()) {
                stopSpinning("spinner_loader_print", "spinner_img_print");
                return false;
            }
            if (mrkt_print_log !== "") {
                if (!insertTransaction("PRINT/GRAPHICS field(s) has been updated\n" + mrkt_print_log.slice(0, -1))) {
                    stopSpinning("spinner_loader_print", "spinner_img_print");
                    return false;
                }
                getTransactions();
            }
            clearHiddenMrktPrintSection();
            getMrktPrint();

            stopSpinning("spinner_loader_print", "spinner_img_print");
            swal("Saved!", "PRINT/GRAPHICS section has been saved", "success");
        }, 1500);

        return false;
    });
    
    // photograph section save button click ////////////////////////////////////
    $('#btn_save_pht_section').click(function(e) {
        e.preventDefault();
        if(!$('#photo_form_validation').isValid()) {
            swal({title: "Error", text: "Please fill out all required field(s)", type: "error"});
            return false;
        }
        
        startSpinning("spinner_loader_photo", "spinner_img_photo");
        setTimeout(function() {
            if (!updatePhotographyTaskSection()) {
                stopSpinning("spinner_loader_photo", "spinner_img_photo");
                return false;
            }
            if (mrkt_photo_log !== "") {
                if (!insertTransaction("PHOTOGRAPHY field(s) has been updated\n" + mrkt_photo_log.slice(0, -1))) {
                    stopSpinning("spinner_loader_photo", "spinner_img_photo");
                    return false;
                }
                getTransactions();
            }
            getMrktPhoto();
            
            stopSpinning("spinner_loader_photo", "spinner_img_photo");
            swal("Saved!", "PHOTOGRAHPY section has been saved", "success");
        }, 1500);

        return false;
    });
    
    // social media section save button click //////////////////////////////////
    $('#btn_save_mda_section').click(function(e) {
        e.preventDefault();
        if(!$('#media_form_validation').isValid()) {
            swal({title: "Error", text: "Please fill out all required field(s)", type: "error"});
            return false;
        }
        
        startSpinning("spinner_loader_media", "spinner_img_media");
        setTimeout(function() {
            if (!updateSocialMediaTaskSection()) {
                stopSpinning("spinner_loader_media", "spinner_img_media");
                return false;
            }
            if (mrkt_media_log !== "") {
                if (!insertTransaction("SOCIAL MEDIA/PUBLICITY field(s) has been updated\n" + mrkt_media_log.slice(0, -1))) {
                    stopSpinning("spinner_loader_media", "spinner_img_media");
                    return false;
                }
                getTransactions();
            }
            clearHiddenMrktMediaSection();
            getMrktMedia();
            
            stopSpinning("spinner_loader_media", "spinner_img_media");
            swal("Saved!", "SOCIAL MEDIA/PUBLICITY section has been saved", "success");
        }, 1500);

        return false;
    });
    
    // web section save button click ///////////////////////////////////////////
    $('#btn_save_web_section').click(function(e) {
        e.preventDefault();
        if(!$('#web_form_validation').isValid()) {
            swal({title: "Error", text: "Please fill out all required field(s)", type: "error"});
            return false;
        }
        
        startSpinning("spinner_loader_web", "spinner_img_web");
        setTimeout(function() {
            if (!updateWebTaskSection()) {
                stopSpinning("spinner_loader_web", "spinner_img_web");
                return false;
            }
            if (mrkt_web_log !== "") {
                if (!insertTransaction("WEB SERVICES field(s) has been updated\n" + mrkt_web_log.slice(0, -1))) {
                    stopSpinning("spinner_loader_web", "spinner_img_web");
                    return false;
                }
                getTransactions();
            }
            clearHiddenMrktWebSection();
            getMrktWeb();
            
            stopSpinning("spinner_loader_web", "spinner_img_web");
            swal("Saved!", "WEB SERVICES section has been saved", "success");
        }, 1500);

        return false;
    });
    
    // video section save button click /////////////////////////////////////////
    $('#btn_save_vdo_section').click(function(e) {
        e.preventDefault();
        if(!$('#video_form_validation').isValid()) {
            swal({title: "Error", text: "Please fill out all required field(s)", type: "error"});
            return false;
        }
        
        startSpinning("spinner_loader_video", "spinner_img_video");
        setTimeout(function() {
            if (!updateVideoTaskSection()) {
                stopSpinning("spinner_loader_video", "spinner_img_video");
                return false;
            }
            if (mrkt_video_log !== "") {
                if (!insertTransaction("VIDEO field(s) has been updated\n" + mrkt_video_log.slice(0, -1))) {
                    stopSpinning("spinner_loader_video", "spinner_img_video");
                    return false;
                }
                getTransactions();
            }
            clearHiddenMrktVideoSection();
            getMrktVideo();
            
            stopSpinning("spinner_loader_video", "spinner_img_video");
            swal("Saved!", "VIDEO section has been saved", "success");
        }, 1500);

        return false;
    });
    
    // editorial section save button click /////////////////////////////////////
    $('#btn_save_edt_section').click(function(e) {
        e.preventDefault();
        if(!$('#editorial_form_validation').isValid()) {
            swal({title: "Error", text: "Please fill out all required field(s)", type: "error"});
            return false;
        }
        
        startSpinning("spinner_loader_editorial", "spinner_img_editorial");
        setTimeout(function() {
            if (!updateEditorialTaskSection()) {
                stopSpinning("spinner_loader_editorial", "spinner_img_editorial");
                return false;
            }
            if (mrkt_editorial_log !== "") {
                if (!insertTransaction("EDITORIAL SERVICES field(s) has been updated\n" + mrkt_editorial_log.slice(0, -1))) {
                    stopSpinning("spinner_loader_editorial", "spinner_img_editorial");
                    return false;
                }
                getTransactions();
            }
            getMrktEditorial();
            
            stopSpinning("spinner_loader_editorial", "spinner_img_editorial");
            swal("Saved!", "EDITORIAL SERVICES section has been saved", "success");
        }, 1500);

        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - MRKT Staff Print View<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
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
    m_table = $('#tbl_process_log_list').DataTable({ paging: false, bInfo: false, searching: false, bSort: false,
                                                        columnDefs: [{ render: function (data) { return data.replace(/\n/g, "<br/>"); }, targets: 3 }]
                                                    });
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
function startSpinning(spinner_loader, spinner_image) {
    $('.content-wrap').css('opacity', '0.5');
    $('#' + spinner_image).addClass('preloader__spinner');
    $('#' + spinner_loader).show();
}

function stopSpinning(spinner_loader, spinner_image) {
    $('.content-wrap').css('opacity', '1');
    $('#' + spinner_image).removeClass('preloader__spinner');
    $('#' + spinner_loader).hide();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setActiveNavMenu() {
    if (sessionStorage.getItem('ss_mrkt_referrer') === "adminNewList.html") {
        m_previous_url = "adminNewList.html";
        $('#home_icon').removeClass('ivcmarkt_active_color');
        $('#nav_sidebar_mrkt_staff').addClass('active');
        $('#sidebar-mrkt-staff').addClass('in');
        $('#nav_mrkt_staff_new').addClass('active');
    }
    else if (sessionStorage.getItem('ss_mrkt_referrer') === "adminProjectList.html") {
        m_previous_url = "adminProjectList.html";
        $('#home_icon').removeClass('ivcmarkt_active_color');
        $('#nav_sidebar_mrkt_staff').addClass('active');
        $('#sidebar-mrkt-staff').addClass('in');
        $('#nav_mrkt_staff_req').addClass('active');
    }
    else if (sessionStorage.getItem('ss_mrkt_referrer') === "adminCompleteList.html") {
        m_previous_url = "adminCompleteList.html";
        $('#home_icon').removeClass('ivcmarkt_active_color');
        $('#nav_sidebar_mrkt_staff').addClass('active');
        $('#sidebar-mrkt-staff').addClass('in');
        $('#nav_mrkt_staff_com').addClass('active');
    }
    else if (sessionStorage.getItem('ss_mrkt_referrer') === "rptMyHistoryList.html") {
        m_previous_url = "rptMyHistoryList.html";
        $('#home_icon').removeClass('ivcmarkt_active_color');
        $('#nav_sidebar_reports').addClass('active');
        $('#sidebar-reports').addClass('in');
        $('#nav_rpt_my_history').addClass('active');
    }
    else {
        m_previous_url = "home.html";
    }
}

function setUserAccessView() {
    var privilege = userRole.getActiveAdminPrivilege(m_obj_User.AdminPrivilegeID);
    if (privilege === "Master") {
        m_administrator = true;
        $('#nav_sidebar_mrkt_staff').show();
        $('#nav_sidebar_system').show();
        $('#nav_sidebar_sys_access_level').show();
        $('#nav_sidebar_sys_task').show();
        $('#master_status_section').show();
    }
    else if (privilege === "Administrator") {
        m_administrator = true;
        $('#nav_sidebar_mrkt_staff').show();
        $('#nav_sidebar_system').show();
    }
    else if (privilege === "Staff") {
        $('#nav_sidebar_mrkt_staff').show();
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

function getMrktRequestID() {
    mrkt_request_id = sessionStorage.getItem('ss_mrkt_request_id');
    if (mrkt_request_id === null) {
        var str_msg = "DB system error GET MRKT_REQUEST";
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setAdminTaskStaffAssign() {
    if (m_administrator) {
        $('#administrator_section').show();
    }
}

function setTaskStaffStatus() {
    if (m_task_staff) {        
        $('#task_staff_section').show();
        if (m_task_staff && m_administrator) {
            $('#ckb_admin_show_task_staff').iCheck('check');
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMrktProcessLog() {    
    var result = new Array();
    result = db_getMrktProcessLogDataTable(mrkt_request_id);
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getPrintTaskStaffListActive() {
    var result = new Array();
    result = db_getTaskStaffListByTaskActive(2);
    
    $('#print_task_staff_list').empty();
    var html = "<option value='0'>Unassigned</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AdminID']  + "'>" + result[i]['AdminName'] + "</option>";
    }
    $('#print_task_staff_list').append(html);
}

function getPhotoTaskStaffListActive() {
    var result = new Array();
    result = db_getTaskStaffListByTaskActive(3);
    
    $('#photo_task_staff_list').empty();
    var html = "<option value='0'>Unassigned</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AdminID']  + "'>" + result[i]['AdminName'] + "</option>";
    }
    $('#photo_task_staff_list').append(html);
}

function getMediaTaskStaffListActive() {
    var result = new Array();
    result = db_getTaskStaffListByTaskActive(4);
    
    $('#media_task_staff_list').empty();
    var html = "<option value='0'>Unassigned</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AdminID']  + "'>" + result[i]['AdminName'] + "</option>";
    }
    $('#media_task_staff_list').append(html);
}

function getWebTaskStaffListActive() {
    var result = new Array();
    result = db_getTaskStaffListByTaskActive(5);
    
    $('#web_task_staff_list').empty();
    var html = "<option value='0'>Unassigned</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AdminID']  + "'>" + result[i]['AdminName'] + "</option>";
    }
    $('#web_task_staff_list').append(html);
}

function getVideoTaskStaffListActive() {
    var result = new Array();
    result = db_getTaskStaffListByTaskActive(6);
    
    $('#video_task_staff_list').empty();
    var html = "<option value='0'>Unassigned</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AdminID']  + "'>" + result[i]['AdminName'] + "</option>";
    }
    $('#video_task_staff_list').append(html);
}

function getEditorialTaskStaffListActive() {
    var result = new Array();
    result = db_getTaskStaffListByTaskActive(7);
    
    $('#editorial_task_staff_list').empty();
    var html = "<option value='0'>Unassigned</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AdminID']  + "'>" + result[i]['AdminName'] + "</option>";
    }
    $('#editorial_task_staff_list').append(html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTaskStatusListActive() {
    var result = new Array();
    result = db_getStatusListActive();
    
    $('#mrkt_req_status_list').empty();
    $('#task_print_status_list').empty();
    $('#task_photo_status_list').empty();
    $('#task_media_status_list').empty();
    $('#task_web_status_list').empty();
    $('#task_video_status_list').empty();
    $('#task_editorial_status_list').empty();
    
    var html_admin = "<option value='0'>Unassigned</option>";
    var html_task = "";
    for (var i = 0; i < result.length; i++) {
        if (result[i]['StatusID'] === status_draft_id) {
            continue;
        }
        
        if (result[i]['StatusID'] === status_task_partially_assigned_id || result[i]['StatusID'] === status_submitted_id) {
            html_admin += "<option value='" + result[i]['StatusID']  + "'>" + result[i]['Status'] + "</option>";
            continue;
        }
        else {
            html_admin += "<option value='" + result[i]['StatusID']  + "'>" + result[i]['Status'] + "</option>";
            html_task += "<option value='" + result[i]['StatusID']  + "'>" + result[i]['Status'] + "</option>";
        }
    }
    
    $('#mrkt_req_status_list').append(html_admin);
    $('#task_print_status_list').append(html_task);
    $('#task_photo_status_list').append(html_task);
    $('#task_media_status_list').append(html_task);
    $('#task_web_status_list').append(html_task);
    $('#task_video_status_list').append(html_task);
    $('#task_editorial_status_list').append(html_task);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMrktRequest() {
    $('#requestor_information').append(' - ID: ' + mrkt_request_id);
    var result = new Array();
    result = db_getMrktRequestByID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#mrkt_req_status_list').val(result[0]['StatusID']);
        $('#req_name').html(result[0]['Requestor']);
        $('#req_email').html(result[0]['ReqEmail']);
        $('#req_phone').html(result[0]['ReqPhone']);
        $('#req_depart').html(result[0]['ReqDepart']);
        $('#req_date').html(moment(result[0]['ReqDate']).format('MM/DD/YYYY'));
        $('#req_title').html(result[0]['ReqTitle']);
        $('#req_descrip').html(result[0]['Description'].replace(/\n/g, "<br/>"));
        
        setMrktAttachmentEditable();
        getMrktAttachment();
        if (m_task_staff || m_administrator) {
            $('#req_file_upload_section').show();
        }  
    }
}

function setMrktAttachmentEditable() {
    var result = new Array();
    result = db_getMrktTaskByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (result[0]['ckbMrktPrint'] === "1") {
            var result_print = new Array();
            result_print = db_getMrktPrintByReqID(mrkt_request_id);
            if (m_obj_User.AdminID === result_print[0]['AdminID']) {
                m_task_staff = true;
                return;
            }
        }
        if (result[0]['ckbMrktPhoto'] === "1") {
            var result_photo = new Array();
            result_photo = db_getMrktPhotoByReqID(mrkt_request_id);
            if (m_obj_User.AdminID === result_photo[0]['AdminID']) {
                m_task_staff = true;
                return;
            }
        }
        if (result[0]['ckbMrktMedia'] === "1") {
            var result_media = new Array();
            result_media = db_getMrktMediaByReqID(mrkt_request_id);
            if (m_obj_User.AdminID === result_media[0]['AdminID']) {
                m_task_staff = true;
                return;
            }
        }
        if (result[0]['ckbMrktWeb'] === "1") {
            var result_web = new Array();
            result_web = db_getMrktWebByReqID(mrkt_request_id);
            if (m_obj_User.AdminID === result_web[0]['AdminID']) {
                m_task_staff = true;
                return;
            }
        }
        if (result[0]['ckbMrktVideo'] === "1") {
            var result_video = new Array();
            result_video = db_getMrktVideoByReqID(mrkt_request_id);
            if (m_obj_User.AdminID === result_video[0]['AdminID']) {
                m_task_staff = true;
                return;
            }
        }
        if (result[0]['ckbMrktEditorial'] === "1") {
            var result_editorial = new Array();
            result_editorial = db_getMrktEditorialByReqID(mrkt_request_id);
            if (m_obj_User.AdminID === result_editorial[0]['AdminID']) {
                m_task_staff = true;
                return;
            }
        }
    }
    
    return;
}

function getMrktAttachment() {
    var result = new Array();
    result = db_getMrktAttachmentByReqID(mrkt_request_id);
    if (result.length > 0) {
        $('#req_file_view_section').empty();
        var html = "";
        for (var i = 0; i < result.length; i++) {
            if (m_task_staff || m_administrator) {
                html += setMrktAttachmentHTMLEdit(result[i]['MrktAttachmentID'], result[i]['FileName']);
            }
            else {
                html += setMrktAttachmentHTMLView(result[i]['MrktAttachmentID'], result[i]['FileName']);
            }
        }
        $('#req_file_view_section').append(html);
        $('#req_file_view_section').show();
    }
}

function setMrktAttachmentHTMLView(mrkt_attachment_id, file_name) {
    var str_html = "<div class='form-group' id='mrkt_attachment_id_" + mrkt_attachment_id + "'>";
    str_html += "<div class='col-sm-6 col-sm-offset-4'>";
    str_html += "<p class='form-control'>" + file_name + "</p>";
    str_html += "</div>";
    str_html += "<div class='col-sm-1'>";
    str_html += "<button class='col-sm-12 btn btn-info' id='btn_file_download_" + mrkt_attachment_id + "'><i class='iconic iconic-sm iconic-data-transfer-download'></i></button>";
    str_html += "</div>";
    str_html += "</div>";
    return str_html;
}

function setMrktAttachmentHTMLEdit(mrkt_attachment_id, file_name) {
    var str_html = "<div class='form-group' id='mrkt_attachment_id_" + mrkt_attachment_id + "'>";
    str_html += "<div class='col-sm-5 col-sm-offset-4'>";
    str_html += "<p class='form-control ivcmrkt-text-area-view'>" + file_name + "</p>";
    str_html += "</div>";
    str_html += "<div class='col-md-1'>";
    str_html += "<button class='col-sm-12 btn btn-info' id='btn_file_download_" + mrkt_attachment_id + "'><i class='iconic iconic-sm iconic-data-transfer-download'></i></button>";
    str_html += "</div>";
    str_html += "<div class='col-md-1'>";
    str_html += "<button class='col-sm-12 btn btn-danger' id='btn_file_delete_" + mrkt_attachment_id + "'><i class='iconic iconic-sm iconic-trash'></i></button>";
    str_html += "</div>";
    str_html += "</div>";
    return str_html;
}

function getMrktTask() {
    var result = new Array();
    result = db_getMrktTaskByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (result[0]['ckbMrktPrint'] === "1") {
            $('#admin_task_assig_print').show();
            if (m_administrator) {
                $('#task_print_status_section').show();
            }
            getPrintTaskStaffListActive();
            
            $("#ckb_main_print").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_print_section').show();
            getMrktPrint();
        }
        else {
            $("#ckb_main_print").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktPhoto'] === "1") {
            $('#admin_task_assig_photo').show();
            if (m_administrator) {
                $('#task_photo_status_section').show();
            }
            getPhotoTaskStaffListActive();
            
            $("#ckb_main_photo").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_photo_section').show();
            getMrktPhoto();
        }
        else {
            $("#ckb_main_photo").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktMedia'] === "1") {
            $('#admin_task_assig_media').show();
            if (m_administrator) {
                $('#task_media_status_section').show();
            }
            getMediaTaskStaffListActive();
            
            $("#ckb_main_media").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_media_section').show();
            getMrktMedia();
        }
        else {
            $("#ckb_main_media").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktWeb'] === "1") {
            $('#admin_task_assig_web').show();
            if (m_administrator) {
                $('#task_web_status_section').show();
            }
            getWebTaskStaffListActive();
            
            $("#ckb_main_web").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_web_section').show();
            getMrktWeb();
        }
        else {
            $("#ckb_main_web").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktVideo'] === "1") {
            $('#admin_task_assig_video').show();
            if (m_administrator) {
                $('#task_video_status_section').show();
            }
            getVideoTaskStaffListActive();
            
            $("#ckb_main_video").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_video_section').show();
            getMrktVideo();
        }
        else {
            $("#ckb_main_video").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktEditorial'] === "1") {
            $('#admin_task_assig_editorial').show();
            if (m_administrator) {
                $('#task_editorial_status_section').show();
            }
            getEditorialTaskStaffListActive();
            
            $("#ckb_main_editorial").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_editorial_section').show();
            getMrktEditorial();
            $('#editorial_form_validation').isValid();
        }
        else {
            $("#ckb_main_editorial").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
    }
}

function getMrktPrint() {
    var result = new Array();
    result = db_getMrktPrintByReqID(mrkt_request_id);
        
    if (result.length === 1) {   
        mrkt_print_id = result[0]['MrktPrintID'];
        mrkt_print_admin_id = result[0]['AdminID'];
        mrkt_print_status_id = result[0]['StatusID'];
        
        $('#print_task_staff_list').val(result[0]['AdminID']);
        $('#task_print_status_list').val(result[0]['StatusID']);
        getMrktPrintFileAttachment(result[0]['StatusID']);
        
        if (m_obj_User.AdminID === result[0]['AdminID'] || m_administrator) {
            $('#task_print_status_section').show();
            $('#print_form_validation').show();
            
            objPre_Print_Param.resetParams();
            $('#prt_date_need').data("DateTimePicker").date(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
            objPre_Print_Param.set_PrtDateNeeded(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));

            if (result[0]['ckb_prt_ad'] === "1") {
                $('#ckb_prt_ad').iCheck('check');
                $('#prt_ad_section').show();
                objPre_Print_Param.set_ckbPrtAd(true);
                getMrktPrintAd(false);
            }
            if (result[0]['ckb_prt_brochure'] === "1") {
                $('#ckb_prt_brochure').iCheck('check');
                $('#prt_brochure_section').show();
                objPre_Print_Param.set_ckbPrtBrochure(true);
                getMrktPrintBrochure(false);
            }
            if (result[0]['ckb_prt_banner'] === "1") {
                $('#ckb_prt_banner').iCheck('check');
                $('#prt_banner_section').show();
                objPre_Print_Param.set_ckbPrtBanner(true);
                getMrktPrintBanner(false);
            }
            if (result[0]['ckb_prt_flyer'] === "1") {
                $('#ckb_prt_flyer').iCheck('check');
                $('#prt_flyer_section').show();
                objPre_Print_Param.set_ckbPrtFlyer(true);
                getMrktPrintFlyer(false);
            }
            if (result[0]['ckb_prt_certificate'] === "1") {
                $('#ckb_prt_certificate').iCheck('check');
                $('#prt_certificate_section').show();
                objPre_Print_Param.set_ckbPrtCertificate(true);
                getMrktPrintCert(false);
            }
            if (result[0]['ckb_prt_postcard'] === "1") {
                $('#ckb_prt_postcard').iCheck('check');
                $('#prt_postcard_section').show();
                objPre_Print_Param.set_ckbPrtPostcard(true);
                getMrktPrintPostCard(false);
            }
            if (result[0]['ckb_prt_poster'] === "1") {
                $('#ckb_prt_poster').iCheck('check');
                $('#prt_poster_section').show();
                objPre_Print_Param.set_ckbPrtPoster(true);
                getMrktPrintPoster(false);
            }
            if (result[0]['ckb_prt_program'] === "1") {
                $('#ckb_prt_program').iCheck('check');
                $('#prt_program_section').show();
                objPre_Print_Param.set_ckbPrtProgram(true);
                getMrktPrintProgram(false);
            }
            if (result[0]['ckb_prt_other'] === "1") {
                $('#ckb_prt_other').iCheck('check');
                $('#prt_other_section').show();
                objPre_Print_Param.set_ckbPrtOther(true);
                getMrktPrintOther(false);
            }
            if (result[0]['ckb_prt_web_graphic'] === "1") {
                $('#ckb_prt_web_graphic').iCheck('check');
                $('#prt_web_graphic_section').show();
                objPre_Print_Param.set_ckbPrtWebGraphic(true);
                getMrktPrintWGraphic(false);
            }
            $('#print_form_validation').isValid();
        }
        else {  
            $('#print_form_view_only').show();
            
            $('#prt_date_need_view').html(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
            if (result[0]['ckb_prt_ad'] === "1") {
                $("#ckb_prt_ad_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_ad_section_view').show();
                getMrktPrintAd(true);
            }
            else {
                $("#ckb_prt_ad_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_brochure'] === "1") {
                $("#ckb_prt_brochure_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");       
                $('#prt_brochure_section_view').show();
                getMrktPrintBrochure(true);
            }
            else {
                $("#ckb_prt_brochure_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_banner'] === "1") {
                $("#ckb_prt_banner_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_banner_section_view').show();
                getMrktPrintBanner(true);
            }
            else {
                $("#ckb_prt_banner_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_flyer'] === "1") {
                $("#ckb_prt_flyer_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_flyer_section_view').show();
                getMrktPrintFlyer(true);
            }
            else {
                $("#ckb_prt_flyer_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_certificate'] === "1") {
                $("#ckb_prt_certificate_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_certificate_section_view').show();
                getMrktPrintCert(true);
            }
            else {
                $("#ckb_prt_certificate_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_postcard'] === "1") {
                $("#ckb_prt_postcard_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_postcard_section_view').show();
                getMrktPrintPostCard(true);
            }
            else {
                $("#ckb_prt_postcard_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_poster'] === "1") {
                $("#ckb_prt_poster_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_poster_section_view').show();
                getMrktPrintPoster(true);
            }
            else {
                $("#ckb_prt_poster_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_program'] === "1") {
                $("#ckb_prt_program_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_program_section_view').show();
                getMrktPrintProgram(true);
            }
            else {
                $("#ckb_prt_program_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_other'] === "1") {
                $("#ckb_prt_other_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_other_section_view').show();
                getMrktPrintOther(true);
            }
            else {
                $("#ckb_prt_other_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_web_graphic'] === "1") {
                $("#ckb_prt_web_graphic_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_web_graphic_section_view').show();
                getMrktPrintWGraphic(true);
            }
            else {
                $("#ckb_prt_web_graphic_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
        }
    }
}

function getMrktPrintAd(view_only) {
    var result = new Array();
    result = db_getMrktPrintAdByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#prt_ad_size_view').html(result[0]['AdSize']);
        }
        else {
            $('#prt_ad_size').val(result[0]['AdSize']);
            objPre_Print_Param.set_PrintAdd_Size(result[0]['AdSize']);
        }
    }
}

function getMrktPrintBrochure(view_only) {
    var result = new Array();
    result = db_getMrktPrintBrochureByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#prt_bro_qty_view').html(result[0]['Qty']);
        }
        else {
            $('#prt_bro_qty').val(result[0]['Qty']);
            objPre_Print_Param.set_PrintBrochureQty(result[0]['Qty']);
        }
    }
}

function getMrktPrintBanner(view_only) {
    var result = new Array();
    result = db_getMrktPrintBannerByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#prt_ban_qty_view').html(result[0]['Qty']);
        }
        else {
            $('#prt_ban_qty').val(result[0]['Qty']);
            objPre_Print_Param.set_PrintBannerQty(result[0]['Qty']);
        }
    }
}

function getMrktPrintFlyer(view_only) {
    var result = new Array();
    result = db_getMrktPrintFlyerByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#prt_fly_qty_view').html(result[0]['Qty']);
        }
        else {
            $('#prt_fly_qty').val(result[0]['Qty']);
            objPre_Print_Param.set_PrintFlyerQty(result[0]['Qty']);
        }
    }
}

function getMrktPrintCert(view_only) {
    var result = new Array();
    result = db_getMrktPrintCertByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#prt_cer_qty_view').html(result[0]['Qty']);
        }
        else {
            $('#prt_cer_qty').val(result[0]['Qty']);
            objPre_Print_Param.set_PrintCertificateQty(result[0]['Qty']);
        }
    }
}

function getMrktPrintPostCard(view_only) {
    var result = new Array();
    result = db_getMrktPrintPostCardByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#prt_pcd_size_view').html(result[0]['Size']);
            $('#prt_pcd_qty_view').html(result[0]['Qty']);
        }
        else {
            $('#prt_pcd_size').val(result[0]['Size']);
            $('#prt_pcd_qty').val(result[0]['Qty']);
            objPre_Print_Param.set_PrintPostcardSize(result[0]['Size']);
            objPre_Print_Param.set_PrintPostcardQty(result[0]['Qty']);
        }
    }
}

function getMrktPrintPoster(view_only) {
    var result = new Array();
    result = db_getMrktPrintPosterByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            if (result[0]['ckb_prt_pst_11_17'] === "1") {
                $("#ckb_prt_pst_11_17_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_pst_11_17_qty_view').html(result[0]['Qty_11_X_17']);
            }
            else {
                $("#ckb_prt_pst_11_17_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_pst_22_28'] === "1") {
                $("#ckb_prt_pst_22_28_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_pst_22_28_qty_view').html(result[0]['Qty_22_X_28']);
            }
            else {
                $("#ckb_prt_pst_22_28_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_prt_pst_other'] === "1") {
                $("#ckb_prt_pst_other_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#prt_pst_other_qty_view').html(result[0]['QtyOther']);
                $('#prt_pst_other_size_view').html(result[0]['SizeOther']);
            }
            else {
                $("#ckb_prt_pst_other_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
        }
        else {
            if (result[0]['ckb_prt_pst_11_17'] === "1") {
                $('#ckb_prt_pst_11_17').iCheck('check');
                $('#prt_pst_11_17_qty').val(result[0]['Qty_11_X_17']);
                objPre_Print_Param.set_PrintPoster_ckb_11_17(true);
                objPre_Print_Param.set_PrintPoster_Qty_11_17(result[0]['Qty_11_X_17']);
            }
            if (result[0]['ckb_prt_pst_22_28'] === "1") {
                $('#ckb_prt_pst_22_28').iCheck('check');
                $('#prt_pst_22_28_qty').val(result[0]['Qty_22_X_28']);
                objPre_Print_Param.set_PrintPoster_ckb_22_28(true);
                objPre_Print_Param.set_PrintPoster_Qty_22_28(result[0]['Qty_22_X_28']);
            }
            if (result[0]['ckb_prt_pst_other'] === "1") {
                $('#ckb_prt_pst_other').iCheck('check');
                $('#prt_pst_other_qty').val(result[0]['QtyOther']);
                $('#prt_pst_other_size').val(result[0]['SizeOther']);
                objPre_Print_Param.set_PrintPoster_ckb_other(true);
                objPre_Print_Param.set_PrintPoster_Qty_other(result[0]['QtyOther']);
                objPre_Print_Param.set_PrintPoster_Size_other(result[0]['SizeOther']);
            }
        }
    }
}

function getMrktPrintProgram(view_only) {
    var result = new Array();
    result = db_getMrktPrintProgramByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#prt_prg_qty_view').html(result[0]['Qty']);
        }
        else {
            $('#prt_prg_qty').val(result[0]['Qty']);
            objPre_Print_Param.set_PrintProgramQty(result[0]['Qty']);
        }
    }
}

function getMrktPrintOther(view_only) {
    var result = new Array();
    result = db_getMrktPrintOtherByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#prt_oth_descrip_view').html(result[0]['OtherDescrip']);
        }
        else {
            $('#prt_oth_descrip').val(result[0]['OtherDescrip']);
            objPre_Print_Param.set_PrintOtherDescrip(result[0]['OtherDescrip']);
        }
    }
}

function getMrktPrintWGraphic(view_only) {
    var result = new Array();
    result = db_getMrktPrintWGraphicByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#prt_web_grap_descrip_view').html(result[0]['WebGraphic']);
            $('#prt_web_grap_dimensions_view').html(result[0]['Dimension']);
        }
        else {
            $('#prt_web_grap_descrip').val(result[0]['WebGraphic']);
            $('#prt_web_grap_dimensions').val(result[0]['Dimension']);
            objPre_Print_Param.set_PrintWebGraphic_web_graphic(result[0]['WebGraphic']);
            objPre_Print_Param.set_PrintWebGraphic_Dimension(result[0]['Dimension']);
        }
    }
}

function getMrktPhoto() {
    var result = new Array();
    result = db_getMrktPhotoByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_photo_id = result[0]['MrktPhotoID'];
        mrkt_photo_admin_id = result[0]['AdminID'];
        mrkt_photo_status_id = result[0]['StatusID'];

        $('#photo_task_staff_list').val(result[0]['AdminID']);
        $('#task_photo_status_list').val(result[0]['StatusID']);
        getMrktPhotoFileAttachment(result[0]['StatusID']);
        
        if (m_obj_User.AdminID === result[0]['AdminID'] || m_administrator) {
            $('#task_photo_status_section').show();
            $('#photo_form_validation').show();
            
            objPre_Photo_Param.resetParams();
            $('#pht_event_date').data("DateTimePicker").date(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            $('#pht_event_time').find('input').val(result[0]['EventTime']);
            $('#pht_event_location').val(result[0]['Location']);
            $('#pht_event_estimate_time').val(result[0]['EstimatedTime']);
            objPre_Photo_Param.set_EventDate(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            objPre_Photo_Param.set_EventTime(result[0]['EventTime']);
            objPre_Photo_Param.set_Location(result[0]['Location']);
            objPre_Photo_Param.set_EstimateTime(result[0]['EstimatedTime']);
            
            $('#photo_form_validation').isValid();
        }
        else {
            $('#photo_form_view_only').show();
           
            $('#pht_event_date_view').html(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            $('#pht_event_time_view').html(result[0]['EventTime']);
            $('#pht_event_location_view').html(result[0]['Location']);
            $('#pht_event_estimate_time_view').html(result[0]['EstimatedTime']);
        }  
    }
}

function getMrktMedia() {
    var result = new Array();
    result = db_getMrktMediaByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_media_id = result[0]['MrktMediaID'];
        mrkt_media_admin_id = result[0]['AdminID'];
        mrkt_media_status_id = result[0]['StatusID'];
        
        $('#media_task_staff_list').val(result[0]['AdminID']);
        $('#task_media_status_list').val(result[0]['StatusID']);
        getMrktMediaFileAttachment(result[0]['StatusID']);

        if (m_obj_User.AdminID === result[0]['AdminID'] || m_administrator) {
            $('#task_media_status_section').show();
            $('#media_form_validation').show();
            
            objPre_Media_Param.resetParams();
            $('#mda_due_date').data("DateTimePicker").date(moment(result[0]['DueDate']).format('MM/DD/YYYY'));
            objPre_Media_Param.set_MdaDueDate(moment(result[0]['DueDate']).format('MM/DD/YYYY'));
            if (result[0]['ckb_mda_collegewide_email'] === "1") {
                $('#ckb_mda_collegewide_email').iCheck('check');
                $('#mda_collegewide_email_section').show();
                objPre_Media_Param.set_ckbMdaCollegewideEmail(true);
                getMrktMediaCollege(false);
            }
            if (result[0]['ckb_mda_sherpa_email'] === "1") {
                $('#ckb_mda_sherpa_email').iCheck('check');
                $('#mda_sherpa_email_section').show();
                objPre_Media_Param.set_ckbMdaSherpaEmail(true);
                getMrktMediaSherpa(false);
            }
            if (result[0]['ckb_mda_monitor'] === "1") {
                $('#ckb_mda_monitor').iCheck('check');
                $('#mda_monitor_section').show();
                objPre_Media_Param.set_ckbMdaMonitor(true);
                getMrktMediaMonitor(false);
            }
            if (result[0]['ckb_mda_social_media'] === "1") {
                $('#ckb_mda_social_media').iCheck('check');
                $('#mda_social_media_section').show();
                objPre_Media_Param.set_ckbMdaSocialMedia(true);
                getMrktMediaPost(false);
            }
            if (result[0]['ckb_mda_college_entrance'] === "1") {
                $('#ckb_mda_college_entrance').iCheck('check');
                $('#mda_college_entrance_section').show();
                objPre_Media_Param.set_ckbMdaCollegeEntrance(true);
                getMrktMediaCollegeEntrance(false);
            }
            
            $('#media_form_validation').isValid();
        }
        else {
            $('#media_form_view_only').show();

            $('#mda_due_date_view').html(moment(result[0]['DueDate']).format('MM/DD/YYYY'));
            if (result[0]['ckb_mda_collegewide_email'] === "1") {
                $("#ckb_mda_collegewide_email_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");            
                $('#mda_collegewide_email_section_view').show();
                getMrktMediaCollege(true);
            }
            else {
                $("#ckb_mda_collegewide_email_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_mda_sherpa_email'] === "1") {
                $("#ckb_mda_sherpa_email_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#mda_sherpa_email_section_view').show();
                getMrktMediaSherpa(true);
            }
            else {
                $("#ckb_mda_sherpa_email_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_mda_monitor'] === "1") {
                $("#ckb_mda_monitor_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#mda_monitor_section_view').show();
                getMrktMediaMonitor(true);
            }
            else {
                $("#ckb_mda_monitor_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_mda_social_media'] === "1") {
                $("#ckb_mda_social_media_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#mda_social_media_section_view').show();
                getMrktMediaPost(true);
            }
            else {
                $("#ckb_mda_social_media_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_mda_college_entrance'] === "1") {
                $("#ckb_mda_college_entrance_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#mda_college_entrance_section_view').show();
                getMrktMediaCollegeEntrance(true);
            }
            else {
                $("#ckb_mda_college_entrance_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
        }     
    }
}

function getMrktMediaCollege(view_only) {
    var result = new Array();
    result = db_getMrktMediaCollegeByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (view_only) {
            $('#mda_college_email_view').html(result[0]['CollegeEmail'].replace(/\n/g, "<br/>"));
        }
        else {
            autosize.update($('#mda_college_email').val(result[0]['CollegeEmail']));
            objPre_Media_Param.set_MediaCollege_Email(result[0]['CollegeEmail']);
        }
    }
}

function getMrktMediaSherpa(view_only) {
    var result = new Array();
    result = db_getMrktMediaSherpaByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (view_only) {
            $('#mda_sherpa_email_view').html(result[0]['SherpaEmail'].replace(/\n/g, "<br/>"));
        }
        else {
            autosize.update($('#mda_sherpa_email').val(result[0]['SherpaEmail']));
            objPre_Media_Param.set_MediaSherpa_Email(result[0]['SherpaEmail']);
        }
    }
}

function getMrktMediaMonitor(view_only) {
    var result = new Array();
    result = db_getMrktMediaMonitorByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#mda_monitor_start_date_view').html(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            $('#mda_monitor_end_date_view').html(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
        }
        else {
            $('#mda_monitor_start_date').data("DateTimePicker").date(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            $('#mda_monitor_end_date').data("DateTimePicker").date(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
            objPre_Media_Param.set_MediaMonitor_StartDate(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            objPre_Media_Param.set_MediaMonitor_EndDate(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
        }  
    }
}

function getMrktMediaPost(view_only) {
    var result = new Array();
    result = db_getMrktMediaPostByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (view_only) {
            $('#mda_soc_media_date_view').html(moment(result[0]['PostDate']).format('MM/DD/YYYY'));
        }
        else {
            $('#mda_soc_media_date').data("DateTimePicker").date(moment(result[0]['PostDate']).format('MM/DD/YYYY'));
            objPre_Media_Param.set_MediaPost_PostDate(moment(result[0]['PostDate']).format('MM/DD/YYYY'));
        } 
    }
}

function getMrktMediaCollegeEntrance(view_only) {
    var result = new Array();
    result = db_getMrktMediaEntranceByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (view_only) {
            $('#mda_college_entrance_start_date_view').html(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            $('#mda_college_entrance_end_date_view').html(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
        }
        else {
            $('#mda_college_entrance_start_date').data("DateTimePicker").date(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            $('#mda_college_entrance_end_date').data("DateTimePicker").date(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
            objPre_Media_Param.set_MediaEntrance_StartDate(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            objPre_Media_Param.set_MediaEntrance_EndDate(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
        }
    }
}

function getMrktWeb() {
    var result = new Array();
    result = db_getMrktWebByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_web_id = result[0]['MrktWebID'];
        mrkt_web_admin_id = result[0]['AdminID'];
        mrkt_web_status_id = result[0]['StatusID'];
        
        $('#web_task_staff_list').val(result[0]['AdminID']);
        $('#task_web_status_list').val(result[0]['StatusID']);
        getMrktWebFileAttachment(result[0]['StatusID']);
        
        if (m_obj_User.AdminID === result[0]['AdminID'] || m_administrator) {
            $('#task_web_status_section').show();
            $('#web_form_validation').show();
            
            objPre_Web_Param.resetParams();
            $('#web_date_needed').data("DateTimePicker").date(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
            objPre_Web_Param.set_WebDateNeeded(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
            if (result[0]['ckb_web_create_new'] === "1") {
                $('#ckb_web_create_new').iCheck('check');
                objPre_Web_Param.set_ckbWebCreateNew(true);
            }
            if (result[0]['ckb_web_update_existing'] === "1") {
                $('#ckb_web_update_existing').iCheck('check');
                objPre_Web_Param.set_ckbWebUpdateExisting(true);
            }

            $('#web_update_existing_url').val(result[0]['ckb_web_update_url']);
            objPre_Web_Param.set_ckbWebUpdateUrl(result[0]['ckb_web_update_url']);

            if (result[0]['ckb_web_add_page'] === "1") {
                $('#ckb_web_add_page').iCheck('check');
                objPre_Web_Param.set_ckbWebAddPage(true);
            }

            $('#web_add_page_url').val(result[0]['ckb_web_add_url']);
            objPre_Web_Param.set_ckbWebAddUrl(result[0]['ckb_web_add_url']);

            if (result[0]['ckb_web_request_website'] === "1") {
                $('#ckb_web_request_website').iCheck('check');
                objPre_Web_Param.set_ckbWebRequestWebsite(true);
            }
            if (result[0]['ckb_web_report_problem'] === "1") {
                $('#ckb_web_report_problem').iCheck('check');
                objPre_Web_Param.set_ckbWebReportProblem(true);
            }
            
            $('#web_form_validation').isValid();
        }
        else {
            $('#web_form_view_only').show();
            
            $('#web_date_needed_view').html(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
            if (result[0]['ckb_web_create_new'] === "1") {
                $("#ckb_web_create_new_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            else {
                $("#ckb_web_create_new_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_web_update_existing'] === "1") {
                $("#ckb_web_update_existing_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#web_update_existing_section_view').show();
                if (result[0]['ckb_web_update_url'] === "") {
                    $('#web_update_existing_url_view').removeClass('ivcmrkt-text-area-view');
                }
                $('#web_update_existing_url_view').html(result[0]['ckb_web_update_url']);
            }
            else {
                $("#ckb_web_update_existing_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_web_add_page'] === "1") {
                $("#ckb_web_add_page_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#web_add_page_section_view').show();
                if (result[0]['ckb_web_add_url'] === "") {
                    $('#web_add_page_url_view').removeClass('ivcmrkt-text-area-view');
                }
                $('#web_add_page_url_view').html(result[0]['ckb_web_add_url']);
            }
            else {
                $("#ckb_web_add_page_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_web_request_website'] === "1") {
                $("#ckb_web_request_website_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            else {
                $("#ckb_web_request_website_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_web_report_problem'] === "1") {
                $("#ckb_web_report_problem_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            else {
                $("#ckb_web_report_problem_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
        }   
    }
}

function getMrktVideo() {
    var result = new Array();
    result = db_getMrktVideoByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_video_id = result[0]['MrktVideoID'];
        mrkt_video_admin_id = result[0]['AdminID'];
        mrkt_video_status_id = result[0]['StatusID'];
        
        $('#video_task_staff_list').val(result[0]['AdminID']);
        $('#task_video_status_list').val(result[0]['StatusID']);
        getMrktVideoFileAttachment(result[0]['StatusID']);

        if (m_obj_User.AdminID === result[0]['AdminID'] || m_administrator) {
            $('#task_video_status_section').show();
            $('#video_form_validation').show();
            
            objPre_Video_Param.resetParams();
            $('#vdo_due_date').data("DateTimePicker").date(moment(result[0]['DueDate']).format('MM/DD/YYYY'));
            objPre_Video_Param.set_VdoDueDate(moment(result[0]['DueDate']).format('MM/DD/YYYY'));
            if (result[0]['ckb_vdo_filming_request'] === "1") {
                $('#ckb_vdo_filming_request').iCheck('check');
                $('#vdo_filming_request_section').show();
                objPre_Video_Param.set_ckbVdoFilmingRequest(true);
                getMrktVideoFilming(false);
            }
            if (result[0]['ckb_vdo_other'] === "1") {
                $('#ckb_vdo_other').iCheck('check');
                $('#vdo_other_section').show();
                objPre_Video_Param.set_ckbVdoOther(true);
                getMrktVideoOther(false);
            }
            
            $('#video_form_validation').isValid();
        }
        else {
            $('#video_form_view_only').show();

            $('#vdo_due_date_view').html(moment(result[0]['DueDate']).format('MM/DD/YYYY'));
            if (result[0]['ckb_vdo_filming_request'] === "1") {
                $("#ckb_vdo_filming_request_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#vdo_filming_request_section_view').show();
                getMrktVideoFilming(true);
            }
            else {
                $("#ckb_vdo_filming_request_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_vdo_other'] === "1") {
                $("#ckb_vdo_other_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#vdo_other_section_view').show();
                getMrktVideoOther(true);
            }
            else {
                $("#ckb_vdo_other_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
        }
    }
}

function getMrktVideoFilming(view_only) {
    var result = new Array();
    result = db_getMrktVideoFilmingByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (view_only) {
            $('#vdo_filming_date_view').html(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            $('#vdo_filming_time_view').html(result[0]['EventTime']);
            $('#vdo_filming_location_view').html(result[0]['Location']);   
            $('#vdo_filming_purpose_view').html(result[0]['Purpose'].replace(/\n/g, "<br/>"));
            $('#vdo_filming_estimate_time_view').html(result[0]['EstimatedTime']);
        }
        else {
            $('#vdo_filming_date').data("DateTimePicker").date(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            $('#vdo_filming_time').find('input').val(result[0]['EventTime']);
            $('#vdo_filming_location').val(result[0]['Location']);        
            autosize.update($('#vdo_filming_purpose').val(result[0]['Purpose']));
            $('#vdo_filming_estimate_time').val(result[0]['EstimatedTime']);
            objPre_Video_Param.set_VideoFilming_EventDate(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            objPre_Video_Param.set_VideoFilming_EventTime(result[0]['EventTime']);
            objPre_Video_Param.set_VideoFilming_Location(result[0]['Location']);
            objPre_Video_Param.set_VideoFilming_Purpose(result[0]['Purpose']);
            objPre_Video_Param.set_VideoFilming_EstimateTime(result[0]['EstimatedTime']);
        }  
    }
}

function getMrktVideoOther(view_only) {
    var result = new Array();
    result = db_getMrktVideoOtherByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (view_only) {
            $('#vdo_other_descrip_view').html(result[0]['Other'].replace(/\n/g, "<br/>"));
        }
        else {
            autosize.update($('#vdo_other_descrip').val(result[0]['Other']));
            objPre_Video_Param.set_VideoOther_Other(result[0]['Other']);
        }
    }
}

function getMrktEditorial() {
    var result = new Array();
    result = db_getMrktEditorialByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_editorial_id = result[0]['MrktEditorialID'];
        mrkt_editorial_admin_id = result[0]['AdminID'];
        mrkt_editorial_status_id = result[0]['StatusID'];
        
        $('#editorial_task_staff_list').val(result[0]['AdminID']);
        $('#task_editorial_status_list').val(result[0]['StatusID']);
        getMrktEditorialFileAttachment(result[0]['StatusID']);
        
        if (m_obj_User.AdminID === result[0]['AdminID'] || m_administrator) {
            $('#task_editorial_status_section').show();
            $('#editorial_form_validation').show();
            
            objPre_Editorial_Param.resetParams();
            $('#edt_due_date').data("DateTimePicker").date(moment(result[0]['DueDate']).format('MM/DD/YYYY'));
            objPre_Editorial_Param.set_EdtDueDate(moment(result[0]['DueDate']).format('MM/DD/YYYY'));
            if (result[0]['ckb_edt_copywriting'] === "1") {
                $('#ckb_edt_copywriting').iCheck('check');
                $('#edt_copywriting_date_needed').data("DateTimePicker").date(moment(result[0]['CWDateNeeded']).format('MM/DD/YYYY'));
                objPre_Editorial_Param.set_ckbEdtCopywriting(true);
                objPre_Editorial_Param.set_EdtCWDateNeeded(moment(result[0]['CWDateNeeded']).format('MM/DD/YYYY'));
            }
            if (result[0]['ckb_edt_proofreading'] === "1") {
                $('#ckb_edt_proofreading').iCheck('check');
                $('#edt_proofreading_date_needed').data("DateTimePicker").date(moment(result[0]['PRDateNeeded']).format('MM/DD/YYYY'));
                objPre_Editorial_Param.set_ckbEdtProofreading(true);
                objPre_Editorial_Param.set_EdtPRDateNeeded(moment(result[0]['PRDateNeeded']).format('MM/DD/YYYY'));
            }
        }
        else {
            $('#editorial_form_view_only').show();

            $('#edt_due_date_view').html(moment(result[0]['DueDate']).format('MM/DD/YYYY'));
            if (result[0]['ckb_edt_copywriting'] === "1") {
                $("#ckb_edt_copywriting_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#copywriting_date_needed_view').html(moment(result[0]['CWDateNeeded']).format('MM/DD/YYYY'));
            }
            else {
                $("#ckb_edt_copywriting_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
            if (result[0]['ckb_edt_proofreading'] === "1") {
                $("#ckb_edt_proofreading_view").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
                $('#proofreading_date_needed_view').html(moment(result[0]['PRDateNeeded']).format('MM/DD/YYYY'));
            }
            else {
                $("#ckb_edt_proofreading_view").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMrktPrintFileAttachment(status_id) {
    var result = new Array();
    result = db_getMrktPrintFileByPrintID(mrkt_print_id);
    
    if (status_id === status_complete_id) {
        if (result.length === 1) {
            $('#task_print_file_name').html(result[0]['FileName']);
            $('#task_print_file_section').hide();
            $('#task_print_file_view').show();
            return true;
        }
        else {
            $('#task_print_file_name').html("");
            $('#task_print_file_section').show();
            $('#task_print_file_view').hide();
            return false;
        }
    }
    else {
        $('#task_print_file_section').hide();
        $('#task_print_file_view').hide();
        return false;
    }
}

function getMrktPhotoFileAttachment(status_id) {
    var result = new Array();
    result = db_getMrktPhotoFileByPhotoID(mrkt_photo_id);
    
    if (status_id === status_complete_id) {
        if (result.length === 1) {
            $('#task_photo_file_name').html(result[0]['FileName']);
            $('#task_photo_file_section').hide();
            $('#task_photo_file_view').show();
            return true;
        }
        else {
            $('#task_photo_file_name').html("");
            $('#task_photo_file_section').show();
            $('#task_photo_file_view').hide();
            return false;
        }
    }
    else {
        $('#task_photo_file_section').hide();
        $('#task_photo_file_view').hide();
        return false;
    }
}

function getMrktMediaFileAttachment(status_id) {
    var result = new Array();
    result = db_getMrktMediaFileByMediaID(mrkt_media_id);
    
    if (status_id === status_complete_id) {
        if (result.length === 1) {
            $('#task_media_file_name').html(result[0]['FileName']);
            $('#task_media_file_section').hide();
            $('#task_media_file_view').show();
            return true;
        }
        else {
            $('#task_media_file_name').html("");
            $('#task_media_file_section').show();
            $('#task_media_file_view').hide();
            return false;
        }
    }
    else {
        $('#task_media_file_section').hide();
        $('#task_media_file_view').hide();
        return false;
    }
}

function getMrktWebFileAttachment(status_id) {
    var result = new Array();
    result = db_getMrktWebFileByWebID(mrkt_web_id);
    
    if (status_id === status_complete_id) {
        if (result.length === 1) {
            $('#task_web_file_name').html(result[0]['FileName']);
            $('#task_web_file_section').hide();
            $('#task_web_file_view').show();
            return true;
        }
        else {
            $('#task_web_file_name').html("");
            $('#task_web_file_section').show();
            $('#task_web_file_view').hide();
            return false;
        }
    }
    else {
        $('#task_web_file_section').hide();
        $('#task_web_file_view').hide();
        return false;
    }
}

function getMrktVideoFileAttachment(status_id) {
    var result = new Array();
    result = db_getMrktVideoFileByVideoID(mrkt_video_id);
    
    if (status_id === status_complete_id) {
        if (result.length === 1) {
            $('#task_video_file_name').html(result[0]['FileName']);
            $('#task_video_file_section').hide();
            $('#task_video_file_view').show();
            return true;
        }
        else {
            $('#task_video_file_name').html("");
            $('#task_video_file_section').show();
            $('#task_video_file_view').hide();
            return false;
        }
    }
    else {
        $('#task_video_file_section').hide();
        $('#task_video_file_view').hide();
        return false;
    }
}

function getMrktEditorialFileAttachment(status_id) {
    var result = new Array();
    result = db_getMrktEditorialFileByEditorialID(mrkt_editorial_id);
    
    if (status_id === status_complete_id) {
        if (result.length === 1) {
            $('#task_editorial_file_name').html(result[0]['FileName']);
            $('#task_editorial_file_section').hide();
            $('#task_editorial_file_view').show();
            return true;
        }
        else {
            $('#task_editorial_file_name').html("");
            $('#task_editorial_file_section').show();
            $('#task_editorial_file_view').hide();
            return false;
        }
    }
    else {
        $('#task_editorial_file_section').hide();
        $('#task_editorial_file_view').hide();
        return false;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMrktPrintFileName() {
    var file = $('#task_print_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    return "";
}

function getMrktPhotoFileName() {
    var file = $('#task_photo_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    return "";
}

function getMrktMediaFileName() {
    var file = $('#task_media_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    return "";
}

function getMrktWebFileName() {
    var file = $('#task_web_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    return "";
}

function getMrktVideoFileName() {
    var file = $('#task_video_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    return "";
}

function getMrktEditorialFileName() {
    var file = $('#task_editorial_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    return "";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTransactions() {
    var result = new Array();
    result = db_getTransaction(mrkt_request_id);
    
    $("#transaction_log").val("");
    var html = "";
    for (var i = 0; i < result.length; i++) {
        var dt_stamp = convertDBDateTimeToString(result[i]['DTStamp']);
        var login_name = result[i]['LoginName'];
        var note = result[i]['Note'];
        html += login_name + " : " + dt_stamp + "<br/>" + note.replace(/\n/g, "<br/>") + "<br/><br/>";
    }
    $("#transaction_log").html(html);
}

function getMrktProcessLogPreLogID() {
    var result = new Array();
    result = db_getMrktProcessLogByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        return result[result.length - 1]['MrktProcessLogID'];
    }
    else if (result.length > 1) {
        return result[result.length - 1]['MrktProcessLogID'];
    }
    else {
        return "0";
    }
}

function getAllTaskAssignedStatus() {
    var all_task_status = "0";    
    var result = new Array();
    result = db_getMrktTaskByReqID(mrkt_request_id);
    for (var i = 0; i < 6; i++) {
        if (i === 0) {
            if (result[0]['ckbMrktPrint'] === "1") {
                var ar_mrkt_print = new Array();
                ar_mrkt_print = db_getMrktPrintByReqID(mrkt_request_id);
                if (ar_mrkt_print.length === 1) {                    
                    if (ar_mrkt_print[0]['StatusID'] !== status_submitted_id && ar_mrkt_print[0]['AdminID'] !== "0") {
                        all_task_status = status_task_assigned_id;
                    }
                    else {
                        all_task_status = status_task_partially_assigned_id;
                        break;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 1) {
            if (result[0]['ckbMrktPhoto'] === "1") {
                var ar_mrkt_photo = new Array();
                ar_mrkt_photo = db_getMrktPhotoByReqID(mrkt_request_id);
                if (ar_mrkt_photo.length === 1) {
                    if (ar_mrkt_photo[0]['StatusID'] !== status_submitted_id && ar_mrkt_photo[0]['AdminID'] !== "0") {
                        all_task_status = status_task_assigned_id;
                    }
                    else {
                        all_task_status = status_task_partially_assigned_id;
                        break;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 2) {
            if (result[0]['ckbMrktMedia'] === "1") {
                var ar_mrkt_media = new Array();
                ar_mrkt_media = db_getMrktMediaByReqID(mrkt_request_id);
                if (ar_mrkt_media.length === 1) {
                    if (ar_mrkt_media[0]['StatusID'] !== status_submitted_id && ar_mrkt_media[0]['AdminID'] !== "0") {
                        all_task_status = status_task_assigned_id;
                    }
                    else {
                        all_task_status = status_task_partially_assigned_id;
                        break;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 3) {
            if (result[0]['ckbMrktWeb'] === "1") {
                var ar_mrkt_web = new Array();
                ar_mrkt_web = db_getMrktWebByReqID(mrkt_request_id);
                if (ar_mrkt_web.length === 1) {
                    if (ar_mrkt_web[0]['StatusID'] !== status_submitted_id && ar_mrkt_web[0]['AdminID'] !== "0") {
                        all_task_status = status_task_assigned_id;
                    }
                    else {
                        all_task_status = status_task_partially_assigned_id;
                        break;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 4) {
            if (result[0]['ckbMrktVideo'] === "1") {
                var ar_mrkt_video = new Array();
                ar_mrkt_video = db_getMrktVideoByReqID(mrkt_request_id);
                if (ar_mrkt_video.length === 1) {
                    if (ar_mrkt_video[0]['StatusID'] !== status_submitted_id && ar_mrkt_video[0]['AdminID'] !== "0") {
                        all_task_status = status_task_assigned_id;
                    }
                    else {
                        all_task_status = status_task_partially_assigned_id;
                        break;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 5) {
            if (result[0]['ckbMrktEditorial'] === "1") {
                var ar_mrkt_editorial = new Array();
                ar_mrkt_editorial = db_getMrktEditorialByReqID(mrkt_request_id);
                if (ar_mrkt_editorial.length === 1) {
                    if (ar_mrkt_editorial[0]['StatusID'] !== status_submitted_id && ar_mrkt_editorial[0]['AdminID'] !== "0") {
                        all_task_status = status_task_assigned_id;
                    }
                    else {
                        all_task_status = status_task_partially_assigned_id;
                        break;
                    }
                }
            }
            else {
                continue;
            }
        }
    }
    return all_task_status;
}

function getAllTaskProjectStatus() {
    var all_project_status = "0";
    var task_count = 0;
    var complete_count = 0;
    var cancel_count = 0;
    var hold_count = 0;
    var sched_count = 0;
    var more_info_count = 0;
    
    var result = new Array();
    result = db_getMrktTaskByReqID(mrkt_request_id); 
    for (var i = 0; i < 6; i++) {
        if (i === 0) {
            if (result[0]['ckbMrktPrint'] === "1") {
                var ar_mrkt_print = new Array();
                ar_mrkt_print = db_getMrktPrintByReqID(mrkt_request_id);
                if (ar_mrkt_print.length === 1) { 
                    if (ar_mrkt_print[0]['StatusID'] === status_task_assigned_id) {
                        all_project_status = status_task_assigned_id;
                        break;
                    }
                    else if (ar_mrkt_print[0]['StatusID'] === status_in_progress_id) {
                        all_project_status = status_in_progress_id;
                        break;
                    }
                    else if (ar_mrkt_print[0]['StatusID'] === status_submitted_id) {
                        task_count++;
                    }
                    else if (ar_mrkt_print[0]['StatusID'] === status_complete_id) {
                        task_count++;
                        complete_count++;
                    }
                    else if (ar_mrkt_print[0]['StatusID'] === status_cancel_id) {
                        task_count++;
                        cancel_count++;
                    }
                    else if (ar_mrkt_print[0]['StatusID'] === status_hold_id) {
                        task_count++;
                        hold_count++;
                    }
                    else if (ar_mrkt_print[0]['StatusID'] === status_scheduled_id) {
                        task_count++;
                        sched_count++;
                    }
                    else if (ar_mrkt_print[0]['StatusID'] === status_waiting_for_more_info_id) {
                        task_count++;
                        more_info_count++;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 1) {
            if (result[0]['ckbMrktPhoto'] === "1") {
                var ar_mrkt_photo = new Array();
                ar_mrkt_photo = db_getMrktPhotoByReqID(mrkt_request_id);
                if (ar_mrkt_photo.length === 1) {
                    if (ar_mrkt_photo[0]['StatusID'] === status_task_assigned_id) {
                        all_project_status = status_task_assigned_id;
                        break;
                    }
                    else if (ar_mrkt_photo[0]['StatusID'] === status_in_progress_id) {
                        all_project_status = status_in_progress_id;
                        break;
                    }
                    else if (ar_mrkt_photo[0]['StatusID'] === status_submitted_id) {
                        task_count++;
                    }
                    else if (ar_mrkt_photo[0]['StatusID'] === status_complete_id) {
                        task_count++;
                        complete_count++;
                    }
                    else if (ar_mrkt_photo[0]['StatusID'] === status_cancel_id) {
                        task_count++;
                        cancel_count++;
                    }
                    else if (ar_mrkt_photo[0]['StatusID'] === status_hold_id) {
                        task_count++;
                        hold_count++;
                    }
                    else if (ar_mrkt_photo[0]['StatusID'] === status_scheduled_id) {
                        task_count++;
                        sched_count++;
                    }
                    else if (ar_mrkt_photo[0]['StatusID'] === status_waiting_for_more_info_id) {
                        task_count++;
                        more_info_count++;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 2) {
            if (result[0]['ckbMrktMedia'] === "1") {
                var ar_mrkt_media = new Array();
                ar_mrkt_media = db_getMrktMediaByReqID(mrkt_request_id);
                if (ar_mrkt_media.length === 1) {  
                    if (ar_mrkt_media[0]['StatusID'] === status_task_assigned_id) {
                        all_project_status = status_task_assigned_id;
                        break;
                    }
                    else if (ar_mrkt_media[0]['StatusID'] === status_in_progress_id) {
                        all_project_status = status_in_progress_id;
                        break;
                    }
                    else if (ar_mrkt_media[0]['StatusID'] === status_submitted_id) {
                        task_count++;
                    }
                    else if (ar_mrkt_media[0]['StatusID'] === status_complete_id) {
                        task_count++;
                        complete_count++;
                    }
                    else if (ar_mrkt_media[0]['StatusID'] === status_cancel_id) {
                        task_count++;
                        cancel_count++;
                    }
                    else if (ar_mrkt_media[0]['StatusID'] === status_hold_id) {
                        task_count++;
                        hold_count++;
                    }
                    else if (ar_mrkt_media[0]['StatusID'] === status_scheduled_id) {
                        task_count++;
                        sched_count++;
                    }
                    else if (ar_mrkt_media[0]['StatusID'] === status_waiting_for_more_info_id) {
                        task_count++;
                        more_info_count++;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 3) {
            if (result[0]['ckbMrktWeb'] === "1") {
                var ar_mrkt_web = new Array();
                ar_mrkt_web = db_getMrktWebByReqID(mrkt_request_id);
                if (ar_mrkt_web.length === 1) {    
                    if (ar_mrkt_web[0]['StatusID'] === status_task_assigned_id) {
                        all_project_status = status_task_assigned_id;
                        break;
                    }
                    else if (ar_mrkt_web[0]['StatusID'] === status_in_progress_id) {
                        all_project_status = status_in_progress_id;
                        break;
                    }
                    else if (ar_mrkt_web[0]['StatusID'] === status_submitted_id) {
                        task_count++;
                    }
                    else if (ar_mrkt_web[0]['StatusID'] === status_complete_id) {
                        task_count++;
                        complete_count++;
                    }
                    else if (ar_mrkt_web[0]['StatusID'] === status_cancel_id) {
                        task_count++;
                        cancel_count++;
                    }
                    else if (ar_mrkt_web[0]['StatusID'] === status_hold_id) {
                        task_count++;
                        hold_count++;
                    }
                    else if (ar_mrkt_web[0]['StatusID'] === status_scheduled_id) {
                        task_count++;
                        sched_count++;
                    }
                    else if (ar_mrkt_web[0]['StatusID'] === status_waiting_for_more_info_id) {
                        task_count++;
                        more_info_count++;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 4) {
            if (result[0]['ckbMrktVideo'] === "1") {
                var ar_mrkt_video = new Array();
                ar_mrkt_video = db_getMrktVideoByReqID(mrkt_request_id);
                if (ar_mrkt_video.length === 1) {  
                    if (ar_mrkt_video[0]['StatusID'] === status_task_assigned_id) {
                        all_project_status = status_task_assigned_id;
                        break;
                    }
                    else if (ar_mrkt_video[0]['StatusID'] === status_in_progress_id) {
                        all_project_status = status_in_progress_id;
                        break;
                    }
                    else if (ar_mrkt_video[0]['StatusID'] === status_submitted_id) {
                        task_count++;
                    }
                    else if (ar_mrkt_video[0]['StatusID'] === status_complete_id) {
                        task_count++;
                        complete_count++;
                    }
                    else if (ar_mrkt_video[0]['StatusID'] === status_cancel_id) {
                        task_count++;
                        cancel_count++;
                    }
                    else if (ar_mrkt_video[0]['StatusID'] === status_hold_id) {
                        task_count++;
                        hold_count++;
                    }
                    else if (ar_mrkt_video[0]['StatusID'] === status_scheduled_id) {
                        task_count++;
                        sched_count++;
                    }
                    else if (ar_mrkt_video[0]['StatusID'] === status_waiting_for_more_info_id) {
                        task_count++;
                        more_info_count++;
                    }
                }
            }
            else {
                continue;
            }
        }
        else if (i === 5) {
            if (result[0]['ckbMrktEditorial'] === "1") {
                var ar_mrkt_editorial = new Array();
                ar_mrkt_editorial = db_getMrktEditorialByReqID(mrkt_request_id);
                if (ar_mrkt_editorial.length === 1) {  
                    if (ar_mrkt_editorial[0]['StatusID'] === status_task_assigned_id) {
                        all_project_status = status_task_assigned_id;
                        break;
                    }
                    else if (ar_mrkt_editorial[0]['StatusID'] === status_in_progress_id) {
                        all_project_status = status_in_progress_id;
                        break;
                    }
                    else if (ar_mrkt_editorial[0]['StatusID'] === status_submitted_id) {
                        task_count++;
                    }
                    else if (ar_mrkt_editorial[0]['StatusID'] === status_complete_id) {
                        task_count++;
                        complete_count++;
                    }
                    else if (ar_mrkt_editorial[0]['StatusID'] === status_cancel_id) {
                        task_count++;
                        cancel_count++;
                    }
                    else if (ar_mrkt_editorial[0]['StatusID'] === status_hold_id) {
                        task_count++;
                        hold_count++;
                    }
                    else if (ar_mrkt_editorial[0]['StatusID'] === status_scheduled_id) {
                        task_count++;
                        sched_count++;
                    }
                    else if (ar_mrkt_editorial[0]['StatusID'] === status_waiting_for_more_info_id) {
                        task_count++;
                        more_info_count++;
                    }
                }
            }
            else {
                continue;
            }
        }
    } 
    
    if (all_project_status !== "0") {
        return all_project_status;
    }
    else {
        if (complete_count === task_count) {
            return status_complete_id;
        }
        else if (cancel_count === task_count) {
            return status_cancel_id;
        }
        else if (hold_count === task_count) {
            return status_hold_id;
        }
        else if (sched_count === task_count) {
            return status_scheduled_id;
        }
        else if (more_info_count === task_count) {
            return status_waiting_for_more_info_id;
        }
        else if (hold_count > 0 || sched_count > 0 || more_info_count > 0) {
            return status_in_progress_id;
        }
        else if (complete_count + cancel_count === task_count) {
            return status_complete_id;
        }
        else {
            return status_task_partially_assigned_id;
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateMrktRequestStatus(status_id) {    
    if (!db_updateMrktRequestStatusByID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_REQUEST:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateMrktPrintAdmin(admin_id) {
    if (!db_updateMrktPrintAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_PRINT:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktPhotoAdmin(admin_id) {
    if (!db_updateMrktPhotoAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_PHOTO:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktMediaAdmin(admin_id) {
    if (!db_updateMrktMediaAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktWebAdmin(admin_id) {
    if (!db_updateMrktWebAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_WEB:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktVideoAdmin(admin_id) {
    if (!db_updateMrktVideoAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_VIDEO:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktEditorialAdmin(admin_id) {
    if (!db_updateMrktEditorialAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_EDITORIAL:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateMrktPrintStatus(status_id) {    
    if ($('#print_task_staff_list').val() === "0") {
        swal({title: "Error", text: "Please select and update Print/Graphics task staff first", type: "error"});
        $('#task_print_status_list').val("0");
        return false;
    }
    if (!db_updateMrktPrintStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_PRINT:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktPhotoStatus(status_id) {
    if ($('#photo_task_staff_list').val() === "0") {
        swal({title: "Error", text: "Please select and update Photography task staff first", type: "error"});
        $('#task_photo_status_list').val("0");
        return false;
    }
    if (!db_updateMrktPhotoStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_PHOTO:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktMediaStatus(status_id) {
    if ($('#media_task_staff_list').val() === "0") {
        swal({title: "Error", text: "Please select and update Social Media/Publicity task staff first", type: "error"});
        $('#task_media_status_list').val("0");
        return false;
    }
    if (!db_updateMrktMediaStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktWebStatus(status_id) {
    if ($('#web_task_staff_list').val() === "0") {
        swal({title: "Error", text: "Please select and update Web Services task staff first", type: "error"});
        $('#task_web_status_list').val("0");
        return false;
    }
    if (!db_updateMrktWebStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_WEB:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktVideoStatus(status_id) {
    if ($('#video_task_staff_list').val() === "0") {
        swal({title: "Error", text: "Please select and update Video task staff first", type: "error"});
        $('#task_video_status_list').val("0");
        return false;
    }
    if (!db_updateMrktVideoStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_VIDEO:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function updateMrktEditorialStatus(status_id) {
    if ($('#editorial_task_staff_list').val() === "0") {
        swal({title: "Error", text: "Please select and update Editorial Services task staff first", type: "error"});
        $('#task_editorial_status_list').val("0");
        return false;
    }
    if (!db_updateMrktEditorialStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_EDITORIAL:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertMrktPrintFile() {
    var file = $('#task_print_file_attach').get(0).files[0];  
    
    if (typeof file !== "undefined" && file !== null) {
        var file_data = new FormData();  
        var f_name = removeIllegalCharacters(file.name);
        f_name = removeDiacritics(f_name);
        var php_flname = mrkt_print_id + "_" + mrkt_request_id + "_fileIndex_" + f_name;
        file_data.append("files[]", file, php_flname); 

        var mrkt_print_file_id = uploadFileMrktPrintAttachment(file_data);
        if (mrkt_print_file_id === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_FILE - MrktPrintID: " + mrkt_print_id + " - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    return true;
}

function insertMrktPhotoFile() {
    var file = $('#task_photo_file_attach').get(0).files[0];  
    
    if (typeof file !== "undefined" && file !== null) {
        var file_data = new FormData();  
        var f_name = removeIllegalCharacters(file.name);
        f_name = removeDiacritics(f_name);
        var php_flname = mrkt_photo_id + "_" + mrkt_request_id + "_fileIndex_" + f_name;
        file_data.append("files[]", file, php_flname); 

        var mrkt_photo_file_id = uploadFileMrktPhotoAttachment(file_data);
        if (mrkt_photo_file_id === "") {
            var str_msg = "DB system error INSERT MRKT_PHOTO_FILE - MrktPhotoID: " + mrkt_photo_id + " - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }  
    }
    return true;
}

function insertMrktMediaFile() {
    var file = $('#task_media_file_attach').get(0).files[0];  
    
    if (typeof file !== "undefined" && file !== null) {
        var file_data = new FormData();  
        var f_name = removeIllegalCharacters(file.name);
        f_name = removeDiacritics(f_name);
        var php_flname = mrkt_media_id + "_" + mrkt_request_id + "_fileIndex_" + f_name;
        file_data.append("files[]", file, php_flname); 

        var mrkt_media_file_id = uploadFileMrktMediaAttachment(file_data);
        if (mrkt_media_file_id === "") {
            var str_msg = "DB system error INSERT MRKT_MEDIA_FILE - MrktMediaID: " + mrkt_media_id + " - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }  
    }
    return true;
}

function insertMrktWebFile() {
    var file = $('#task_web_file_attach').get(0).files[0];  
    
    if (typeof file !== "undefined" && file !== null) {
        var file_data = new FormData();  
        var f_name = removeIllegalCharacters(file.name);
        f_name = removeDiacritics(f_name);
        var php_flname = mrkt_web_id + "_" + mrkt_request_id + "_fileIndex_" + f_name;
        file_data.append("files[]", file, php_flname); 

        var mrkt_web_file_id = uploadFileMrktWebAttachment(file_data);
        if (mrkt_web_file_id === "") {
            var str_msg = "DB system error INSERT MRKT_WEB_FILE - MrktWebID: " + mrkt_web_id + " - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        } 
    }
    return true;
}

function insertMrktVideoFile() {
    var file = $('#task_video_file_attach').get(0).files[0];  
    
    if (typeof file !== "undefined" && file !== null) {
        var file_data = new FormData();  
        var f_name = removeIllegalCharacters(file.name);
        f_name = removeDiacritics(f_name);
        var php_flname = mrkt_video_id + "_" + mrkt_request_id + "_fileIndex_" + f_name;
        file_data.append("files[]", file, php_flname); 

        var mrkt_video_file_id = uploadFileMrktVideoAttachment(file_data);
        if (mrkt_video_file_id === "") {
            var str_msg = "DB system error INSERT MRKT_VIDEO_FILE - MrktVideoID: " + mrkt_video_id + " - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    return true;
}

function insertMrktEditorialFile() {
    var file = $('#task_editorial_file_attach').get(0).files[0];  
    
    if (typeof file !== "undefined" && file !== null) {
        var file_data = new FormData();  
        var f_name = removeIllegalCharacters(file.name);
        f_name = removeDiacritics(f_name);
        var php_flname = mrkt_editorial_id + "_" + mrkt_request_id + "_fileIndex_" + f_name;
        file_data.append("files[]", file, php_flname); 

        var mrkt_editorial_file_id = uploadFileMrktEditorialAttachment(file_data);
        if (mrkt_editorial_file_id === "") {
            var str_msg = "DB system error INSERT MRKT_EDITORIAL_FILE - MrktEditorialID: " + mrkt_editorial_id + " - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }  
    }
    return true;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertMrktProcessLog(task_id, status_id, note, pre_log_id) {
    if (db_insertMrktProcessLog(mrkt_request_id, sessionStorage.getItem('ss_mrkt_loginName'), task_id, status_id, note, pre_log_id) === "") {
        var str_msg = "DB system error INSERT MRKT_PROCESS_LOG - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function insertTransaction(note) {       
    if (db_insertTransaction(mrkt_request_id, sessionStorage.getItem('ss_mrkt_loginName'), note) === "") {
        var str_msg = "DB system error INSERT TRANSACTION - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteMrktPrintFile() {
    if (!db_deleteMrktPrintFileByPrintID(mrkt_print_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_FILE - MrktPrintID: " + mrkt_print_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPhotoFile() {
    if (!db_deleteMrktPhotoFileByPhotoID(mrkt_photo_id)) {
        var str_msg = "DB system error DELETE MRKT_PHOTO_FILE - MrktPhotoID: " + mrkt_photo_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktMediaFile() {
    if (!db_deleteMrktMediaFileByMediaID(mrkt_media_id)) {
        var str_msg = "DB system error DELETE MRKT_MEDIA_FILE - MrktMediaID: " + mrkt_media_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktWebFile() {
    if (!db_deleteMrktWebFileByWebID(mrkt_web_id)) {
        var str_msg = "DB system error DELETE MRKT_WEB_FILE - MrktWebID: " + mrkt_web_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktVideoFile() {
    if (!db_deleteMrktVideoFileByVideoID(mrkt_video_id)) {
        var str_msg = "DB system error DELETE MRKT_VIDEO_FILE - MrktVideoID: " + mrkt_video_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktEditorialFile() {
    if (!db_deleteMrktEditorialFileByEditorialID(mrkt_editorial_id)) {
        var str_msg = "DB system error DELETE MRKT_EDITORIAL_FILE - MrktEditorialID: " + mrkt_editorial_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteFilePrintAttachment(file_link_name) {
    if (!removeFileMrktPrintAttachment(file_link_name)) {
        var str_msg = "FILE system error REMOVE PRINT_FILE - LinkFileName: " + file_link_name;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteFilePhotoAttachment(file_link_name) {
    if (!removeFileMrktPhotoAttachment(file_link_name)) {
        var str_msg = "FILE system error REMOVE PHOTO_FILE - LinkFileName: " + file_link_name;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteFileMediaAttachment(file_link_name) {
    if (!removeFileMrktMediaAttachment(file_link_name)) {
        var str_msg = "FILE system error REMOVE MEDIA_FILE - LinkFileName: " + file_link_name;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteFileWebAttachment(file_link_name) {
    if (!removeFileMrktWebAttachment(file_link_name)) {
        var str_msg = "FILE system error REMOVE WEB_FILE - LinkFileName: " + file_link_name;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteFileVideoAttachment(file_link_name) {
    if (!removeFileMrktVideoAttachment(file_link_name)) {
        var str_msg = "FILE system error REMOVE VIDEO_FILE - LinkFileName: " + file_link_name;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteFileEditorialAttachment(file_link_name) {
    if (!removeFileMrktEditorialAttachment(file_link_name)) {
        var str_msg = "FILE system error REMOVE EDITORIAL_FILE - LinkFileName: " + file_link_name;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mainAttachmentFileValidation() {
    var file = $('#main_file_attachment').get(0).files[0];

    if (typeof file !== "undefined" && file !== null) {
        var f_extension = getFileExtension(file.name);
        
        if (f_extension !== "pdf" && f_extension !== "doc" && f_extension !== "docx" && f_extension !== "jpg" && f_extension !== "jpeg" && f_extension !== "png") {
            swal({title: "Error", text: "We only accept word doc, pdf, jpg or png image file type", type: "error"});
            return false;
        } 
        else {   
            if (file.size >= 5000000) {
                swal({title: "Error", text: "Attached file size is too big, max. file size allow is 5Mb or less", type: "error"});
                return false;
            }
            return true;
        }
    }

    swal({title: "Error", text: "Please select file", type: "error"});
    return false;
}

function insertMrktAttachment() {
    var file = $('#main_file_attachment').get(0).files[0];  
    
    if (typeof file !== "undefined" && file !== null) {
        var file_data = new FormData();  
        var f_name = removeIllegalCharacters(file.name);
        f_name = removeDiacritics(f_name);
        
        var mrkt_attachment_id = db_insertMrktAttachment(f_name, getFileExtension(f_name));
        if (mrkt_attachment_id === "") {
            var str_msg = "DB system error INSERT MRKT_ATTACHMENT";
            return dbSystemErrorHandling(str_msg);
        }
        if (!db_updateMrktAttachmentRequestIDByID(mrkt_attachment_id, mrkt_request_id)) {
            var str_msg = "DB system error UPDATE MRKT_ATTACHMENT - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
        
        var php_flname = mrkt_attachment_id + "_" + f_name;
        file_data.append("files[]", file, php_flname); 
        
        if (!uploadFileMrktAttachment(file_data)) {
            var str_msg = "Marketing Request: file uploading error";
            return dbSystemErrorHandling(str_msg);
        }
        if (!db_updateMrktAttachmentFileLinkNameByID(mrkt_attachment_id, php_flname)) {
            var str_msg = "DB system error UPDATE MRKT_ATTACHMENT FILE_LINK_NAME";
            return dbSystemErrorHandling(str_msg);
        }
        if (!insertTransaction(getAttachmentChange(f_name, "New file has been attached"))) {
            var str_msg = "DB system error INSERT TRANSACTION (FILE ATTACHMENT) - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
        
        $('.fileinput').fileinput('clear');
        $('#req_file_view_section').append(setMrktAttachmentHTMLEdit(mrkt_attachment_id, f_name));
        $('#req_file_view_section').show();
        return true;
    }   
    return false;
}

function deleteMrktAttachment(mrkt_attachment_id) {
    if (!db_deleteMrktAttachmentByID(mrkt_attachment_id)) {
        var str_msg = "DB system error DELETE MRKT_ATTACHMENT - MrktAttachmentID: " + mrkt_attachment_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktAttachmentFile(file_link_name) {
    if (!removeFileMrktAttachment(file_link_name)) {
        var str_msg = "FILE system error DELETE MRKT_ATTACHMENT - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updatePrintTaskSection() {
    mrkt_print_log = "";
    var prt_date_need = $('#prt_date_need').find('input').val();
    var ckb_prt_ad = ($('#ckb_prt_ad').is(':checked') ? true : false);
    var ckb_prt_brochure = ($('#ckb_prt_brochure').is(':checked') ? true : false);
    var ckb_prt_banner = ($('#ckb_prt_banner').is(':checked') ? true : false);
    var ckb_prt_flyer = ($('#ckb_prt_flyer').is(':checked') ? true : false);
    var ckb_prt_certificate = ($('#ckb_prt_certificate').is(':checked') ? true : false);
    var ckb_prt_postcard = ($('#ckb_prt_postcard').is(':checked') ? true : false);
    var ckb_prt_poster = ($('#ckb_prt_poster').is(':checked') ? true : false);
    var ckb_prt_program = ($('#ckb_prt_program').is(':checked') ? true : false);
    var ckb_prt_other = ($('#ckb_prt_other').is(':checked') ? true : false);
    var ckb_prt_web_graphic = ($('#ckb_prt_web_graphic').is(':checked') ? true : false);
    
    if (!db_updateMrktPrintByReqID(mrkt_request_id, mrkt_print_admin_id, mrkt_print_status_id, prt_date_need, ckb_prt_ad, ckb_prt_brochure, ckb_prt_banner, ckb_prt_flyer, ckb_prt_certificate, 
                                            ckb_prt_postcard, ckb_prt_poster, ckb_prt_program, ckb_prt_other, ckb_prt_web_graphic)) {
        var str_msg = "DB system error UPDATE MRKT_PRINT - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrtDateNeeded(), prt_date_need, "Date Needed has been changed");

    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtAd(), ckb_prt_ad, "Add");
    if (ckb_prt_ad) {
        if (!updateMrktPrintAd()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintAd()) {
            return false;
        }
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtBrochure(), ckb_prt_brochure, "Brochure");
    if (ckb_prt_brochure) {
        if (!updateMrktPrintBrochure()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintBrochure()) {
            return false;
        }
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtBanner(), ckb_prt_banner, "Banner");
    if (ckb_prt_banner) {
        if (!updateMrktPrintBanner()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintBanner()) {
            return false;
        }
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtFlyer(), ckb_prt_flyer, "Flyer");
    if (ckb_prt_flyer) {
        if (!updateMrktPrintFlyer()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintFlyer()) {
            return false;
        }
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtCertificate(), ckb_prt_certificate, "Certificate");
    if (ckb_prt_certificate) {
        if (!updateMrktPrintCert()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintCert()) {
            return false;
        }
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtPostcard(), ckb_prt_postcard, "Postcard");
    if (ckb_prt_postcard) {
        if (!updateMrktPrintPostCard()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintPostCard()) {
            return false;
        }
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtPoster(), ckb_prt_poster, "Poster");
    if (ckb_prt_poster) {
        if (!updateMrktPrintPoster()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintPoster()) {
            return false;
        }
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtProgram(), ckb_prt_program, "Program");
    if (ckb_prt_program) {
        if (!updateMrktPrintProgram()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintProgram()) {
            return false;
        }
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtOther(), ckb_prt_other, "Other");
    if (ckb_prt_other) {
        if (!updateMrktPrintOther()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintOther()) {
            return false;
        }
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_ckbPrtWebGraphic(), ckb_prt_web_graphic, "Web Graphic");
    if (ckb_prt_web_graphic) {
        if (!updateMrktPrintWGraphic()) {
            return false;
        }
    }
    else {
        if (!deleteMrktPrintWGraphic()) {
            return false;
        }
    }
    return true;
}

function updateMrktPrintAd() {
    var prt_ad_size = $.trim($('#prt_ad_size').val());
    
    var result = new Array();
    result = db_getMrktPrintAdByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintAdByReqID(mrkt_request_id, prt_ad_size)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_AD - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintAd(mrkt_print_id, mrkt_request_id, prt_ad_size) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_AD";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintAdd_Size(), prt_ad_size, "Ad Size has been changed");
    return true;
}

function updateMrktPrintBrochure() {
    var prt_bro_qty = $.trim($('#prt_bro_qty').val());
    
    var result = new Array();
    result = db_getMrktPrintBrochureByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintBrochureByReqID(mrkt_request_id, prt_bro_qty)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_BROCHURE - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintBrochure(mrkt_print_id, mrkt_request_id, prt_bro_qty) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_BROCHURE";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintBrochureQty(), prt_bro_qty, "Brochure (4 x 9 Standard College Brochure) Qty has been changed");
    return true;
}

function updateMrktPrintBanner() {
    var prt_ban_qty = $.trim($('#prt_ban_qty').val());
    
    var result = new Array();
    result = db_getMrktPrintBannerByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintBannerByReqID(mrkt_request_id, prt_ban_qty)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_BANNER - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintBanner(mrkt_print_id, mrkt_request_id, prt_ban_qty) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_BANNER";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintBannerQty(), prt_ban_qty, "Banner (8 x 4) Qty has been changed");
    return true;
}

function updateMrktPrintFlyer() {
    var prt_fly_qty = $.trim($('#prt_fly_qty').val());
    
    var result = new Array();
    result = db_getMrktPrintFlyerByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintFlyerByReqID(mrkt_request_id, prt_fly_qty)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_BANNER - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintFlyer(mrkt_print_id, mrkt_request_id, prt_fly_qty) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_FLYER";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintFlyerQty(), prt_fly_qty, "Flyer (8.5 x 11) Qty has been changed");
    return true;
}

function updateMrktPrintCert() {
    var prt_cer_qty = $.trim($('#prt_cer_qty').val());
    
    var result = new Array();
    result = db_getMrktPrintCertByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintCertByReqID(mrkt_request_id, prt_cer_qty)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_CERT - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintCert(mrkt_print_id, mrkt_request_id, prt_cer_qty) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_CERT";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintCertificateQty(), prt_cer_qty, "Certificate Qty has been changed");
    return true;
}

function updateMrktPrintPostCard() {
    var prt_pcd_size = $.trim($('#prt_pcd_size').val());
    var prt_pcd_qty = $.trim($('#prt_pcd_qty').val());
    
    var result = new Array();
    result = db_getMrktPrintPostCardByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintPostCardByReqID(mrkt_request_id, prt_pcd_size, prt_pcd_qty)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_POSTCARD - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintPostCard(mrkt_print_id, mrkt_request_id, prt_pcd_size, prt_pcd_qty) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_POSTCARD";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintPostcardSize(), prt_pcd_size, "Postcard Size has been changed");
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintPostcardQty(), prt_pcd_qty, "Postcard Qty has been changed");
    return true;
}

function updateMrktPrintPoster() {
    var ckb_prt_pst_11_17 = ($('#ckb_prt_pst_11_17').is(':checked') ? true : false);
    var ckb_prt_pst_22_28 = ($('#ckb_prt_pst_22_28').is(':checked') ? true : false);
    var ckb_prt_pst_other = ($('#ckb_prt_pst_other').is(':checked') ? true : false);
    
    var prt_pst_11_17_qty = null;
    var prt_pst_22_28_qty = null;
    var prt_pst_other_qty = null;
    var prt_pst_other_size = null;
    
    if (ckb_prt_pst_11_17) {
        prt_pst_11_17_qty = $.trim($('#prt_pst_11_17_qty').val());
    }
    if (ckb_prt_pst_22_28) {
        prt_pst_22_28_qty = $.trim($('#prt_pst_22_28_qty').val());
    }
    if (ckb_prt_pst_other) {
        prt_pst_other_qty = $.trim($('#prt_pst_other_qty').val());
        prt_pst_other_size = $.trim($('#prt_pst_other_size').val());
    }
    
    var result = new Array();
    result = db_getMrktPrintPosterByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintPosterByReqID(mrkt_request_id, ckb_prt_pst_11_17, prt_pst_11_17_qty, ckb_prt_pst_22_28, prt_pst_22_28_qty, ckb_prt_pst_other, prt_pst_other_qty, prt_pst_other_size)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_POSTER - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintPoster(mrkt_print_id, mrkt_request_id, ckb_prt_pst_11_17, prt_pst_11_17_qty, ckb_prt_pst_22_28, prt_pst_22_28_qty, ckb_prt_pst_other, prt_pst_other_qty, prt_pst_other_size) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_POSTER";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_PrintPoster_ckb_11_17(), ckb_prt_pst_11_17, "Checkbox Poster (11 x 17)");
    if (ckb_prt_pst_11_17) {
        mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintPoster_Qty_11_17(), prt_pst_11_17_qty, "Poster (11 x 17) Qty has been changed");
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_PrintPoster_ckb_22_28(), ckb_prt_pst_22_28, "Checkbox Poster (22 x 28 Sign Stand, Window)");
    if (ckb_prt_pst_22_28) {
        mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintPoster_Qty_22_28(), prt_pst_22_28_qty, "Poster (22 x 28 Sign Stand, Window) Qty has been changed");
    }
    mrkt_print_log += getCheckBoxChange(objPre_Print_Param.get_PrintPoster_ckb_other(), ckb_prt_pst_other, "Checkbox Other");
    if (ckb_prt_pst_other) {
        mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintPoster_Qty_other(), prt_pst_other_qty, "Other Qty has been changed");
        mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintPoster_Size_other(), prt_pst_other_size, "Other Size has been changed");
    }
    return true;
}

function updateMrktPrintProgram() {
    var prt_prg_qty = $.trim($('#prt_prg_qty').val());
    
    var result = new Array();
    result = db_getMrktPrintProgramByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintProgramByReqID(mrkt_request_id, prt_prg_qty)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_POSTER - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintProgram(mrkt_print_id, mrkt_request_id, prt_prg_qty) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_PROGRAM";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintProgramQty(), prt_prg_qty, "Program Qty has been changed");
    return true;
}

function updateMrktPrintOther() {
    var prt_oth_descrip = $.trim($('#prt_oth_descrip').val());
    
    var result = new Array();
    result = db_getMrktPrintOtherByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintOtherByReqID(mrkt_request_id, prt_oth_descrip)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_OTHER - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintOther(mrkt_print_id, mrkt_request_id, prt_oth_descrip) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_OTHER";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintOtherDescrip(), prt_oth_descrip, "Other (Please Describe) has been changed");
    return true;
}

function updateMrktPrintWGraphic() {
    var prt_web_grap_descrip = $.trim($('#prt_web_grap_descrip').val());
    var prt_web_grap_dimensions = $.trim($('#prt_web_grap_dimensions').val());
    
    var result = new Array();
    result = db_getMrktPrintWGraphicByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPrintWGraphicByReqID(mrkt_request_id, prt_web_grap_descrip, prt_web_grap_dimensions)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_WGRAPHIC - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPrintWGraphic(mrkt_print_id, mrkt_request_id, prt_web_grap_descrip, prt_web_grap_dimensions) === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT_WGRAPHIC";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintWebGraphic_web_graphic(), prt_web_grap_descrip, "Web Graphic (Please Describe) has been changed");
    mrkt_print_log += getDataValueChange(objPre_Print_Param.get_PrintWebGraphic_Dimension(), prt_web_grap_dimensions, "Dimensions (Pixel Size) has been changed");
    return true;
}

function deleteMrktPrintAd() {
    if (!db_deleteMrktPrintAdByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_AD - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrintBrochure() {
    if (!db_deleteMrktPrintBrochureByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_BROCHURE - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrintBanner() {
    if (!db_deleteMrktPrintBannerByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_BANNER - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrintFlyer() {
    if (!db_deleteMrktPrintFlyerByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_FLYER - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrintCert() {
    if (!db_deleteMrktPrintCertByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_CERT - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrintPostCard() {
    if (!db_deleteMrktPrintPostCardByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_POST_CARD - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrintPoster() {
    if (!db_deleteMrktPrintPosterByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_POSTER - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrintProgram() {
    if (!db_deleteMrktPrintProgramByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_PROGRAM - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrintOther() {
    if (!db_deleteMrktPrintOtherByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_OTHER - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrintWGraphic() {
    if (!db_deleteMrktPrintWGraphicByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT_WGRAPHIC - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updatePhotographyTaskSection() {
    mrkt_photo_log = "";
    var pht_event_date = $('#pht_event_date').find('input').val();
    var pht_event_time = $('#pht_event_time').find('input').val();
    var pht_event_location = $.trim($('#pht_event_location').val());
    var pht_event_estimate_time = $.trim($('#pht_event_estimate_time').val());
 
    if (!db_updateMrktPhotoByReqID(mrkt_request_id, mrkt_photo_admin_id, mrkt_photo_status_id, pht_event_date, pht_event_time, pht_event_location, pht_event_estimate_time)) {
        var str_msg = "DB system error UPDATE MRKT_PRINT_WGRAPHIC - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    
    mrkt_photo_log += getDataValueChange(objPre_Photo_Param.get_EventDate(), pht_event_date, "Event Date has been changed");
    mrkt_photo_log += getDataValueChange(objPre_Photo_Param.get_EventTime(), pht_event_time, "Event Time has been changed");
    mrkt_photo_log += getDataValueChange(objPre_Photo_Param.get_Location(), pht_event_location, "Location has been changed");
    mrkt_photo_log += getDataValueChange(objPre_Photo_Param.get_EstimateTime(), pht_event_estimate_time, "Estimated Time has been changed");
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateSocialMediaTaskSection() {
    mrkt_media_log = "";
    var mda_due_date = $('#mda_due_date').find('input').val();
    var ckb_mda_collegewide_email = ($('#ckb_mda_collegewide_email').is(':checked') ? true : false);
    var ckb_mda_sherpa_email = ($('#ckb_mda_sherpa_email').is(':checked') ? true : false);
    var ckb_mda_monitor = ($('#ckb_mda_monitor').is(':checked') ? true : false);
    var ckb_mda_social_media = ($('#ckb_mda_social_media').is(':checked') ? true : false);
    var ckb_mda_college_entrance = ($('#ckb_mda_college_entrance').is(':checked') ? true : false);
    
    if (!db_updateMrktMediaByReqID(mrkt_request_id, mrkt_media_admin_id, mrkt_media_status_id, mda_due_date, ckb_mda_collegewide_email, ckb_mda_sherpa_email, ckb_mda_monitor, ckb_mda_social_media, ckb_mda_college_entrance)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    mrkt_media_log += getDataValueChange(objPre_Media_Param.get_MdaDueDate(), mda_due_date, "Due Date has been changed");
    
    mrkt_media_log += getCheckBoxChange(objPre_Media_Param.get_ckbMdaCollegewideEmail(), ckb_mda_collegewide_email, "Collegewide Email(Faculty/Staff)");
    if (ckb_mda_collegewide_email) {
        if (!updateMrktMediaCollege()) {
            return false;
        }
    }
    else {
        if (!deleteMrktMediaCollege()) {
            return false;
        }
    }
    mrkt_media_log += getCheckBoxChange(objPre_Media_Param.get_ckbMdaSherpaEmail(), ckb_mda_sherpa_email, "Sherpa Email(Students)");
    if (ckb_mda_sherpa_email) {
        if (!updateMrktMediaSherpa()) {
            return false;
        }
    }
    else {
        if (!deleteMrktMediaSherpa()) {
            return false;
        }
    }
    mrkt_media_log += getCheckBoxChange(objPre_Media_Param.get_ckbMdaMonitor(), ckb_mda_monitor, "Monitor Slide");
    if (ckb_mda_monitor) {
        if (!updateMrktMediaMonitor()) {
            return false;
        }
    }
    else {
        if (!deleteMrktMediaMonitor()) {
            return false;
        }
    }
    mrkt_media_log += getCheckBoxChange(objPre_Media_Param.get_ckbMdaSocialMedia(), ckb_mda_social_media, "Social Media Post");
    if (ckb_mda_social_media) {
        if (!updateMrktMediaPost()) {
            return false;
        }
    }
    else {
        if (!deleteMrktMediaPost()) {
            return false;
        }
    }
    mrkt_media_log += getCheckBoxChange(objPre_Media_Param.get_ckbMdaCollegeEntrance(), ckb_mda_college_entrance, "College Entrance Marquees");
    if (ckb_mda_college_entrance) {
        if (!updateMrktMediaCollegeEntrance()) {
            return false;
        }
    }
    else {
        if (!deleteMrktMediaEntrance()) {
            return false;
        }
    }
    return true;
}

function updateMrktMediaCollege() {
    var mda_college_email = $.trim($('#mda_college_email').val());
    
    var result = new Array();
    result = db_getMrktMediaCollegeByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktMediaCollegeByReqID(mrkt_request_id, mda_college_email)) {
            var str_msg = "DB system error UPDATE MRKT_MEDIA_COLLEGE - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktMediaCollege(mrkt_media_id, mrkt_request_id, mda_college_email) === "") {
            var str_msg = "DB system error INSERT MRKT_MEDIA_COLLEGE";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_media_log += getDataValueChange(objPre_Media_Param.get_MediaCollege_Email(), mda_college_email, "Collegewide Email (sent to faculty/staff only)");
    return true;
}

function updateMrktMediaSherpa() {
    var mda_sherpa_email = $.trim($('#mda_sherpa_email').val());
    
    var result = new Array();
    result = db_getMrktMediaSherpaByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktMediaSherpaByReqID(mrkt_request_id, mda_sherpa_email)) {
            var str_msg = "DB system error UPDATE MRKT_MEDIA_SHERPA - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktMediaSherpa(mrkt_media_id, mrkt_request_id, mda_sherpa_email) === "") {
            var str_msg = "DB system error INSERT MRKT_MEDIA_SHERPA";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_media_log += getDataValueChange(objPre_Media_Param.get_MediaSherpa_Email(), mda_sherpa_email, "Sherpa Email (sent to students)");
    return true;
}

function updateMrktMediaMonitor() {
    var mda_monitor_start_date = $('#mda_monitor_start_date').find('input').val();
    var mda_monitor_end_date = $('#mda_monitor_end_date').find('input').val();
    
    var result = new Array();
    result = db_getMrktMediaMonitorByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktMediaMonitorByReqID(mrkt_request_id, mda_monitor_start_date, mda_monitor_end_date)) {
            var str_msg = "DB system error UPDATE MRKT_MEDIA_MONITOR - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktMediaMonitor(mrkt_media_id, mrkt_request_id, mda_monitor_start_date, mda_monitor_end_date) === "") {
            var str_msg = "DB system error INSERT MRKT_MEDIA_MONITOR";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_media_log += getDataValueChange(objPre_Media_Param.get_MediaMonitor_StartDate(), mda_monitor_start_date, "Monitor Slide Start Date");
    mrkt_media_log += getDataValueChange(objPre_Media_Param.get_MediaMonitor_EndDate(), mda_monitor_end_date, "Monitor Slide End Date");
    return true;
}

function updateMrktMediaPost() {
    var mda_soc_media_date = $('#mda_soc_media_date').find('input').val();
    
    var result = new Array();
    result = db_getMrktMediaPostByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktMediaPostByReqID(mrkt_request_id, mda_soc_media_date)) {
            var str_msg = "DB system error UPDATE MRKT_MEDIA_POST - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktMediaPost(mrkt_media_id, mrkt_request_id, mda_soc_media_date) === "") {
            var str_msg = "DB system error INSERT MRKT_MEDIA_POST";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_media_log += getDataValueChange(objPre_Media_Param.get_MediaPost_PostDate(), mda_soc_media_date, "Social Media Post Date");
    return true;
}

function updateMrktMediaCollegeEntrance() {
    var mda_entrance_start_date = $('#mda_college_entrance_start_date').find('input').val();
    var mda_entrance_end_date = $('#mda_college_entrance_end_date').find('input').val();
    
    var result = new Array();
    result = db_getMrktMediaEntranceByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktMediaEntranceByReqID(mrkt_request_id, mda_entrance_start_date, mda_entrance_end_date)) {
            var str_msg = "DB system error UPDATE MRKT_MEDIA_ENTRANCE - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktMediaEntrance(mrkt_media_id, mrkt_request_id, mda_entrance_start_date, mda_entrance_end_date) === "") {
            var str_msg = "DB system error INSERT MRKT_MEDIA_ENTRANCE";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_media_log += getDataValueChange(objPre_Media_Param.get_MediaEntrance_StartDate(), mda_entrance_start_date, "College Entrance Marquees Start Date");
    mrkt_media_log += getDataValueChange(objPre_Media_Param.get_MediaEntrance_EndDate(), mda_entrance_end_date, "College Entrance Marquees End Date");
    return true;
}

function deleteMrktMediaCollege() {
    if (!db_deleteMrktMediaCollegeByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_COLLEGE - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktMediaSherpa() {
    if (!db_deleteMrktMediaSherpaByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_SHERPA - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktMediaMonitor() {
    if (!db_deleteMrktMediaMonitorByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_MONITOR - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktMediaPost() {
    if (!db_deleteMrktMediaPostByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_POST - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktMediaEntrance() {
    if (!db_deleteMrktMediaEntranceByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_ENTRANCE - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateWebTaskSection() {
    mrkt_web_log = "";
    var web_date_needed = $('#web_date_needed').find('input').val();
    var ckb_web_create_new = ($('#ckb_web_create_new').is(':checked') ? true : false);
    var ckb_web_update_existing = ($('#ckb_web_update_existing').is(':checked') ? true : false);
    var ckb_web_update_url = $.trim($('#web_update_existing_url').val());
    var ckb_web_add_page = ($('#ckb_web_add_page').is(':checked') ? true : false);
    var ckb_web_add_url = $.trim($('#web_add_page_url').val());
    var ckb_web_request_website = ($('#ckb_web_request_website').is(':checked') ? true : false);
    var ckb_web_report_problem = ($('#ckb_web_report_problem').is(':checked') ? true : false);
    
    if (!ckb_web_update_existing) {
        ckb_web_update_url = "";
    }
    if (!ckb_web_add_page) {
        ckb_web_add_url = "";
    }
    
    if (!db_updateMrktWebByReqID(mrkt_request_id, mrkt_web_admin_id, mrkt_web_status_id, web_date_needed, ckb_web_create_new, ckb_web_update_existing, ckb_web_update_url,
                                        ckb_web_add_page, ckb_web_add_url, ckb_web_request_website, ckb_web_report_problem)) {
        var str_msg = "DB system error UPDATE MRKT_WEB - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    
    mrkt_web_log += getDataValueChange(objPre_Web_Param.get_WebDateNeeded(), web_date_needed, "Estimated Launch Date has been changed");
    mrkt_web_log += getCheckBoxChange(objPre_Web_Param.get_ckbWebCreateNew(), ckb_web_create_new, "Request New Website");
    mrkt_web_log += getCheckBoxChange(objPre_Web_Param.get_ckbWebUpdateExisting(), ckb_web_update_existing, "Update Existing Webpage");
    if (ckb_web_update_existing) {
        mrkt_web_log += getDataValueChange(objPre_Web_Param.get_ckbWebUpdateUrl(), ckb_web_update_url, "Update Existing Webpage URL");
    }
    mrkt_web_log += getCheckBoxChange(objPre_Web_Param.get_ckbWebAddPage(), ckb_web_add_page, "Add or Remove Page to Existing Webstie");
    if (ckb_web_add_page) {
        mrkt_web_log += getDataValueChange(objPre_Web_Param.get_ckbWebAddUrl(), ckb_web_add_url, "Add or Remove Page to Existing Website URL");
    }
    mrkt_web_log += getCheckBoxChange(objPre_Web_Param.get_ckbWebRequestWebsite(), ckb_web_request_website, "Request Website Feature");
    mrkt_web_log += getCheckBoxChange(objPre_Web_Param.get_ckbWebReportProblem(), ckb_web_report_problem, "Report Problem/Correction");
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateVideoTaskSection() {
    mrkt_video_log = "";
    var vdo_due_date = $('#vdo_due_date').find('input').val();
    var ckb_vdo_filming_request = ($('#ckb_vdo_filming_request').is(':checked') ? true : false);
    var ckb_vdo_other = ($('#ckb_vdo_other').is(':checked') ? true : false);
    
    if (!db_updateMrktVideoByReqID(mrkt_request_id, mrkt_video_admin_id, mrkt_video_status_id, vdo_due_date, ckb_vdo_filming_request, ckb_vdo_other)) {
        var str_msg = "DB system error UPDATE MRKT_VIDEO - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    mrkt_video_log += getDataValueChange(objPre_Video_Param.get_VdoDueDate(), vdo_due_date, "Due Date has been changed");
    
    mrkt_video_log += getCheckBoxChange(objPre_Video_Param.get_ckbVdoFilmingRequest(), ckb_vdo_filming_request, "Filming Request");
    if (ckb_vdo_filming_request) {
        if (!updateMrktVideoFilming()) {
            return false;
        }
    }
    else {
        if (!deleteMrktVideoFilming()) {
            return false;
        }
    }
    mrkt_video_log += getCheckBoxChange(objPre_Video_Param.get_ckbVdoOther(), ckb_vdo_other, "Other");
    if (ckb_vdo_other) {
        if (!updateMrktVideoOther()) {
            return false;
        }
    }
    else {
        if (!deleteMrktVideoOther()) {
            return false;
        }
    }
    return true;
}

function updateMrktVideoFilming() {
    var vdo_filming_date = $('#vdo_filming_date').find('input').val();
    var vdo_filming_time = $('#vdo_filming_time').find('input').val();
    var vdo_filming_location = $.trim($('#vdo_filming_location').val());
    var vdo_filming_purpose = $.trim($('#vdo_filming_purpose').val());
    var vdo_filming_estimate_time = $.trim($('#vdo_filming_estimate_time').val());
    
    var result = new Array();
    result = db_getMrktVideoFilmingByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktVideoFilmingByReqID(mrkt_request_id, vdo_filming_date, vdo_filming_time, vdo_filming_location, vdo_filming_purpose, vdo_filming_estimate_time)) {
            var str_msg = "DB system error UPDATE MRKT_VIDEO_FILMING - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktVideoFilming(mrkt_video_id, mrkt_request_id, vdo_filming_date, vdo_filming_time, vdo_filming_location, vdo_filming_purpose, vdo_filming_estimate_time) === "") {
            var str_msg = "DB system error INSERT MRKT_VIDEO_FILMING";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_video_log += getDataValueChange(objPre_Video_Param.get_VideoFilming_EventDate(), vdo_filming_date, "Event Date");
    mrkt_video_log += getDataValueChange(objPre_Video_Param.get_VideoFilming_EventTime(), vdo_filming_time, "Event Time");
    mrkt_video_log += getDataValueChange(objPre_Video_Param.get_VideoFilming_Location(), vdo_filming_location, "Location");
    mrkt_video_log += getDataValueChange(objPre_Video_Param.get_VideoFilming_Purpose(), vdo_filming_purpose, "Purpose");
    mrkt_video_log += getDataValueChange(objPre_Video_Param.get_VideoFilming_EstimateTime(), vdo_filming_estimate_time, "Estimated Time Required");
    return true;
}

function updateMrktVideoOther() {
    var vdo_other_descrip = $.trim($('#vdo_other_descrip').val());
    
    var result = new Array();
    result = db_getMrktVideoOtherByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktVideoOtherByReqID(mrkt_request_id, vdo_other_descrip)) {
            var str_msg = "DB system error UPDATE MRKT_VIDEO_OTHER - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktVideoOther(mrkt_video_id, mrkt_request_id, vdo_other_descrip) === "") {
            var str_msg = "DB system error INSERT MRKT_VIDEO_OTHER";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    mrkt_video_log += getDataValueChange(objPre_Video_Param.get_VideoOther_Other(), vdo_other_descrip, "Other (Please Describe)");
    return true;
}

function deleteMrktVideoFilming() {
    if (!db_deleteMrktVideoFilmingByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_FILMING - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktVideoOther() {
    if (!db_deleteMrktVideoOtherByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_OTHER - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateEditorialTaskSection() {
    mrkt_editorial_log = "";
    var edt_due_date = $('#edt_due_date').find('input').val();
    var ckb_edt_copywriting = ($('#ckb_edt_copywriting').is(':checked') ? true : false);
    var ckb_edt_proofreading = ($('#ckb_edt_proofreading').is(':checked') ? true : false);
    
    var edt_copywriting_date_needed = null;
    var edt_proofreading_date_needed = null;
    
    if (ckb_edt_copywriting) {
        edt_copywriting_date_needed = $('#edt_copywriting_date_needed').find('input').val();
    }
    if (ckb_edt_proofreading) {
        edt_proofreading_date_needed = $('#edt_proofreading_date_needed').find('input').val();
    }
    
    if (!db_updateMrktEditorialByReqID(mrkt_request_id, mrkt_editorial_admin_id, mrkt_editorial_status_id, edt_due_date, ckb_edt_copywriting, edt_copywriting_date_needed, ckb_edt_proofreading, edt_proofreading_date_needed)) {
        var str_msg = "DB system error UPDATE MRKT_EDITORIAL - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    
    mrkt_editorial_log += getDataValueChange(objPre_Editorial_Param.get_EdtDueDate(), edt_due_date, "Due Date has been changed");
    mrkt_editorial_log += getCheckBoxChange(objPre_Editorial_Param.get_ckbEdtCopywriting(), ckb_edt_copywriting, "Copywriting - Date Needed By");
    if (ckb_edt_copywriting) {
        mrkt_editorial_log += getDataValueChange(objPre_Editorial_Param.get_EdtCWDateNeeded(), edt_copywriting_date_needed, "Copywriting - Date Needed By");
    }
    mrkt_editorial_log += getCheckBoxChange(objPre_Editorial_Param.get_ckbEdtProofreading(), ckb_edt_proofreading, "Proofreading - Date Needed By");
    if (ckb_edt_proofreading) {
        mrkt_editorial_log += getDataValueChange(objPre_Editorial_Param.get_EdtPRDateNeeded(), edt_proofreading_date_needed, "Proofreading - Date Needed By");
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clearHiddenMrktPrintSection() {
    $('#prt_ad_size').val('');
    $('#prt_bro_qty').val('');
    $('#prt_ban_qty').val('');
    $('#prt_fly_qty').val('');
    $('#prt_cer_qty').val('');
    $('#prt_pcd_size').val('');
    $('#prt_pcd_qty').val('');
    $('#ckb_prt_pst_11_17').iCheck('uncheck');
    $('#prt_pst_11_17_qty').val('');
    $('#ckb_prt_pst_22_28').iCheck('uncheck');
    $('#prt_pst_22_28_qty').val('');
    $('#ckb_prt_pst_other').iCheck('uncheck');
    $('#prt_pst_other_qty').val('');
    $('#prt_pst_other_size').val('');
    $('#prt_prg_qty').val('');
    $('#prt_oth_descrip').val('');
    $('#prt_web_grap_descrip').val('');
    $('#prt_web_grap_dimensions').val('');
}

function clearHiddenMrktMediaSection() {
    $('#mda_college_email').val('');
    $('#mda_sherpa_email').val('');
    $('#mda_monitor_start_date').data("DateTimePicker").date(null);
    $('#mda_monitor_end_date').data("DateTimePicker").date(null);
    $('#mda_soc_media_date').data("DateTimePicker").date(null);
    $('#mda_college_entrance_start_date').data("DateTimePicker").date(null);
    $('#mda_college_entrance_end_date').data("DateTimePicker").date(null);
}

function clearHiddenMrktWebSection() {
    $('#web_update_existing_url').val('');
    $('#web_add_page_url').val('');
}

function clearHiddenMrktVideoSection() {
    $('#vdo_filming_date').data("DateTimePicker").date(null);
    $('#vdo_filming_time').val('');
    $('#vdo_filming_location').val('');
    $('#vdo_filming_purpose').val('');
    $('#vdo_filming_estimate_time').val('');
    $('#vdo_other_descrip').val('');
}