var m_previous_url = "";
var m_administrator = false;
var m_task_staff = false;
var m_admin_id = "";

var mrkt_request_id = "";
var mrkt_print_id = "";
var mrkt_photo_id = "";
var mrkt_media_id = "";
var mrkt_web_id = "";
var mrkt_video_id = "";
var mrkt_editorial_id = "";

var pre_prt_date_need = "";
var pre_pht_event_date = "";
var pre_pht_event_time = "";
var pre_mda_monitor_start_date = "";
var pre_mda_monitor_end_date = "";
var pre_mda_college_entrance_start_date = "";
var pre_mda_college_entrance_end_date = "";
var pre_mda_soc_media_date = "";
var pre_web_date_needed = "";
var pre_vdo_filming_date = "";
var pre_vdo_filming_time = "";
var pre_edt_copywriting_date_needed = "";
var pre_edt_proofreading_date_needed = "";

var m_table;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        setActiveNavMenu();
        isLoginAdmin();
        getLoginInfo();
        
        if(!getMrktRequestID()) {
            window.open('home.html', '_self');
            return false;
        }
        else {
            getTaskStatusListActive();
            getMrktRequest();
            setAdminTaskStaffAssign();
            getMrktTask();
            setTaskStaffStatus();
            getMrktProcessLog();
            getTransactions();
        }
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
    
    // datepicker initialize ///////////////////////////////////////////////////
    $('.ivcmarkt_date_only_format').datetimepicker({ format: 'MM/DD/YYYY', useCurrent: false, daysOfWeekDisabled: [0,6], ignoreReadonly: true }); 
    $('.ivcmarkt_time_only_format').datetimepicker({ format: 'LT', ignoreReadonly: true }); 
    
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
        return false;
    });
    
    // ivc tech support click //////////////////////////////////////////////////
    $('#nav_ivc_tech').click(function() {
        capture();
        $('#mod_ivc_tech_problems').val("");
        $('#mod_ivc_tech_img_screen').prop('src', str_img);
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
        
        startSpinning();
        setTimeout(function() {
            if (!insertMrktPrintFile()) {
                stopSpinning();
                return false;
            }
            if (!updateMrktPrintStatus(print_status_id)) {
                stopSpinning();
                return false;
            }
            if (!insertMrktProcessLog(task_print_id, print_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning();
                return false;
            }
            if (print_file_name !== "") {
                print_file_name = "\nPrint/Graphics project file has been attached: " + print_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Print/Graphics status has been updated: " + print_status_name + print_file_name + task_note)) {
                stopSpinning();
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning();
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (print_status_id === status_complete_id || print_status_id === status_cancel_id) {
                stopSpinning();
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
                
                stopSpinning();        
                swal({title: "Updated", text: "Print/Graphics status has been updated successfuly", type: "success"});
            }
        }, 1500);
        
        this.blur();
        return false;
    });
    
    // task photo status update button click ///////////////////////////////////
    $('#btn_task_photo_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var photo_status_id = $('#task_photo_status_list').val();
        var photo_status_name = $('#task_photo_status_list option:selected').text();
        var photo_file_name = getMrktPhotoFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning();
        setTimeout(function() {
            if (!insertMrktPhotoFile()) {
                stopSpinning();
                return false;
            }
            if (!updateMrktPhotoStatus(photo_status_id)) {
                stopSpinning();
                return false;
            }
            if (!insertMrktProcessLog(task_photo_id, photo_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning();
                return false;
            }
            if (photo_file_name !== "") {
                photo_file_name = "\nPhotography project file has been attached: " + photo_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Photography status has been updated: " + photo_status_name + photo_file_name + task_note)) {
                stopSpinning();
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning();
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (photo_status_id === status_complete_id || photo_status_id === status_cancel_id) {
                stopSpinning();
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
                
                stopSpinning();
                swal({title: "Updated", text: "Photography status has been updated successfuly", type: "success"});
            }
        }, 1500);

        this.blur();
        return false;
    });
    
    // task media status update button click ///////////////////////////////////
    $('#btn_task_media_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var media_status_id = $('#task_media_status_list').val();
        var media_status_name = $('#task_media_status_list option:selected').text();
        var media_file_name = getMrktMediaFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning();
        setTimeout(function() {
            if (!insertMrktMediaFile()) {
                stopSpinning();
                return false;
            }
            if (!updateMrktMediaStatus(media_status_id)) {
                stopSpinning();
                return false;
            }
            if (!insertMrktProcessLog(task_media_id, media_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning();
                return false;
            }
            if (media_file_name !== "") {
                media_file_name = "\nSocial Media/Publicity project file has been attached: " + media_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Social Media/Publicity status has been updated: " + media_status_name + media_file_name + task_note)) {
                stopSpinning();
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning();
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (media_status_id === status_complete_id || media_status_id === status_cancel_id) {
                stopSpinning();
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
                
                stopSpinning();
                swal({title: "Updated", text: "Social Media/Publicity status has been updated successfuly", type: "success"});
            }
        }, 1500);

        this.blur();
        return false;
    });
    
    // task web status update button click /////////////////////////////////////
    $('#btn_task_web_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var web_status_id = $('#task_web_status_list').val();
        var web_status_name = $('#task_web_status_list option:selected').text();
        var web_file_name = getMrktWebFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning();
        setTimeout(function() {
            if (!insertMrktWebFile()) {
                stopSpinning();
                return false;
            }
            if (!updateMrktWebStatus(web_status_id)) {
                stopSpinning();
                return false;
            }
            if (!insertMrktProcessLog(task_web_id, web_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning();
                return false;
            }
            if (web_file_name !== "") {
                web_file_name = "\nWeb Services project file has been attached: " + web_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Web Services status has been updated: " + web_status_name + web_file_name + task_note)) {
                stopSpinning();
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning();
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (web_status_id === status_complete_id || web_status_id === status_cancel_id) {
                stopSpinning();
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
                
                stopSpinning();
                swal({title: "Updated", text: "Web Services status has been updated successfuly", type: "success"});
            }
        }, 1500);

        this.blur();
        return false;
    });
    
    // task video status update button click ///////////////////////////////////
    $('#btn_task_video_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var video_status_id = $('#task_video_status_list').val();
        var video_status_name = $('#task_video_status_list option:selected').text();
        var video_file_name = getMrktVideoFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning();
        setTimeout(function() {
            if (!insertMrktVideoFile()) {
                stopSpinning();
                return false;
            }
            if (!updateMrktVideoStatus(video_status_id)) {
                stopSpinning();
                return false;
            }
            if (!insertMrktProcessLog(task_video_id, video_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning();
                return false;
            }
            if (video_file_name !== "") {
                video_file_name = "\nVideo project file has been attached: " + video_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Video status has been updated: " + video_status_name + video_file_name + task_note)) {
                stopSpinning();
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning();
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }

            if (video_status_id === status_complete_id || video_status_id === status_cancel_id) {
                stopSpinning();
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
                
                stopSpinning();
                swal({title: "Updated", text: "Video status has been updated successfuly", type: "success"});
            }
        }, 1500);

        this.blur();
        return false;
    });
    
    // task editorial status update button click ///////////////////////////////
    $('#btn_task_editorial_status_update').click(function() {
        var mrkt_req_status_id = $('#mrkt_req_status_list').val();
        var editorial_status_id = $('#task_editorial_status_list').val();
        var editorial_status_name = $('#task_editorial_status_list option:selected').text();
        var editorial_file_name = getMrktEditorialFileName();
        var task_note = $.trim($('#task_status_note').val());
        
        startSpinning();
        setTimeout(function() {
            if (!insertMrktEditorialFile()) {
                stopSpinning();
                return false;
            }
            if (!updateMrktEditorialStatus(editorial_status_id)) {
                stopSpinning();
                return false;
            }
            if (!insertMrktProcessLog(task_editorial_id, editorial_status_id, task_note, getMrktProcessLogPreLogID())) {
                stopSpinning();
                return false;
            }
            if (editorial_file_name !== "") {
                editorial_file_name = "\nEditorial Services project file has been attached: " + editorial_file_name;
            }
            if (task_note !== "") {
                task_note = "\n" + task_note;
            }
            if (!insertTransaction("Editorial Services status has been updated: " + editorial_status_name + editorial_file_name + task_note)) {
                stopSpinning();
                return false;
            }
            if (mrkt_req_status_id !== status_task_partially_assigned_id) {
                var status_id = getAllTaskProjectStatus();
                if (!updateMrktRequestStatus(status_id)) {
                    stopSpinning();
                    return false;
                }
                if (mrkt_req_status_id !== status_id) {
                    if (!systemEmailNotification(mrkt_request_id, status_id, null, task_note)) {
                        return false;
                    }
                }
            }
            
            if (editorial_status_id === status_complete_id || editorial_status_id === status_cancel_id) {
                stopSpinning();
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
                
                stopSpinning();
                swal({title: "Updated", text: "Editorial Services status has been updated successfuly", type: "success"});
            }
        }, 1500);

        this.blur();
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
    // task print date needed update click /////////////////////////////////////
    $('#btn_update_prt_date_need').click(function(e) {
        e.preventDefault();
        var new_prt_date_need = $('#prt_date_need_edit').find('input').val();
        if (!updateMrktPrintDateNeeded(new_prt_date_need)) {
            return false;
        }
        if (!insertTransaction("Print/Graphics Date Needed updated from " + pre_prt_date_need + " to " + new_prt_date_need)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "PRINT/GRAPHICS Date Needed updated", "success");
        return false;
    });
    
    // task photography event date update click ////////////////////////////////
    $('#btn_update_pht_event_date').click(function(e) {
        e.preventDefault();
        var new_pht_event_date = $('#pht_event_date_edit').find('input').val();
        if (!updateMrktPhotoEventDate(new_pht_event_date)) {
            return false;
        }
        if (!insertTransaction("Photography Event Date updated from " + pre_pht_event_date + " to " + new_pht_event_date)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "PHOTOGRAPHY Event Date updated", "success");
        return false;
    });
    
    // task photography event time update click ////////////////////////////////
    $('#btn_update_pht_event_time').click(function(e) {
        e.preventDefault();
        var new_pht_event_time = $('#pht_event_time_edit').find('input').val();
        if (!updateMrktPhotoEventTime(new_pht_event_time)) {
            return false;
        }
        if (!insertTransaction("Photography Event Time updated from " + pre_pht_event_time + " to " + new_pht_event_time)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "PHOTOGRAPHY Event Time updated", "success");
        return false;
    });
    
    // task social media monitor start date update click ///////////////////////
    $('#btn_update_mda_monitor_start_date').click(function(e) {
        e.preventDefault();
        var new_mda_monitor_start_date = $('#mda_monitor_start_date_edit').find('input').val();
        if (!updateMrktMediaMonitorStartDate(new_mda_monitor_start_date)) {
            return false;
        }
        if (!insertTransaction("Social Media/Publicity Monitor Slide Start Date updated from " + pre_mda_monitor_start_date + " to " + new_mda_monitor_start_date)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "SOCIAL MEDIA/PUBLICITY Monitor Slide Start Date updated", "success");
        return false;
    });
    
    // task social media monitor end date update click /////////////////////////
    $('#btn_update_mda_monitor_end_date').click(function(e) {
        e.preventDefault();
        var new_mda_monitor_end_date = $('#mda_monitor_end_date_edit').find('input').val();
        if (!updateMrktMediaMonitorEndDate(new_mda_monitor_end_date)) {
            return false;
        }
        if (!insertTransaction("Social Media/Publicity Monitor Slide End Date updated from " + pre_mda_monitor_end_date + " to " + new_mda_monitor_end_date)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "SOCIAL MEDIA/PUBLICITY Monitor Slide End Date updated", "success");
        return false;
    });
    
    // task social media post date update click ////////////////////////////////
    $('#btn_update_mda_soc_media_date').click(function(e) {
        e.preventDefault();
        var new_mda_soc_media_date = $('#mda_soc_media_date_edit').find('input').val();
        if (!updateMrktWebDateNeeded(new_mda_soc_media_date)) {
            return false;
        }
        if (!insertTransaction("Social Media/Publicity Social Media Post Date updated from " + pre_mda_soc_media_date + " to " + new_mda_soc_media_date)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "SOCIAL MEDIA/PUBLICITY Social Media Post Date updated", "success");
        return false;
    });

    // task social media college entrance start date update click ///////////////////////
    $('#btn_update_mda_college_entrance_start_date').click(function(e) {
        e.preventDefault();
        var new_mda_college_entrance_start_date = $('#mda_college_entrance_start_date_edit').find('input').val();
        if (!updateMrktMediaCollegeEntranceStartDate(new_mda_college_entrance_start_date)) {
            return false;
        }
        if (!insertTransaction("Social Media/Publicity College Entrance Marquees Start Date updated from " + pre_mda_college_entrance_start_date + " to " + new_mda_college_entrance_start_date)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "SOCIAL MEDIA/PUBLICITY College Entrance Marquees Start Date updated", "success");
        return false;
    });
    
    // task social media college entrance end date update click /////////////////////////
    $('#btn_update_mda_college_entrance_end_date').click(function(e) {
        e.preventDefault();
        var new_mda_college_entrance_end_date = $('#mda_college_entrance_end_date_edit').find('input').val();
        if (!updateMrktMediaCollegeEntranceEndDate(new_mda_college_entrance_end_date)) {
            return false;
        }
        if (!insertTransaction("Social Media/Publicity College Entrance Marquees End Date updated from " + pre_mda_college_entrance_end_date + " to " + new_mda_college_entrance_end_date)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "SOCIAL MEDIA/PUBLICITY College Entrance Marquees End Date updated", "success");
        return false;
    });

    // task web launch date update click ///////////////////////////////////////
    $('#btn_update_web_date_needed').click(function(e) {
        e.preventDefault();
        var new_web_date_needed = $('#web_date_needed_edit').find('input').val();
        if (!updateMrktMediaPostDate(new_web_date_needed)) {
            return false;
        }
        if (!insertTransaction("Web Services Estimated Launch Date updated from " + pre_web_date_needed + " to " + new_web_date_needed)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "WEB SERVICES Estimated Launch Date updated", "success");
        return false;
    });
    
    // task video event date update click ///////////////////////////////////////
    $('#btn_update_vdo_filming_date').click(function(e) {
        e.preventDefault();
        var new_vdo_filming_date = $('#vdo_filming_date_edit').find('input').val();
        if (!updateMrktVideoFilmingEventDate(new_vdo_filming_date)) {
            return false;
        }
        if (!insertTransaction("Video Event Date updated from " + pre_vdo_filming_date + " to " + new_vdo_filming_date)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "VIDEO Event Date updated", "success");
        return false;
    });
    
    // task video event time update click ///////////////////////////////////////
    $('#btn_update_vdo_filming_time').click(function(e) {
        e.preventDefault();
        var new_vdo_filming_time = $('#vdo_filming_time_edit').find('input').val();
        if (!updateMrktVideoFilmingEventTime(new_vdo_filming_time)) {
            return false;
        }
        if (!insertTransaction("Video Event Time updated from " + pre_vdo_filming_time + " to " + new_vdo_filming_time)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "VIDEO Event Time updated", "success");
        return false;
    });
    
    // task editorial copywriting launch date update click //////////////////////
    $('#btn_update_edt_copywriting_date_needed').click(function(e) {
        e.preventDefault();
        var new_edt_copywriting_date_needed = $('#copywriting_date_needed_edit').find('input').val();
        if (!updateMrktEditorialCWDateNeeded(new_edt_copywriting_date_needed)) {
            return false;
        }
        if (!insertTransaction("Editorial Services Copywriting Estimated Launch Date updated from " + pre_edt_copywriting_date_needed + " to " + new_edt_copywriting_date_needed)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "EDITORIAL SERVICES Copywriting Estimated Launch Date updated", "success");
        return false;
    });
    
    // task editorial proofreading launch date update click /////////////////////
    $('#btn_update_edt_proofreading_date_needed').click(function(e) {
        e.preventDefault();
        var new_edt_proofreading_date_needed = $('#proofreading_date_needed_edit').find('input').val();
        if (!updateMrktEditorialPRDateNeeded(new_edt_proofreading_date_needed)) {
            return false;
        }
        if (!insertTransaction("Editorial Services Proof Reading Estimated Launch Date updated from " + pre_edt_proofreading_date_needed + " to " + new_edt_proofreading_date_needed)) {
            return false;
        }
        getTransactions();
        swal("Updated!", "EDITORIAL SERVICES Proof Reading Estimated Launch Date updated", "success");
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
    m_table = $('#tbl_process_log_list').DataTable({ paging: false, bInfo: false, searching: false, bSort: false });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function capture() {    
    html2canvas($('body')).then(function(canvas) { str_img = canvas.toDataURL(); });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function startSpinning() {
    $('.content-wrap').css('opacity', '0.5');
    $('#spinner_loader_img').addClass('preloader__spinner');
    $('#spinner_loader').show();
}

function stopSpinning() {
    $('.content-wrap').css('opacity', '1');
    $('#spinner_loader_img').removeClass('preloader__spinner');
    $('#spinner_loader').hide();
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

function isLoginAdmin() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_mrkt_loginEmail'));
    
    if (result.length === 1 && result[0]['Active'] === "1") {
        m_admin_id = result[0]['AdminID'];
        $('.rpt_mrkt_staff').show();
        $('#nav_sidebar_mrkt_staff').show();
        if (result[0]['AdminPrivilegeID'] === "1" || result[0]['AdminPrivilegeID'] === "2") {
            m_administrator = true;
            $('#nav_sidebar_system').show();
            
            if (result[0]['AdminPrivilegeID'] === "1") {
                $('#nav_sidebar_sys_access_level').show();
                $('#nav_sidebar_sys_task').show();
                $('#master_status_section').show();
            }
        }
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
        getMrktAttachment();
    }
}

function getMrktAttachment() {
    var result = new Array();
    result = db_getMrktAttachmentByReqID(mrkt_request_id);
    if (result.length > 0) {
        $('#req_file_view_section').empty();
        var html = "";
        for (var i = 0; i < result.length; i++) {
            html += setMrktAttachmentHTML(result[i]['MrktAttachmentID'], result[i]['FileName']);
        }
        $('#req_file_view_section').append(html);
        $('#req_file_view_section').show();
    }
}

function setMrktAttachmentHTML(mrkt_attachment_id, file_name) {
    var str_html = "<div class='form-group' id='mrkt_attachment_id_" + mrkt_attachment_id + "'>";
    str_html += "<div class='col-sm-6 col-sm-offset-4'>";
    str_html += "<p class='form-control'>" + file_name + "</p>";
    str_html += "</div>";
    str_html += "<div class='col-sm-1'>";
    str_html += "<button class='col-sm-12 btn btn-info' id='btn_file_download_" + mrkt_attachment_id + "'>Download</button>";
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
        if (m_admin_id === result[0]['AdminID']) {
            m_task_staff = true;
            $('#task_print_status_section').show();
        }

        $('#print_task_staff_list').val(result[0]['AdminID']);
        $('#task_print_status_list').val(result[0]['StatusID']);
        getMrktPrintFileAttachment(result[0]['StatusID']);
        
        if (m_admin_id === result[0]['AdminID'] || m_administrator) {
            $('#prt_date_need_edit').data("DateTimePicker").date(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
            pre_prt_date_need = moment(result[0]['DateNeeded']).format('MM/DD/YYYY');
            $('#edit_prt_date_need_section').show();
        }
        else {
            $('#prt_date_need_view').html(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
            $('#view_prt_date_need_section').show();
        }

        if (result[0]['ckb_prt_ad'] === "1") {
            $("#ckb_prt_ad").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_ad_section').show();
            getMrktPrintAd();
        }
        else {
            $("#ckb_prt_ad").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_brochure'] === "1") {
            $("#ckb_prt_brochure").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");       
            $('#prt_brochure_section').show();
            getMrktPrintBrochure();
        }
        else {
            $("#ckb_prt_brochure").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_banner'] === "1") {
            $("#ckb_prt_banner").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_banner_section').show();
            getMrktPrintBanner();
        }
        else {
            $("#ckb_prt_banner").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_flyer'] === "1") {
            $("#ckb_prt_flyer").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_flyer_section').show();
            getMrktPrintFlyer();
        }
        else {
            $("#ckb_prt_flyer").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_certificate'] === "1") {
            $("#ckb_prt_certificate").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_certificate_section').show();
            getMrktPrintCert();
        }
        else {
            $("#ckb_prt_certificate").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_postcard'] === "1") {
            $("#ckb_prt_postcard").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_postcard_section').show();
            getMrktPrintPostCard();
        }
        else {
            $("#ckb_prt_postcard").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_poster'] === "1") {
            $("#ckb_prt_poster").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_poster_section').show();
            getMrktPrintPoster();
        }
        else {
            $("#ckb_prt_poster").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_program'] === "1") {
            $("#ckb_prt_program").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_program_section').show();
            getMrktPrintProgram();
        }
        else {
            $("#ckb_prt_program").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_other'] === "1") {
            $("#ckb_prt_other").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_other_section').show();
            getMrktPrintOther();
        }
        else {
            $("#ckb_prt_other").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_web_graphic'] === "1") {
            $("#ckb_prt_web_graphic").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_web_graphic_section').show();
            getMrktPrintWGraphic();
        }
        else {
            $("#ckb_prt_web_graphic").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
    }
}

function getMrktPrintAd() {
    var result = new Array();
    result = db_getMrktPrintAdByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_ad_size').html(result[0]['AdSize']);
    }
}

function getMrktPrintBrochure() {
    var result = new Array();
    result = db_getMrktPrintBrochureByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_bro_qty').html(result[0]['Qty']);
    }
}

function getMrktPrintBanner() {
    var result = new Array();
    result = db_getMrktPrintBannerByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_ban_qty').html(result[0]['Qty']);
    }
}

function getMrktPrintFlyer() {
    var result = new Array();
    result = db_getMrktPrintFlyerByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_fly_qty').html(result[0]['Qty']);
    }
}

function getMrktPrintCert() {
    var result = new Array();
    result = db_getMrktPrintCertByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_cer_qty').html(result[0]['Qty']);
    }
}

function getMrktPrintPostCard() {
    var result = new Array();
    result = db_getMrktPrintPostCardByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_pcd_size').html(result[0]['Size']);
        $('#prt_pcd_qty').html(result[0]['Qty']);
    }
}

function getMrktPrintPoster() {
    var result = new Array();
    result = db_getMrktPrintPosterByReqID(mrkt_request_id);
    
    if (result.length === 1) {        
        if (result[0]['ckb_prt_pst_11_17'] === "1") {
            $("#ckb_prt_pst_11_17").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_pst_11_17_qty').html(result[0]['Qty_11_X_17']);
        }
        else {
            $("#ckb_prt_pst_11_17").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_pst_22_28'] === "1") {
            $("#ckb_prt_pst_22_28").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_pst_22_28_qty').html(result[0]['Qty_22_X_28']);
        }
        else {
            $("#ckb_prt_pst_22_28").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_prt_pst_other'] === "1") {
            $("#ckb_prt_pst_other").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#prt_pst_other_qty').html(result[0]['QtyOther']);
            $('#prt_pst_other_size').html(result[0]['SizeOther']);
        }
        else {
            $("#ckb_prt_pst_other").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
    }
}

function getMrktPrintProgram() {
    var result = new Array();
    result = db_getMrktPrintProgramByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_prg_qty').html(result[0]['Qty']);
    }
}

function getMrktPrintOther() {
    var result = new Array();
    result = db_getMrktPrintOtherByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_oth_descrip').html(result[0]['OtherDescrip']);
    }
}

function getMrktPrintWGraphic() {
    var result = new Array();
    result = db_getMrktPrintWGraphicByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_web_grap_descrip').html(result[0]['WebGraphic']);
        $('#prt_web_grap_dimensions').html(result[0]['Dimension']);
    }
}

function getMrktPhoto() {
    var result = new Array();
    result = db_getMrktPhotoByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_photo_id = result[0]['MrktPhotoID'];
        if (m_admin_id === result[0]['AdminID']) {
            m_task_staff = true;
            $('#task_photo_status_section').show();
        }
        
        $('#photo_task_staff_list').val(result[0]['AdminID']);
        $('#task_photo_status_list').val(result[0]['StatusID']);
        getMrktPhotoFileAttachment(result[0]['StatusID']);
        
        if (m_admin_id === result[0]['AdminID'] || m_administrator) {
            $('#pht_event_date_edit').data("DateTimePicker").date(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            pre_pht_event_date = moment(result[0]['EventDate']).format('MM/DD/YYYY');
            $('#pht_event_time_edit').find('input').val(result[0]['EventTime']);
            pre_pht_event_time = result[0]['EventTime'];
            $('#edit_pht_event_date_section').show();
            $('#edit_pht_event_time_section').show();
        }
        else {
            $('#pht_event_date_view').html(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            $('#pht_event_time_view').html(result[0]['EventTime']);
            $('#view_pht_event_date_section').show();
            $('#view_pht_event_time_section').show();
        }    

        $('#pht_event_location').html(result[0]['Location']);
        $('#pht_event_estimate_time').html(result[0]['EstimatedTime']);
    }
}

function getMrktMedia() {
    var result = new Array();
    result = db_getMrktMediaByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_media_id = result[0]['MrktMediaID'];
        $('#media_task_staff_list').val(result[0]['AdminID']);
        $('#task_media_status_list').val(result[0]['StatusID']);
        getMrktMediaFileAttachment(result[0]['StatusID']);
        
        var media_task_staff = false;
        if (m_admin_id === result[0]['AdminID']) {
            m_task_staff = true;
            media_task_staff = true;
            $('#task_media_status_section').show();
        }
        
        if (result[0]['ckb_mda_collegewide_email'] === "1") {
            $("#ckb_mda_collegewide_email").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");            
            $('#mda_collegewide_email_section').show();
            getMrktMediaCollege();
        }
        else {
            $("#ckb_mda_collegewide_email").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_mda_sherpa_email'] === "1") {
            $("#ckb_mda_sherpa_email").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#mda_sherpa_email_section').show();
            getMrktMediaSherpa();
        }
        else {
            $("#ckb_mda_sherpa_email").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_mda_monitor'] === "1") {
            $("#ckb_mda_monitor").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#mda_monitor_section').show();
            getMrktMediaMonitor(media_task_staff);
        }
        else {
            $("#ckb_mda_monitor").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_mda_social_media'] === "1") {
            $("#ckb_mda_social_media").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#mda_social_media_section').show();
            getMrktMediaPost(media_task_staff);
        }
        else {
            $("#ckb_mda_social_media").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_mda_college_entrance'] === "1") {
            $("#ckb_mda_college_entrance").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#mda_college_entrance_section').show();
            getMrktMediaCollegeEntrance(media_task_staff);
        }
        else {
            $("#ckb_mda_college_entrance").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
    }
}

function getMrktMediaCollege() {
    var result = new Array();
    result = db_getMrktMediaCollegeByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#mda_college_email').html(result[0]['CollegeEmail'].replace(/\n/g, "<br/>"));
    }
}

function getMrktMediaSherpa() {
    var result = new Array();
    result = db_getMrktMediaSherpaByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#mda_sherpa_email').html(result[0]['SherpaEmail'].replace(/\n/g, "<br/>"));
    }
}

function getMrktMediaMonitor(media_task_staff) {
    var result = new Array();
    result = db_getMrktMediaMonitorByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (media_task_staff || m_administrator) {
            $('#mda_monitor_start_date_edit').data("DateTimePicker").date(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            pre_mda_monitor_start_date = moment(result[0]['StartDate']).format('MM/DD/YYYY');
            $('#mda_monitor_end_date_edit').data("DateTimePicker").date(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
            pre_mda_monitor_end_date = moment(result[0]['EndDate']).format('MM/DD/YYYY');
            $('#edit_mda_monitor_start_date_section').show();
            $('#edit_mda_monitor_end_date_section').show();
        }
        else {
            $('#mda_monitor_start_date_view').html(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            $('#mda_monitor_end_date_view').html(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
            $('#view_mda_monitor_start_date_section').show();
            $('#view_mda_monitor_end_date_section').show();
        }
    }
}

function getMrktMediaPost(media_task_staff) {
    var result = new Array();
    result = db_getMrktMediaPostByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (media_task_staff || m_administrator) {
            $('#mda_soc_media_date_edit').data("DateTimePicker").date(moment(result[0]['PostDate']).format('MM/DD/YYYY'));
            pre_mda_soc_media_date = moment(result[0]['PostDate']).format('MM/DD/YYYY');
            $('#edit_mda_soc_media_date_section').show();
        }
        else {
            $('#mda_soc_media_date_view').html(moment(result[0]['PostDate']).format('MM/DD/YYYY'));
            $('#view_mda_soc_media_date_section').show();
        }
    }
}

function getMrktMediaCollegeEntrance(media_task_staff) {
    var result = new Array();
    result = db_getMrktMediaEntranceByReqID(mrkt_request_id);

    if (result.length === 1) {
        if (media_task_staff || m_administrator) {
            $('#mda_college_entrance_start_date_edit').data("DateTimePicker").date(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            pre_mda_college_entrance_start_date = moment(result[0]['StartDate']).format('MM/DD/YYYY');
            $('#mda_college_entrance_end_date_edit').data("DateTimePicker").date(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
            pre_mda_college_entrance_end_date = moment(result[0]['EndDate']).format('MM/DD/YYYY');
            $('#edit_mda_college_entrance_start_date_section').show();
            $('#edit_mda_college_entrance_end_date_section').show();
        }
        else {
            $('#mda_college_entrance_start_date_view').html(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
            $('#mda_college_entrance_end_date_view').html(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
            $('#view_mda_college_entrance_start_date_section').show();
            $('#view_mda_college_entrance_end_date_section').show();
        }
    }
}

function getMrktWeb() {
    var result = new Array();
    result = db_getMrktWebByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_web_id = result[0]['MrktWebID'];
        if (m_admin_id === result[0]['AdminID']) {
            m_task_staff = true;
            $('#task_web_status_section').show();
        }
        
        $('#web_task_staff_list').val(result[0]['AdminID']);
        $('#task_web_status_list').val(result[0]['StatusID']);
        getMrktWebFileAttachment(result[0]['StatusID']);
        
        if (m_admin_id === result[0]['AdminID'] || m_administrator) {
            $('#web_date_needed_edit').data("DateTimePicker").date(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
            pre_web_date_needed = moment(result[0]['DateNeeded']).format('MM/DD/YYYY');
            $('#edit_web_date_needed_section').show();
        }
        else {
            $('#web_date_needed_view').html(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
            $('#view_web_date_needed_section').show();
        }
        
        if (result[0]['ckb_web_create_new'] === "1") {
            $("#ckb_web_create_new").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        else {
            $("#ckb_web_create_new").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_web_update_existing'] === "1") {
            $("#ckb_web_update_existing").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#web_update_existing_section').show();
            if (result[0]['ckb_web_update_url'] === "") {
                $('#web_update_existing_url').removeClass('ivcmrkt-text-area-view');
            }
            $('#web_update_existing_url').html(result[0]['ckb_web_update_url']);
        }
        else {
            $("#ckb_web_update_existing").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#web_update_existing_section').hide();
        }
        if (result[0]['ckb_web_add_page'] === "1") {
            $("#ckb_web_add_page").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#web_add_page_section').show();
            if (result[0]['ckb_web_add_url'] === "") {
                $('#ckb_web_add_page_url').removeClass('ivcmrkt-text-area-view');
            }
            $('#ckb_web_add_page_url').html(result[0]['ckb_web_add_url']);
        }
        else {
            $("#ckb_web_add_page").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#web_add_page_section').hide();
        }
        if (result[0]['ckb_web_request_website'] === "1") {
            $("#ckb_web_request_website").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        else {
            $("#ckb_web_request_website").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_web_report_problem'] === "1") {
            $("#ckb_web_report_problem").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        else {
            $("#ckb_web_report_problem").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
    }
}

function getMrktVideo() {
    var result = new Array();
    result = db_getMrktVideoByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_video_id = result[0]['MrktVideoID'];
        $('#video_task_staff_list').val(result[0]['AdminID']);
        $('#task_video_status_list').val(result[0]['StatusID']);
        getMrktVideoFileAttachment(result[0]['StatusID']);
        
        var video_task_staff = false;
        if (m_admin_id === result[0]['AdminID']) {
            m_task_staff = true;
            video_task_staff = true;
            $('#task_video_status_section').show();
        }
        
        if (result[0]['ckb_vdo_filming_request'] === "1") {
            $("#ckb_vdo_filming_request").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#vdo_filming_request_section').show();
            getMrktVideoFilming(video_task_staff);
        }
        else {
            $("#ckb_vdo_filming_request").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_vdo_other'] === "1") {
            $("#ckb_vdo_other").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#vdo_other_section').show();
            getMrktVideoOther();
        }
        else {
            $("#ckb_vdo_other").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
    }
}

function getMrktVideoFilming(video_task_staff) {
    var result = new Array();
    result = db_getMrktVideoFilmingByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (video_task_staff || m_administrator) {
            $('#vdo_filming_date_edit').data("DateTimePicker").date(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            pre_vdo_filming_date = moment(result[0]['EventDate']).format('MM/DD/YYYY');
            $('#vdo_filming_time_edit').find('input').val(result[0]['EventTime']);
            pre_vdo_filming_time = result[0]['EventTime'];
            $('#edit_vdo_filming_date_section').show();
            $('#edit_vdo_filming_time_section').show();
        }
        else {
            $('#vdo_filming_date_view').html(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
            $('#vdo_filming_time_view').html(result[0]['EventTime']);
            $('#view_vdo_filming_date_section').show();
            $('#view_vdo_filming_time_section').show();
        }

        $('#vdo_filming_location').html(result[0]['Location']);   
        $('#vdo_filming_purpose').html(result[0]['Purpose'].replace(/\n/g, "<br/>"));
        $('#vdo_filming_estimate_time').html(result[0]['EstimatedTime']);
    }
}

function getMrktVideoOther() {
    var result = new Array();
    result = db_getMrktVideoOtherByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#vdo_other_descrip').html(result[0]['Other'].replace(/\n/g, "<br/>"));
    }
}

function getMrktEditorial() {
    var result = new Array();
    result = db_getMrktEditorialByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        mrkt_editorial_id = result[0]['MrktEditorialID'];
        if (m_admin_id === result[0]['AdminID']) {
            m_task_staff = true;
            $('#task_editorial_status_section').show();
        }
        
        $('#editorial_task_staff_list').val(result[0]['AdminID']);
        $('#task_editorial_status_list').val(result[0]['StatusID']);
        getMrktEditorialFileAttachment(result[0]['StatusID']);
        
        var editorial_task_staff = false;
        if (m_admin_id === result[0]['AdminID'] || m_administrator) {
            editorial_task_staff = true;
        }
        
        if (result[0]['ckb_edt_copywriting'] === "1") {
            $("#ckb_edt_copywriting").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            if (editorial_task_staff || m_administrator) {
                $('#copywriting_date_needed_edit').data("DateTimePicker").date(moment(result[0]['CWDateNeeded']).format('MM/DD/YYYY'));
                pre_edt_copywriting_date_needed = moment(result[0]['CWDateNeeded']).format('MM/DD/YYYY');
                $('#edit_copywriting_date_needed_section').show();
            }
            else {
                $('#copywriting_date_needed_view').html(moment(result[0]['CWDateNeeded']).format('MM/DD/YYYY'));
                $('#view_copywriting_date_needed_section').show();
            }
            $('#edit_copywriting_checked').show();
        }
        else {
            $("#ckb_edt_copywriting").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#edit_copywriting_unchecked').show();
        }
        if (result[0]['ckb_edt_proofreading'] === "1") {
            $("#ckb_edt_proofreading").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            if (editorial_task_staff || m_administrator) {
                $('#proofreading_date_needed_edit').data("DateTimePicker").date(moment(result[0]['PRDateNeeded']).format('MM/DD/YYYY'));
                pre_edt_proofreading_date_needed = moment(result[0]['PRDateNeeded']).format('MM/DD/YYYY');
                $('#edit_proofreading_date_needed_section').show();
            }
            else {
                $('#proofreading_date_needed_view').html(moment(result[0]['PRDateNeeded']).format('MM/DD/YYYY'));
                $('#view_proofreading_date_needed_section').show();
            }
            $('#edit_proofreading_checked').show();
        }
        else {
            $("#ckb_edt_proofreading").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#edit_proofreading_unchecked').show();
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
    else {
        return "";
    }
}

function getMrktPhotoFileName() {
    var file = $('#task_photo_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    else {
        return "";
    }
}

function getMrktMediaFileName() {
    var file = $('#task_media_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    else {
        return "";
    }
}

function getMrktWebFileName() {
    var file = $('#task_web_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    else {
        return "";
    }
}

function getMrktVideoFileName() {
    var file = $('#task_video_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    else {
        return "";
    }
}

function getMrktEditorialFileName() {
    var file = $('#task_editorial_file_attach').get(0).files[0];
    if (typeof file !== "undefined" && file !== null) {
        return file.name;
    }
    else {
        return "";
    }
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
    else {
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateMrktPrintAdmin(admin_id) {
    if (!db_updateMrktPrintAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_PRINT:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktPhotoAdmin(admin_id) {
    if (!db_updateMrktPhotoAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_PHOTO:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktMediaAdmin(admin_id) {
    if (!db_updateMrktMediaAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktWebAdmin(admin_id) {
    if (!db_updateMrktWebAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_WEB:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktVideoAdmin(admin_id) {
    if (!db_updateMrktVideoAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_VIDEO:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktEditorialAdmin(admin_id) {
    if (!db_updateMrktEditorialAdminByReqID(mrkt_request_id, admin_id)) {
        var str_msg = "DB system error UPDATE MRKT_EDITORIAL:AdminID - MrktRequestID: " + mrkt_request_id + " - AdminID: " + admin_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateMrktPrintStatus(status_id) {
    if (!db_updateMrktPrintStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_PRINT:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktPhotoStatus(status_id) {
    if (!db_updateMrktPhotoStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_PHOTO:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktMediaStatus(status_id) {
    if (!db_updateMrktMediaStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktWebStatus(status_id) {
    if (!db_updateMrktWebStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_WEB:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktVideoStatus(status_id) {
    if (!db_updateMrktVideoStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_VIDEO:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktEditorialStatus(status_id) {
    if (!db_updateMrktEditorialStatusByReqID(mrkt_request_id, status_id)) {
        var str_msg = "DB system error UPDATE MRKT_EDITORIAL:StatusID - MrktRequestID: " + mrkt_request_id + " - StatusID: " + status_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
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
        else {   
            return true;
        }
    }
    else {
        return true;
    }
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
        else {   
            return true;
        }
    }
    else {
        return true;
    }
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
        else {   
            return true;
        }
    }
    else {
        return true;
    }
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
        else {   
            return true;
        }
    }
    else {
        return true;
    }
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
        else {   
            return true;
        }
    }
    else {
        return true;
    }
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
        else {   
            return true;
        }
    }
    else {
        return true;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertMrktProcessLog(task_id, status_id, note, pre_log_id) {
    if (db_insertMrktProcessLog(mrkt_request_id, sessionStorage.getItem('ss_mrkt_loginName'), task_id, status_id, note, pre_log_id) === "") {
        var str_msg = "DB system error INSERT MRKT_PROCESS_LOG - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function insertTransaction(note) {       
    if (db_insertTransaction(mrkt_request_id, sessionStorage.getItem('ss_mrkt_loginName'), note) === "") {
        var str_msg = "DB system error INSERT TRANSACTION - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
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
function updateMrktPrintDateNeeded(prt_date_need) {
    if (!db_updateMrktPrintDateNeededByReqID(mrkt_request_id, prt_date_need)) {
        var str_msg = "DB system error UPDATE MRKT_PRINT DATE_NEEDED: MrktRequestID: " + mrkt_request_id + " - prt_date_need: " + prt_date_need;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktPhotoEventDate(pht_event_date) {
    if (!db_updateMrktPhotoEventDateByReqID(mrkt_request_id, pht_event_date)) {
        var str_msg = "DB system error UPDATE MRKT_PHOTO EVENT_DATE: MrktRequestID: " + mrkt_request_id + " - EventDate: " + pht_event_date;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktPhotoEventTime(pht_event_time) {
    if (!db_updateMrktPhotoEventTimeByReqID(mrkt_request_id, pht_event_time)) {
        var str_msg = "DB system error UPDATE MRKT_PHOTO EVENT_TIME: MrktRequestID: " + mrkt_request_id + " - EventTime: " + pht_event_time;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktMediaMonitorStartDate(mda_monitor_start_date) {
    if (!db_updateMrktMediaMonitorStartDateByReqID(mrkt_request_id, mda_monitor_start_date)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA_MONITOR START_DATE: MrktRequestID: " + mrkt_request_id + " - StartDate: " + mda_monitor_start_date;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktMediaMonitorEndDate(mda_monitor_end_date) {
    if (!db_updateMrktMediaMonitorEndDateByReqID(mrkt_request_id, mda_monitor_end_date)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA_MONITOR END_DATE: MrktRequestID: " + mrkt_request_id + " - EndDate: " + mda_monitor_end_date;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktMediaPostDate(mda_soc_media_date) {
    if (!db_updateMrktMediaPostByReqID(mrkt_request_id, mda_soc_media_date)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA_POST POST_DATE: MrktRequestID: " + mrkt_request_id + " - PostDate: " + mda_soc_media_date;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktMediaCollegeEntranceStartDate(mda_college_entrance_start_date) {
    if (!db_updateMrktMediaEntranceStartDateByReqID(mrkt_request_id, mda_college_entrance_start_date)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA_ENTRANCE START_DATE: MrktRequestID: " + mrkt_request_id + " - StartDate: " + mda_college_entrance_start_date;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktMediaCollegeEntranceEndDate(mda_college_entrance_end_date) {
    if (!db_updateMrktMediaEntranceEndDateByReqID(mrkt_request_id, mda_college_entrance_end_date)) {
        var str_msg = "DB system error UPDATE MRKT_MEDIA_ENTRANCE END_DATE: MrktRequestID: " + mrkt_request_id + " - EndDate: " + mda_college_entrance_end_date;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktWebDateNeeded(web_date_needed) {
    if (!db_updateMrktWebDateNeededByReqID(mrkt_request_id, web_date_needed)) {
        var str_msg = "DB system error UPDATE MRKT_WEB DATE_NEEDED: MrktRequestID: " + mrkt_request_id + " - DateNeeded: " + web_date_needed;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktVideoFilmingEventDate(vdo_filming_date) {
    if (!db_updateMrktVideoFilmingEventDateByReqID(mrkt_request_id, vdo_filming_date)) {
        var str_msg = "DB system error UPDATE MRKT_VIDEO_FILMING EVENT_DATE: MrktRequestID: " + mrkt_request_id + " - EventDate: " + vdo_filming_date;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktVideoFilmingEventTime(vdo_filming_time) {
    if (!db_updateMrktVideoFilmingEventTimeByReqID(mrkt_request_id, vdo_filming_time)) {
        var str_msg = "DB system error UPDATE MRKT_VIDEO_FILMING EVENT_TIME: MrktRequestID: " + mrkt_request_id + " - EventTime: " + vdo_filming_time;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktEditorialCWDateNeeded(edt_copywriting_date_needed) {
    if (!db_updateMrktEditorialCWDateNeededByReqID(mrkt_request_id, edt_copywriting_date_needed)) {
        var str_msg = "DB system error UPDATE MRKT_EDITORIAL CW_DATE_NEEDED: MrktRequestID: " + mrkt_request_id + " - CWDateNeeded: " + edt_copywriting_date_needed;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}

function updateMrktEditorialPRDateNeeded(edt_proofreading_date_needed) {
    if (!db_updateMrktEditorialPRDateNeededByReqID(mrkt_request_id, edt_proofreading_date_needed)) {
        var str_msg = "DB system error UPDATE MRKT_EDITORIAL PR_DATE_NEEDED: MrktRequestID: " + mrkt_request_id + " - PRDateNeeded: " + edt_proofreading_date_needed;
        return dbSystemErrorHandling(str_msg);
    }
    else {
        return true;
    }
}