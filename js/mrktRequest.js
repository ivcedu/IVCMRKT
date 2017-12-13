var m_new_request;
var mrkt_request_id = "";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {        
        isLoginAdmin();
        getLoginInfo();
        
        if(getMrktRequestID()) {
            getMrktRequest();
            getMrktTask();
        }
        else {
            setLoginUserInfo();
        }
    }
    else {
        window.open('login.html', '_self');
        return false;
    }
};

window.onbeforeunload = function () {
    // delete attached file in file system and db for unexpected browser closeing event    
    deleteUnsavedFileAttachment();
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
    $('.ivcmarkt_date_only_format').datetimepicker({ format: 'MM/DD/YYYY', minDate: moment().add(14, 'days').hour(0).minute(0).second(0).millisecond(0), daysOfWeekDisabled: [0,6], ignoreReadonly: true });
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
    
    // main checkbox click event ///////////////////////////////////////////////
    $('#ckb_main_print').on('ifChanged', function() {
        $('#prt_date_need').data("DateTimePicker").date(null);
        if ($('#ckb_main_print').is(':checked')) {
            $('#main_print_section').show();
        }
        else {
            $('#main_print_section').hide();
        }
        return false;
    });

    $('#ckb_main_photo').on('ifChanged', function() {
        $('#pht_event_date').data("DateTimePicker").date(null);
        $('#pht_event_time').find('input').val(null);
        if ($('#ckb_main_photo').is(':checked')) {
            $('#main_photo_section').show();
        }
        else {
            $('#main_photo_section').hide();
        }
        return false;
    });

    $('#ckb_main_media').on('ifChanged', function() {
        if ($('#ckb_main_media').is(':checked')) {
            $('#main_media_section').show();
        }
        else {
            $('#main_media_section').hide();
        }
        return false;
    });

    $('#ckb_main_web').on('ifChanged', function() {
        $('#web_date_needed').data("DateTimePicker").date(null);
        if ($('#ckb_main_web').is(':checked')) {
            $('#main_web_section').show();
        }
        else {
            $('#main_web_section').hide();
        }
        return false;
    });

    $('#ckb_main_video').on('ifChanged', function() {
        if ($('#ckb_main_video').is(':checked')) {
            $('#main_video_section').show();
        }
        else {
            $('#main_video_section').hide();
        }
        return false;
    });

    $('#ckb_main_editorial').on('ifChanged', function() {
        if ($('#ckb_main_editorial').is(':checked')) {
            $('#edt_copywriting_date_needed').data("DateTimePicker").disable();
            $('#edt_copywriting_icon').removeClass('ivcmrkt-bk-color-white');
            $('#edt_copywriting_date_needed').data("DateTimePicker").date(null);
            
            $('#edt_proofreading_date_needed').data("DateTimePicker").disable();
            $('#edt_proofreading_icon').removeClass('ivcmrkt-bk-color-white');
            $('#edt_proofreading_date_needed').data("DateTimePicker").date(null);
            
            $('#main_editorial_section').show();
        }
        else {
            $('#ckb_edt_copywriting').iCheck('uncheck');
            $('#ckb_edt_proofreading').iCheck('uncheck');
            $('#main_editorial_section').hide();
        }
        return false;
    });
    
    // print categories checkbox click event ///////////////////////////////////
    $('#ckb_prt_ad').on('ifChanged', function() {
        if ($('#ckb_prt_ad').is(':checked')) {
            $('#prt_ad_section').show();
        }
        else {
            $('#prt_ad_section').hide();
        }
        return false;
    });
    
    $('#ckb_prt_brochure').on('ifChanged', function() {
        if ($('#ckb_prt_brochure').is(':checked')) {
            $('#prt_brochure_section').show();
        }
        else {
            $('#prt_brochure_section').hide();
        }
        return false;
    });
    
    $('#ckb_prt_banner').on('ifChanged', function() {
        if ($('#ckb_prt_banner').is(':checked')) {
            $('#prt_banner_section').show();
        }
        else {
            $('#prt_banner_section').hide();
        }
        return false;
    });
    
    $('#ckb_prt_flyer').on('ifChanged', function() {
        if ($('#ckb_prt_flyer').is(':checked')) {
            $('#prt_flyer_section').show();
        }
        else {
            $('#prt_flyer_section').hide();
        }
        return false;
    });
    
    $('#ckb_prt_certificate').on('ifChanged', function() {
        if ($('#ckb_prt_certificate').is(':checked')) {
            $('#prt_certificate_section').show();
        }
        else {
            $('#prt_certificate_section').hide();
        }
        return false;
    });
    
    $('#ckb_prt_postcard').on('ifChanged', function() {
        if ($('#ckb_prt_postcard').is(':checked')) {
            $('#prt_postcard_section').show();
        }
        else {
            $('#prt_postcard_section').hide();
        }
        return false;
    });
    
    $('#ckb_prt_poster').on('ifChanged', function() {
        if ($('#ckb_prt_poster').is(':checked')) {
            $('#prt_poster_section').show();
        }
        else {
            $('#prt_poster_section').hide();
        }
        return false;
    });
    
    $('#ckb_prt_program').on('ifChanged', function() {
        if ($('#ckb_prt_program').is(':checked')) {
            $('#prt_program_section').show();
        }
        else {
            $('#prt_program_section').hide();
        }
        return false;
    });
    
    $('#ckb_prt_other').on('ifChanged', function() {
        if ($('#ckb_prt_other').is(':checked')) {
            $('#prt_other_section').show();
        }
        else {
            $('#prt_other_section').hide();
        }
        return false;
    });
    
    $('#ckb_prt_web_graphic').on('ifChanged', function() {
        if ($('#ckb_prt_web_graphic').is(':checked')) {
            $('#prt_web_graphic_section').show();
        }
        else {
            $('#prt_web_graphic_section').hide();
        }
        return false;
    });
    
    // social media categories checkbox click event ////////////////////////////
    $('#ckb_mda_collegewide_email').on('ifChanged', function() {
        if ($('#ckb_mda_collegewide_email').is(':checked')) {
            $('#mda_collegewide_email_section').show();
        }
        else {
            $('#mda_collegewide_email_section').hide();
        }
        return false;
    });
    
    $('#ckb_mda_sherpa_email').on('ifChanged', function() {
        if ($('#ckb_mda_sherpa_email').is(':checked')) {
            $('#mda_sherpa_email_section').show();
        }
        else {
            $('#mda_sherpa_email_section').hide();
        }
        return false;
    });
    
    $('#ckb_mda_monitor').on('ifChanged', function() {
        $('#mda_monitor_start_date').data("DateTimePicker").date(null);
        $('#mda_monitor_end_date').data("DateTimePicker").date(null);
        if ($('#ckb_mda_monitor').is(':checked')) {
            $('#mda_monitor_section').show();
        }
        else {
            $('#mda_monitor_section').hide();
        }
        return false;
    });
    
    $('#ckb_mda_social_media').on('ifChanged', function() {
        $('#mda_soc_media_date').data("DateTimePicker").date(null);
        if ($('#ckb_mda_social_media').is(':checked')) {
            $('#mda_social_media_section').show();
        }
        else {
            $('#mda_social_media_section').hide();
        }
        return false;
    });
    
    $('#ckb_mda_college_entrance').on('ifChanged', function() {
        $('#mda_college_entrance_start_date').data("DateTimePicker").date(null);
        $('#mda_college_entrance_end_date').data("DateTimePicker").date(null);
        if ($('#ckb_mda_college_entrance').is(':checked')) {
            $('#mda_college_entrance_section').show();
        }
        else {
            $('#mda_college_entrance_section').hide();
        }
        return false;
    });
    
    // web services checkbox click event ///////////////////////////////////////
    $('#ckb_web_update_existing').on('ifChanged', function() {
        if ($('#ckb_web_update_existing').is(':checked')) {
            $('#web_update_existing_section').show();
        }
        else {
            $('#web_update_existing_section').hide();
        }
        return false;
    });
    
    $('#ckb_web_add_page').on('ifChanged', function() {
        if ($('#ckb_web_add_page').is(':checked')) {
            $('#web_add_page_section').show();
        }
        else {
            $('#web_add_page_section').hide();
        }
        return false;
    });
    
    // video categories checkbox click event ///////////////////////////////////
    $('#ckb_vdo_filming_request').on('ifChanged', function() {
        $('#vdo_filming_date').data("DateTimePicker").date(null);
        $('#vdo_filming_time').find('input').val(null);
        if ($('#ckb_vdo_filming_request').is(':checked')) {
            $('#vdo_filming_request_section').show();
        }
        else {
            $('#vdo_filming_request_section').hide();
        }
        return false;
    });
    
    $('#ckb_vdo_other').on('ifChanged', function() {
        if ($('#ckb_vdo_other').is(':checked')) {
            $('#vdo_other_section').show();
        }
        else {
            $('#vdo_other_section').hide();
        }
        return false;
    });
    
    // editorial categories checkbox click event ///////////////////////////////
    $('#ckb_edt_copywriting').on('ifChanged', function() {
        $('#edt_copywriting_date_needed').data("DateTimePicker").date(null);
        if ($('#ckb_edt_copywriting').is(':checked')) {
            $('#edt_copywriting_date_needed').data("DateTimePicker").enable();
            $('#edt_copywriting_icon').addClass('ivcmrkt-bk-color-white');
        }
        else {
            $('#edt_copywriting_date_needed').data("DateTimePicker").disable();
            $('#edt_copywriting_icon').removeClass('ivcmrkt-bk-color-white');
        }
        return false;
    });
    
    $('#ckb_edt_proofreading').on('ifChanged', function() {
        $('#edt_proofreading_date_needed').data("DateTimePicker").date(null);
        if ($('#ckb_edt_proofreading').is(':checked')) {
            $('#edt_proofreading_date_needed').data("DateTimePicker").enable();
            $('#edt_proofreading_icon').addClass('ivcmrkt-bk-color-white');
        }
        else {
            $('#edt_proofreading_date_needed').data("DateTimePicker").disable();
            $('#edt_proofreading_icon').removeClass('ivcmrkt-bk-color-white');
        }
        return false;
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // file upload button click ////////////////////////////////////////////////
    $('#btn_file_upload').click(function() {
        if (!mainAttachmentFileValidation()) {
            $('.fileinput').fileinput('clear');
            return false;
        }
        
        startSpinning();
        setTimeout(function() {
            if (!insertMrktAttachment()) {
                return false;
            }
            stopSpinning();
        }, 1500);
        
        this.blur();
        return false;
    });
    
    // file download button click //////////////////////////////////////////////
    $(document).on('click', '[id^="btn_file_download_"]', function() {
        var mrkt_attachment_id = $(this).attr('id').replace("btn_file_download_", "");
        var result = new Array();
        result = db_getMrktAttachmentByID(mrkt_attachment_id);
        
        if (result.length === 1) {
            var site_url = window.location.href.replace("mrktRequest.html", "attach_files/");
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
                        
                        $('#mrkt_attachment_id_' + mrkt_attachment_id).remove();                        
                        if($('#req_file_view_section').is(':empty')) {
                            $('#req_file_view_section').hide();
                        }
                        else {
                            $('#req_file_view_section').show();
                        }
                        swal("Deleted!", "Your attached file has been deleted.", "success"); 
                        return false;
                    }
                });
        return false;
    });
    
    // draft button click //////////////////////////////////////////////////////
    $('#btn_main_draft').click(function() {
        $('html,body').scrollTop(0);
        startSpinning();
        
        setTimeout(function() {
            if (!insertMrktRequest(status_draft_id)) {
                window.open('home.html', '_self');
                return false;
            }
            if (!updateMrktAttachmentReqID()) {
                db_deleteMrktRequestByID(mrkt_request_id);
                window.open('home.html', '_self');
                return false;
            }
            if (!insertTaskSection(status_draft_id)) {
                window.open('home.html', '_self');
                return false;
            }
            
            stopSpinning();
            swal({ title: "Save as Draft", 
                    text: "Your request has been save as Draft successfuly", 
                    type: "success",
                    confirmButtonText: "OK" }, 
                    function() {
                        insertTransaction("Marketing Request has been save as Draft");
                        window.open('home.html', '_self');
                        return false; });
        }, 1500);

        this.blur();
        return false;
    });
    
    // submit button click /////////////////////////////////////////////////////
    $('#btn_main_submit').click(function() {
        $('html,body').scrollTop(0);
        startSpinning();
        
        setTimeout(function() { 
            if (!mainSectionValidation()) {
                stopSpinning();
                return false;
            }
            if (!taskSectionValidation()) {
                stopSpinning();
                return false;
            }
            if (!insertMrktRequest(status_submitted_id)) {
                window.open('home.html', '_self');
                return false;
            }
            if (!updateMrktAttachmentReqID()) {
                db_deleteMrktRequestByID(mrkt_request_id);
                window.open('home.html', '_self');
                return false;
            }
            if (!insertTaskSection(status_submitted_id)) {
                window.open('home.html', '_self');
                return false;
            }
            if (!insertMrktProcessLog()) {
                stopSpinning();
                return false;
            }
            if (!insertTransaction("Marketing Request has been Submitted")) {
                stopSpinning();
                return false;
            }
            if (!systemEmailNotification(mrkt_request_id, status_submitted_id, null, "")) {
                stopSpinning();
                return false;
            }

            stopSpinning();
            swal({ title: "Submitted", 
                   text: "Your request has been submitted successfuly", 
                   type: "success",
                   confirmButtonText: "OK" }, 
                   function() {
                       window.open('home.html', '_self');
                       return false; });
        }, 1500);
        
        this.blur();
        return false;
    });
    
    // cancel button click /////////////////////////////////////////////////////
    $('#btn_main_cancel').click(function() {
        deleteUnsavedFileAttachment();
        window.open('home.html', '_self');
        return false;
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - New Request<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
            $('#mod_ivc_tech_support').modal('hide');
            var str_subject = "Marketing Request: IVC Tech Support Request Error";
            var str_msg = "Home: IVC tech support request error";
            sendEmailToDeveloper(str_subject, str_msg);
            swal("Error!", str_msg + "\nplease contact IVC Tech Support at 949.451.5696", "error");
            return false;
        }
        
        swal("Success!", "Your request has been submitted successfully", "success");
        $('#mod_ivc_tech_support').modal('hide');
        return false;
    });
    
    // ivc tech support image click event //////////////////////////////////////
    $('#mod_ivc_tech_img_screen').click(function() {
        if (str_img !== "") {
            $.fancybox.open({ href: str_img });
        }
        return false;
    });
    
    // get screen shot image ///////////////////////////////////////////////////
    html2canvas($('body'), {
        onrendered: function(canvas) { str_img = canvas.toDataURL("image/jpg"); }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
function isLoginAdmin() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_mrkt_loginEmail'));
    
    if (result.length === 1 && result[0]['Active'] === "1") {
        $('.rpt_mrkt_staff').show();
        $('#nav_sidebar_mrkt_staff').show();
        if (result[0]['AdminPrivilegeID'] === "1" || result[0]['AdminPrivilegeID'] === "2") {
            $('#nav_sidebar_system').show();
            
            if (result[0]['AdminPrivilegeID'] === "1") {
                $('#nav_sidebar_sys_access_level').show();
                $('#nav_sidebar_sys_task').show();
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

function setLoginUserInfo() {
    $('#req_name').val(sessionStorage.getItem('ss_mrkt_loginName'));
    $('#req_email').val(sessionStorage.getItem('ss_mrkt_loginEmail'));
    $('#req_phone').val(sessionStorage.getItem('ss_mrkt_phone'));
    $('#req_depart').val(sessionStorage.getItem('ss_mrkt_department'));
    $('#req_date').val(getToday());
}

function getMrktRequestID() {
    mrkt_request_id = sessionStorage.getItem('ss_mrkt_request_id');
    if (mrkt_request_id === null) {
        m_new_request = true;
        return false;
    }
    else {
        m_new_request = false;
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mainSectionValidation() {
    if (!isValidPhoneNumber($.trim($('#req_phone').val()))) {
        swal({title: "Error", text: "INVALID or Blank phone number\n please use sample format 949-451-5696", type: "error"});
        return false;
    }
    if ($.trim($('#req_title').val()) === "") {
        swal({title: "Error", text: "Request title is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#req_descrip').val()) === "") {
        swal({title: "Error", text: "Describe your request is a required field", type: "error"});
        return false;
    }
    if (!$('#ckb_main_print').is(':checked') && !$('#ckb_main_photo').is(':checked') && !$('#ckb_main_media').is(':checked')
        && !$('#ckb_main_web').is(':checked') && !$('#ckb_main_video').is(':checked') && !$('#ckb_main_editorial').is(':checked')) {
        swal({title: "Error", text: "Please select at least one marketing request category", type: "error"});
        return false;
    }
    return true;
}

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
            else {
                return true;
            }
        }
    }
    else {
        swal({title: "Error", text: "Please select file", type: "error"});
        return false;
    }
}

function taskSectionValidation() {
    if ($('#ckb_main_print').is(':checked')) {
        if (!taskPrintValidation()) {
            return false;
        }
    }
    if ($('#ckb_main_photo').is(':checked')) {
        if (!taskPhotoValidation()) {
            return false;
        }
    }
    if ($('#ckb_main_media').is(':checked')) {
        if (!taskMediaValidation()) {
            return false;
        }
    }
    if ($('#ckb_main_web').is(':checked')) {
        if (!taskWebValidation()) {
            return false;
        }
    }
    if ($('#ckb_main_video').is(':checked')) {
        if (!taskVideoValidation()) {
            return false;
        }
    }
    if ($('#ckb_main_editorial').is(':checked')) {
        if (!taskEditorialValidation()) {
            return false;
        }
    }
    return true;
}

function taskPrintValidation() {
    if ($('#prt_date_need').find('input').val() === "") {
        swal({title: "Error", text: "Print/Graphics Date Needed is a required field", type: "error"});
        return false;
    }
    if (!$('#ckb_prt_ad').is(':checked') && !$('#ckb_prt_brochure').is(':checked') && !$('#ckb_prt_banner').is(':checked')
        && !$('#ckb_prt_flyer').is(':checked') && !$('#ckb_prt_certificate').is(':checked') && !$('#ckb_prt_postcard').is(':checked')
        && !$('#ckb_prt_poster').is(':checked') && !$('#ckb_prt_program').is(':checked') && !$('#ckb_prt_other').is(':checked')
        && !$('#ckb_prt_web_graphic').is(':checked')) {
        swal({title: "Error", text: "Please select at least one Print/Graphics request category", type: "error"});
        return false;
    }    
    if ($('#ckb_prt_ad').is(':checked')) {
        if (!taskPrintAdValidation()) {
            return false;
        }
    }
    if ($('#ckb_prt_brochure').is(':checked')) {
        if (!taskPrintBrochureValidation()) {
            return false;
        } 
    }
    if ($('#ckb_prt_banner').is(':checked')) {
        if (!taskPrintBannerValidation()) {
            return false;
        } 
    }
    if ($('#ckb_prt_flyer').is(':checked')) {
        if (!taskPrintFlyerValidation()) {
            return false;
        } 
    }
    if ($('#ckb_prt_certificate').is(':checked')) {
        if (!taskPrintCertificateValidation()) {
            return false;
        } 
    }
    if ($('#ckb_prt_postcard').is(':checked')) {
        if (!taskPrintPostcardValidation()) {
            return false;
        } 
    }
    if ($('#ckb_prt_poster').is(':checked')) {
        if (!taskPrintPosterValidation()) {
            return false;
        } 
    }
    if ($('#ckb_prt_program').is(':checked')) {
        if (!taskPrintProgramValidation()) {
            return false;
        } 
    }
    if ($('#ckb_prt_other').is(':checked')) {
        if (!taskPrintOtherValidation()) {
            return false;
        } 
    }
    if ($('#ckb_prt_web_graphic').is(':checked')) {
        if (!taskPrintWebGraphicValidation()) {
            return false;
        } 
    }
    return true;
}

function taskPrintAdValidation() {
    if ($.trim($('#prt_ad_size').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Ad Size is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskPrintBrochureValidation() {
    if ($.trim($('#prt_bro_qty').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Brochure Qty is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskPrintBannerValidation() {
    if ($.trim($('#prt_ban_qty').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Banner Qty is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskPrintFlyerValidation() {
    if ($.trim($('#prt_fly_qty').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Flyer Qty is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskPrintCertificateValidation() {
    if ($.trim($('#prt_cer_qty').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Certificate Qty is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskPrintPostcardValidation() {
    if ($.trim($('#prt_pcd_size').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Postcard Size is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#prt_pcd_qty').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Postcard Qty is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskPrintPosterValidation() {
    if (!$('#ckb_prt_pst_11_17').is(':checked') && !$('#ckb_prt_pst_22_28').is(':checked') && !$('#ckb_prt_pst_other').is(':checked')) {
        swal({title: "Error", text: "Please select at least one Print/Graphics Poster category", type: "error"});
        return false;
    }
    if ($('#ckb_prt_pst_11_17').is(':checked')) {
        if ($.trim($('#prt_pst_11_17_qty').val()) === "") {
            swal({title: "Error", text: "Print/Graphics Poster (11 X 17) Qty is a required field", type: "error"});
            return false;
        }
    }
    if ($('#ckb_prt_pst_22_28').is(':checked')) {
        if ($.trim($('#prt_pst_22_28_qty').val()) === "") {
            swal({title: "Error", text: "Print/Graphics Poster (22 X 28) Qty is a required field", type: "error"});
            return false;
        }
    }
    if ($('#ckb_prt_pst_other').is(':checked')) {
        if ($.trim($('#prt_pst_other_qty').val()) === "") {
            swal({title: "Error", text: "Print/Graphics Poster Other Qty is a required field", type: "error"});
            return false;
        }
        if ($.trim($('#prt_pst_other_size').val()) === "") {
            swal({title: "Error", text: "Print/Graphics Poster Other Size is a required field", type: "error"});
            return false;
        }
    }
    return true;
}

function taskPrintProgramValidation() {
    if ($.trim($('#prt_prg_qty').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Program Qty is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskPrintOtherValidation() {
    if ($.trim($('#prt_oth_descrip').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Other (describe) is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskPrintWebGraphicValidation() {
    if ($.trim($('#prt_web_grap_descrip').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Web Graphic is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#prt_web_grap_dimensions').val()) === "") {
        swal({title: "Error", text: "Print/Graphics Web Graphic Dimensions is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskPhotoValidation() {   
    if ($('#pht_event_date').find('input').val() === "") {
        swal({title: "Error", text: "Photograpy Event Date is a required field", type: "error"});
        return false;
    }
    if ($('#pht_event_time').find('input').val() === "") {
        swal({title: "Error", text: "Photograpy Event Time is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#pht_event_location').val()) === "") {
        swal({title: "Error", text: "Photograpy Location is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#pht_event_estimate_time').val()) === "") {
        swal({title: "Error", text: "Photograpy Estimated Time is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskMediaValidation() {
    if (!$('#ckb_mda_collegewide_email').is(':checked') && !$('#ckb_mda_sherpa_email').is(':checked') && !$('#ckb_mda_monitor').is(':checked')
        && !$('#ckb_mda_social_media').is(':checked') && !$('#ckb_mda_college_entrance').is(':checked')) {
        swal({title: "Error", text: "Please select at least one Social Media/Publicity request category", type: "error"});
        return false;
    }
    if ($('#ckb_mda_collegewide_email').is(':checked')) {
        if (!taskMediaCollegewideValidation()) {
            return false;
        }
    }
    if ($('#ckb_mda_sherpa_email').is(':checked')) {
        if (!taskMediaSherpaValidation()) {
            return false;
        }
    }
    if ($('#ckb_mda_monitor').is(':checked')) {
        if (!taskMediaMonitorValidation()) {
            return false;
        }
    }
    if ($('#ckb_mda_social_media').is(':checked')) {
        if (!taskMediaPostValidation()) {
            return false;
        }
    }
    if ($('#ckb_mda_college_entrance').is(':checked')) {
        if (!taskMediaEntranceValidation()) {
            return false;
        }
    }
    return true;
}

function taskMediaCollegewideValidation() {
    if ($.trim($('#mda_college_email').val()) === "") {
        swal({title: "Error", text: "Social Media/Publicity Collegewide Email is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskMediaSherpaValidation() {
    if ($.trim($('#mda_sherpa_email').val()) === "") {
        swal({title: "Error", text: "Social Media/Publicity Sherpa Email is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskMediaMonitorValidation() {
    if ($('#mda_monitor_start_date').find('input').val() === "") {
        swal({title: "Error", text: "Social Media/Publicity Monitor Slide Start Date is a required field", type: "error"});
        return false;
    }
    if ($('#mda_monitor_end_date').find('input').val() === "") {
        swal({title: "Error", text: "Social Media/Publicity Monitor Slide End Date is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskMediaPostValidation() {
    if ($('#mda_soc_media_date').find('input').val() === "") {
        swal({title: "Error", text: "Social Media/Publicity Social Media Post Date is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskMediaEntranceValidation() {
    if ($('#mda_college_entrance_start_date').find('input').val() === "") {
        swal({title: "Error", text: "Social Media/Publicity College Entrance Marquees Start Date is a required field", type: "error"});
        return false;
    }
    if ($('#mda_college_entrance_end_date').find('input').val() === "") {
        swal({title: "Error", text: "Social Media/Publicity College Entrance Marquees End Date is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskWebValidation() {
    if (!$('#ckb_web_create_new').is(':checked') && !$('#ckb_web_update_existing').is(':checked') && !$('#ckb_web_add_page').is(':checked')
        && !$('#ckb_web_request_website').is(':checked') && !$('#ckb_web_report_problem').is(':checked')) {
        swal({title: "Error", text: "Please select at least one Web Services request category", type: "error"});
        return false;
    }
    if ($('#web_date_needed').find('input').val() === "") {
        swal({title: "Error", text: "Web Services Estimated Launch Date is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskVideoValidation() {
    if (!$('#ckb_vdo_filming_request').is(':checked') && !$('#ckb_vdo_other').is(':checked')) {
        swal({title: "Error", text: "Please select at least one Video request category", type: "error"});
        return false;
    }
    if ($('#ckb_vdo_filming_request').is(':checked')) {
        if (!taskVideoFilmingValidation()) {
            return false;
        }
    }
    if ($('#ckb_vdo_other').is(':checked')) {
        if (!taskVideoOtherValidation()) {
            return false;
        }
    }
    return true;
}

function taskVideoFilmingValidation() {
    if ($('#vdo_filming_date').find('input').val() === "") {
        swal({title: "Error", text: "Video Filming Request Event Date is a required field", type: "error"});
        return false;
    }
    if ($('#vdo_filming_time').find('input').val() === "") {
        swal({title: "Error", text: "Video Filming Request Event Time is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#vdo_filming_location').val()) === "") {
        swal({title: "Error", text: "Video Location is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#vdo_filming_purpose').val()) === "") {
        swal({title: "Error", text: "Video Purpose is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#vdo_filming_estimate_time').val()) === "") {
        swal({title: "Error", text: "Video Estimated Time is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskVideoOtherValidation() {
    if ($.trim($('#vdo_other_descrip').val()) === "") {
        swal({title: "Error", text: "Video Other describe is a required field", type: "error"});
        return false;
    }
    return true;
}

function taskEditorialValidation() {
    if (!$('#ckb_edt_copywriting').is(':checked') && !$('#ckb_edt_proofreading').is(':checked')) {
        swal({title: "Error", text: "Please select at least one Editorial Services category", type: "error"});
        return false;
    }
    if ($('#ckb_edt_copywriting').is(':checked')) {
        if ($('#edt_copywriting_date_needed').find('input').val() === "") {
            swal({title: "Error", text: "Editorial Services Copywriting Estimated Launch Date is a required field", type: "error"});
            return false;
        }
    }
    if ($('#ckb_edt_proofreading').is(':checked')) {
        if ($('#edt_proofreading_date_needed').find('input').val() === "") {
            swal({title: "Error", text: "Editorial Services Proof Reading Estimated Launch Date is a required field", type: "error"});
            return false;
        }
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMrktRequest() {
    var result = new Array();
    result = db_getMrktRequestByID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#req_name').val(result[0]['Requestor']);
        $('#req_email').val(result[0]['ReqEmail']);
        $('#req_phone').val(result[0]['ReqPhone']);
        $('#req_depart').val(result[0]['ReqDepart']);
        $('#req_date').val(moment(result[0]['ReqDate']).format('MM/DD/YYYY'));
        $('#req_title').val(result[0]['ReqTitle']);
        autosize.update($('#req_descrip').val(result[0]['Description']));
        getMrktAttachment();
    }
}

function getMrktAttachment() {
    var result = new Array();
    result = db_getMrktAttachmentByReqID(mrkt_request_id);
    
    if (result.length !== 0) {
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
            $('#ckb_main_print').iCheck('check');
            $('#main_print_section').show();
            getMrktPrint();
        }
        if (result[0]['ckbMrktPhoto'] === "1") {
            $('#ckb_main_photo').iCheck('check');
            $('#main_photo_section').show();
            getMrktPhoto();
        }
        if (result[0]['ckbMrktMedia'] === "1") {
            $('#ckb_main_media').iCheck('check');
            $('#main_media_section').show();
            getMrktMedia();
        }
        if (result[0]['ckbMrktWeb'] === "1") {
            $('#ckb_main_web').iCheck('check');
            $('#main_web_section').show();
            getMrktWeb();
        }
        if (result[0]['ckbMrktVideo'] === "1") {
            $('#ckb_main_video').iCheck('check');
            $('#main_video_section').show();
            getMrktVideo();
        }
        if (result[0]['ckbMrktEditorial'] === "1") {
            $('#ckb_main_editorial').iCheck('check');
            $('#main_editorial_section').show();
            getMrktEditorial();
        }
    }
}

function getMrktPrint() {
    var result = new Array();
    result = db_getMrktPrintByReqID(mrkt_request_id);
    
    if (result.length === 1) {        
        $('#prt_date_need').data("DateTimePicker").date(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
        if (result[0]['ckb_prt_ad'] === "1") {
            $('#ckb_prt_ad').iCheck('check');
            $('#prt_ad_section').show();
            getMrktPrintAd();
        }
        if (result[0]['ckb_prt_brochure'] === "1") {
            $('#ckb_prt_brochure').iCheck('check');
            $('#prt_brochure_section').show();
            getMrktPrintBrochure();
        }
        if (result[0]['ckb_prt_banner'] === "1") {
            $('#ckb_prt_banner').iCheck('check');
            $('#prt_banner_section').show();
            getMrktPrintBanner();
        }
        if (result[0]['ckb_prt_flyer'] === "1") {
            $('#ckb_prt_flyer').iCheck('check');
            $('#prt_flyer_section').show();
            getMrktPrintFlyer();
        }
        if (result[0]['ckb_prt_certificate'] === "1") {
            $('#ckb_prt_certificate').iCheck('check');
            $('#prt_certificate_section').show();
            getMrktPrintCert();
        }
        if (result[0]['ckb_prt_postcard'] === "1") {
            $('#ckb_prt_postcard').iCheck('check');
            $('#prt_postcard_section').show();
            getMrktPrintPostCard();
        }
        if (result[0]['ckb_prt_poster'] === "1") {
            $('#ckb_prt_poster').iCheck('check');
            $('#prt_poster_section').show();
            getMrktPrintPoster();
        }
        if (result[0]['ckb_prt_program'] === "1") {
            $('#ckb_prt_program').iCheck('check');
            $('#prt_program_section').show();
            getMrktPrintProgram();
        }
        if (result[0]['ckb_prt_other'] === "1") {
            $('#ckb_prt_other').iCheck('check');
            $('#prt_other_section').show();
            getMrktPrintOther();
        }
        if (result[0]['ckb_prt_web_graphic'] === "1") {
            $('#ckb_prt_web_graphic').iCheck('check');
            $('#prt_web_graphic_section').show();
            getMrktPrintWGraphic();
        }
    }
}

function getMrktPrintAd() {
    var result = new Array();
    result = db_getMrktPrintAdByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_ad_size').val(result[0]['AdSize']);
    }
}

function getMrktPrintBrochure() {
    var result = new Array();
    result = db_getMrktPrintBrochureByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_bro_qty').val(result[0]['Qty']);
    }
}

function getMrktPrintBanner() {
    var result = new Array();
    result = db_getMrktPrintBannerByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_ban_qty').val(result[0]['Qty']);
    }
}

function getMrktPrintFlyer() {
    var result = new Array();
    result = db_getMrktPrintFlyerByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_fly_qty').val(result[0]['Qty']);
    }
}

function getMrktPrintCert() {
    var result = new Array();
    result = db_getMrktPrintCertByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_cer_qty').val(result[0]['Qty']);
    }
}

function getMrktPrintPostCard() {
    var result = new Array();
    result = db_getMrktPrintPostCardByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_pcd_size').val(result[0]['Size']);
        $('#prt_pcd_qty').val(result[0]['Qty']);
    }
}

function getMrktPrintPoster() {
    var result = new Array();
    result = db_getMrktPrintPosterByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (result[0]['ckb_prt_pst_11_17'] === "1") {
            $('#ckb_prt_pst_11_17').iCheck('check');
            $('#prt_pst_11_17_qty').val(result[0]['Qty_11_X_17']);
        }
        if (result[0]['ckb_prt_pst_22_28'] === "1") {
            $('#ckb_prt_pst_22_28').iCheck('check');
            $('#prt_pst_22_28_qty').val(result[0]['Qty_22_X_28']);
        }
        if (result[0]['ckb_prt_pst_other'] === "1") {
            $('#ckb_prt_pst_other').iCheck('check');
            $('#prt_pst_other_qty').val(result[0]['QtyOther']);
            $('#prt_pst_other_size').val(result[0]['SizeOther']);
        }
    }
}

function getMrktPrintProgram() {
    var result = new Array();
    result = db_getMrktPrintProgramByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_prg_qty').val(result[0]['Qty']);
    }
}

function getMrktPrintOther() {
    var result = new Array();
    result = db_getMrktPrintOtherByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_oth_descrip').val(result[0]['OtherDescrip']);
    }
}

function getMrktPrintWGraphic() {
    var result = new Array();
    result = db_getMrktPrintWGraphicByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#prt_web_grap_descrip').val(result[0]['WebGraphic']);
        $('#prt_web_grap_dimensions').val(result[0]['Dimension']);
    }
}

function getMrktPhoto() {
    var result = new Array();
    result = db_getMrktPhotoByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#pht_event_date').data("DateTimePicker").date(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
        $('#pht_event_time').find('input').val(result[0]['EventTime']);
        $('#pht_event_location').val(result[0]['Location']);
        $('#pht_event_estimate_time').val(result[0]['EstimatedTime']);
    }
}

function getMrktMedia() {
    var result = new Array();
    result = db_getMrktMediaByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (result[0]['ckb_mda_collegewide_email'] === "1") {
            $('#ckb_mda_collegewide_email').iCheck('check');
            $('#mda_collegewide_email_section').show();
            getMrktMediaCollege();
        }
        if (result[0]['ckb_mda_sherpa_email'] === "1") {
            $('#ckb_mda_sherpa_email').iCheck('check');
            $('#mda_sherpa_email_section').show();
            getMrktMediaSherpa();
        }
        if (result[0]['ckb_mda_monitor'] === "1") {
            $('#ckb_mda_monitor').iCheck('check');
            $('#mda_monitor_section').show();
            getMrktMediaMonitor();
        }
        if (result[0]['ckb_mda_social_media'] === "1") {
            $('#ckb_mda_social_media').iCheck('check');
            $('#mda_social_media_section').show();
            getMrktMediaPost();
        }
        if (result[0]['ckb_mda_college_entrance'] === "1") {
            $('#ckb_mda_college_entrance').iCheck('check');
            $('#mda_college_entrance_section').show();
            getMrktMediaEntrance();
        }
    }
}

function getMrktMediaCollege() {
    var result = new Array();
    result = db_getMrktMediaCollegeByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        autosize.update($('#mda_college_email').val(result[0]['CollegeEmail']));
    }
}

function getMrktMediaSherpa() {
    var result = new Array();
    result = db_getMrktMediaSherpaByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        autosize.update($('#mda_sherpa_email').val(result[0]['SherpaEmail']));
    }
}

function getMrktMediaMonitor() {
    var result = new Array();
    result = db_getMrktMediaMonitorByReqID(mrkt_request_id);

    if (result.length === 1) {
        $('#mda_monitor_start_date').data("DateTimePicker").date(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
        $('#mda_monitor_end_date').data("DateTimePicker").date(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
    }
}

function getMrktMediaPost() {
    var result = new Array();
    result = db_getMrktMediaPostByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#mda_soc_media_date').data("DateTimePicker").date(moment(result[0]['PostDate']).format('MM/DD/YYYY'));
    }
}

function getMrktMediaEntrance() {
    var result = new Array();
    result = db_getMrktMediaEntranceByReqID(mrkt_request_id);

    if (result.length === 1) {
        $('#mda_college_entrance_start_date').data("DateTimePicker").date(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
        $('#mda_college_entrance_end_date').data("DateTimePicker").date(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
    }
}

function getMrktWeb() {
    var result = new Array();
    result = db_getMrktWebByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#web_date_needed').data("DateTimePicker").date(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
        
        if (result[0]['ckb_web_create_new'] === "1") {
            $('#ckb_web_create_new').iCheck('check');
        }
        if (result[0]['ckb_web_update_existing'] === "1") {
            $('#ckb_web_update_existing').iCheck('check');
        }
        $('#web_update_existing_url').val(result[0]['ckb_web_update_url']);
        if (result[0]['ckb_web_add_page'] === "1") {
            $('#ckb_web_add_page').iCheck('check');
        }
        $('#ckb_web_add_page_url').val(result[0]['ckb_web_add_url']);
        if (result[0]['ckb_web_request_website'] === "1") {
            $('#ckb_web_request_website').iCheck('check');
        }
        if (result[0]['ckb_web_report_problem'] === "1") {
            $('#ckb_web_report_problem').iCheck('check');
        }
    }
}

function getMrktVideo() {
    var result = new Array();
    result = db_getMrktVideoByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (result[0]['ckb_vdo_filming_request'] === "1") {
            $('#ckb_vdo_filming_request').iCheck('check');
            $('#vdo_filming_request_section').show();
            getMrktVideoFilming();
        }
        if (result[0]['ckb_vdo_other'] === "1") {
            $('#ckb_vdo_other').iCheck('check');
            $('#vdo_other_section').show();
            getMrktVideoOther();
        }
    }
}

function getMrktVideoFilming() {
    var result = new Array();
    result = db_getMrktVideoFilmingByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#vdo_filming_date').data("DateTimePicker").date(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
        $('#vdo_filming_time').find('input').val(result[0]['EventTime']);
        $('#vdo_filming_location').val(result[0]['Location']);        
        autosize.update($('#vdo_filming_purpose').val(result[0]['Purpose']));
        $('#vdo_filming_estimate_time').val(result[0]['EstimatedTime']);
    }
}

function getMrktVideoOther() {
    var result = new Array();
    result = db_getMrktVideoOtherByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        autosize.update($('#vdo_other_descrip').val(result[0]['Other']));
    }
}

function getMrktEditorial() {
    var result = new Array();
    result = db_getMrktEditorialByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        if (result[0]['ckb_edt_copywriting'] === "1") {
            $('#ckb_edt_copywriting').iCheck('check');
            $('#edt_copywriting_date_needed').data("DateTimePicker").date(moment(result[0]['CWDateNeeded']).format('MM/DD/YYYY'));
        }
        if (result[0]['ckb_edt_proofreading'] === "1") {
            $('#ckb_edt_proofreading').iCheck('check');
            $('#edt_proofreading_date_needed').data("DateTimePicker").date(moment(result[0]['PRDateNeeded']).format('MM/DD/YYYY'));
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertMrktRequest(status_id) {
    var req_name = $.trim($('#req_name').val());
    var req_email = $.trim($('#req_email').val());
    var req_phone = $('#req_phone').val();
    var req_depart = $.trim($('#req_depart').val());
    var req_date = $('#req_date').val();
    var req_title = $.trim($('#req_title').val());
    var req_descrip = $.trim($('#req_descrip').val());
    
    if (m_new_request) {
        mrkt_request_id = db_insertMrktRequest(status_id, req_name, req_email, req_phone, req_depart, req_date, req_title, req_descrip);
        if (mrkt_request_id === "") {
            var str_msg = "DB system error INSERT MRKT_REQUEST";
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (!db_updateMrktRequestByID(mrkt_request_id, status_id, req_name, req_email, req_phone, req_depart, req_date, req_title, req_descrip)) {
            var str_msg = "DB system error UPDATE MRKT_REQUEST - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    return true;
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
        
        $('.fileinput').fileinput('clear');
        $('#req_file_view_section').append(setMrktAttachmentHTML(mrkt_attachment_id, f_name));
        $('#req_file_view_section').show();
        return true;
    }
    else {
        return false;
    }
}

function insertTaskSection(status_id) {
    var ckb_task_print = ($('#ckb_main_print').is(':checked') ? true : false);
    var ckb_task_photo = ($('#ckb_main_photo').is(':checked') ? true : false);
    var ckb_task_media = ($('#ckb_main_media').is(':checked') ? true : false);
    var ckb_task_web = ($('#ckb_main_web').is(':checked') ? true : false);
    var ckb_task_video = ($('#ckb_main_video').is(':checked') ? true : false);
    var ckb_task_editorial = ($('#ckb_main_editorial').is(':checked') ? true : false);
    
    if (m_new_request) {
        if (db_insertMrktTask(mrkt_request_id, ckb_task_print, ckb_task_photo, ckb_task_media, ckb_task_web, ckb_task_video, ckb_task_editorial) === "") {
            var str_msg = "DB system error INSERT MRKT_TASK";
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (!db_updateMrktTaskByReqID(mrkt_request_id, ckb_task_print, ckb_task_photo, ckb_task_media, ckb_task_web, ckb_task_video, ckb_task_editorial)) {
            var str_msg = "DB system error UPDATE MRKT_TASK - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    if (ckb_task_print) {
        if (!insertMrktPrint(status_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrint()) {
                return false;
            }
        }
    }
    if (ckb_task_photo) {
        if (!insertMrktPhoto(status_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPhoto()) {
                return false;
            }
        }
    }
    if (ckb_task_media) {
        if (!insertMrktMedia(status_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktMedia()) {
                return false;
            }
        }
    }
    if (ckb_task_web) {
        if (!insertMrktWeb(status_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktWeb()) {
                return false;
            }
        }
    }
    if (ckb_task_video) {
        if (!insertMrktVideo(status_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktVideo()) {
                return false;
            }
        }
    }
    if (ckb_task_editorial) {
        if (!insertMrktEditorial(status_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktEditorial()) {
                return false;
            }
        }
    }
    
    return true;
}

function insertMrktPrint(status_id) {
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
    
    var result = new Array();
    result = db_getMrktPrintByReqID(mrkt_request_id);
    var mrkt_print_id = "";
    
    if (result.length === 1) {
        mrkt_print_id = result[0]['MrktPrintID'];
        if (!db_updateMrktPrintByReqID(mrkt_request_id, 0, status_id, prt_date_need, ckb_prt_ad, ckb_prt_brochure, ckb_prt_banner, ckb_prt_flyer, ckb_prt_certificate, 
                                            ckb_prt_postcard, ckb_prt_poster, ckb_prt_program, ckb_prt_other, ckb_prt_web_graphic)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        mrkt_print_id = db_insertMrktPrint(mrkt_request_id, 0, status_id, prt_date_need, ckb_prt_ad, ckb_prt_brochure, ckb_prt_banner, ckb_prt_flyer, ckb_prt_certificate, 
                                            ckb_prt_postcard, ckb_prt_poster, ckb_prt_program, ckb_prt_other, ckb_prt_web_graphic);
        if (mrkt_print_id === "") {
            var str_msg = "DB system error INSERT MRKT_PRINT";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    if (ckb_prt_ad) {
        if (!insertMrktPrintAd(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintAd()) {
                return false;
            }
        }
    }
    if (ckb_prt_brochure) {
        if (!insertMrktPrintBrochure(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintBrochure()) {
                return false;
            }
        }
    }
    if (ckb_prt_banner) {
        if (!insertMrktPrintBanner(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintBanner()) {
                return false;
            }
        }
    }
    if (ckb_prt_flyer) {
        if (!insertMrktPrintFlyer(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintFlyer()) {
                return false;
            }
        }
    }
    if (ckb_prt_certificate) {
        if (!insertMrktPrintCert(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintCert()) {
                return false;
            }
        }
    }
    if (ckb_prt_postcard) {
        if (!insertMrktPrintPostCard(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintPostCard()) {
                return false;
            }
        }
    }
    if (ckb_prt_poster) {
        if (!insertMrktPrintPoster(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintPoster()) {
                return false;
            }
        }
    }
    if (ckb_prt_program) {
        if (!insertMrktPrintProgram(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintProgram()) {
                return false;
            }
        }
    }
    if (ckb_prt_other) {
        if (!insertMrktPrintOther(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintOther()) {
                return false;
            }
        }
    }
    if (ckb_prt_web_graphic) {
        if (!insertMrktPrintWGraphic(mrkt_print_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktPrintWGraphic()) {
                return false;
            }
        }
    }
    return true;
}

function insertMrktPrintAd(mrkt_print_id) {
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
    return true;
}

function insertMrktPrintBrochure(mrkt_print_id) {
    var prt_bro_qty = $('#prt_bro_qty').val();
    
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
    return true;
}

function insertMrktPrintBanner(mrkt_print_id) {
    var prt_ban_qty = $('#prt_ban_qty').val();
    
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
    return true;
}

function insertMrktPrintFlyer(mrkt_print_id) {
    var prt_fly_qty = $('#prt_fly_qty').val();
    
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
    return true;
}

function insertMrktPrintCert(mrkt_print_id) {
    var prt_cer_qty = $('#prt_cer_qty').val();
    
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
    return true;
}

function insertMrktPrintPostCard(mrkt_print_id) {
    var prt_pcd_size = $.trim($('#prt_pcd_size').val());
    var prt_pcd_qty = $('#prt_pcd_qty').val();
    
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
    return true;
}

function insertMrktPrintPoster(mrkt_print_id) {
    var ckb_prt_pst_11_17 = ($('#ckb_prt_pst_11_17').is(':checked') ? true : false);
    var ckb_prt_pst_22_28 = ($('#ckb_prt_pst_22_28').is(':checked') ? true : false);
    var ckb_prt_pst_other = ($('#ckb_prt_pst_other').is(':checked') ? true : false);
    
    var prt_pst_11_17_qty = null;
    var prt_pst_22_28_qty = null;
    var prt_pst_other_qty = null;
    var prt_pst_other_size = null;
    
    if (ckb_prt_pst_11_17) {
        prt_pst_11_17_qty = $('#prt_pst_11_17_qty').val();
    }
    if (ckb_prt_pst_22_28) {
        prt_pst_22_28_qty = $('#prt_pst_22_28_qty').val();
    }
    if (ckb_prt_pst_other) {
        prt_pst_other_qty = $('#prt_pst_other_qty').val();
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
    return true;
}

function insertMrktPrintProgram(mrkt_print_id) {
    var prt_prg_qty = $('#prt_prg_qty').val();
    
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
    return true;
}

function insertMrktPrintOther(mrkt_print_id) {
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
    return true;
}

function insertMrktPrintWGraphic(mrkt_print_id) {
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
    return true;
}

function insertMrktPhoto(status_id) {
    var pht_event_date = $('#pht_event_date').find('input').val();
    var pht_event_time = $('#pht_event_time').find('input').val();
    var pht_event_location = $.trim($('#pht_event_location').val());
    var pht_event_estimate_time = $.trim($('#pht_event_estimate_time').val());
    
    var result = new Array();
    result = db_getMrktPhotoByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktPhotoByReqID(mrkt_request_id, 0, status_id, pht_event_date, pht_event_time, pht_event_location, pht_event_estimate_time)) {
            var str_msg = "DB system error UPDATE MRKT_PRINT_WGRAPHIC - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktPhoto(mrkt_request_id, 0, status_id, pht_event_date, pht_event_time, pht_event_location, pht_event_estimate_time) === "") {
            var str_msg = "DB system error INSERT MRKT_PHOTO";
            return dbSystemErrorHandling(str_msg);
        }
    }
    return true;
}

function insertMrktMedia(status_id) {
    var ckb_mda_collegewide_email = ($('#ckb_mda_collegewide_email').is(':checked') ? true : false);
    var ckb_mda_sherpa_email = ($('#ckb_mda_sherpa_email').is(':checked') ? true : false);
    var ckb_mda_monitor = ($('#ckb_mda_monitor').is(':checked') ? true : false);
    var ckb_mda_social_media = ($('#ckb_mda_social_media').is(':checked') ? true : false);
    var ckb_mda_college_entrance = ($('#ckb_mda_college_entrance').is(':checked') ? true : false);
    
    var result = new Array();
    result = db_getMrktMediaByReqID(mrkt_request_id);
    var mrkt_media_id = "";
    
    if (result.length === 1) {
        mrkt_media_id = result[0]['MrktMediaID'];
        if (!db_updateMrktMediaByReqID(mrkt_request_id, 0, status_id, ckb_mda_collegewide_email, ckb_mda_sherpa_email, ckb_mda_monitor, ckb_mda_social_media, ckb_mda_college_entrance)) {
            var str_msg = "DB system error UPDATE MRKT_MEDIA - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        mrkt_media_id = db_insertMrktMedia(mrkt_request_id, 0, status_id, ckb_mda_collegewide_email, ckb_mda_sherpa_email, ckb_mda_monitor, ckb_mda_social_media, ckb_mda_college_entrance);
        if (mrkt_media_id === "") {
            var str_msg = "DB system error INSERT MRKT_MEDIA";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    if (ckb_mda_collegewide_email) {
        if (!insertMrktMediaCollege(mrkt_media_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktMediaCollege()) {
                return false;
            }
        }
    }
    if (ckb_mda_sherpa_email) {
        if (!insertMrktMediaSherpa(mrkt_media_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktMediaSherpa()) {
                return false;
            }
        }
    }
    if (ckb_mda_monitor) {
        if (!insertMrktMediaMonitor(mrkt_media_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktMediaMonitor()) {
                return false;
            }
        }
    }
    if (ckb_mda_social_media) {
        if (!insertMrktMediaPost(mrkt_media_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktMediaPost()) {
                return false;
            }
        }
    }
    if (ckb_mda_college_entrance) {
        if (!insertMrktMediaCollegeEntrance(mrkt_media_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktMediaEntrance()) {
                return false;
            }
        }
    }
    return true;
}

function insertMrktMediaCollege(mrkt_media_id) {
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
    return true;
}

function insertMrktMediaSherpa(mrkt_media_id) {
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
    return true;
}

function insertMrktMediaMonitor(mrkt_media_id) {
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
    return true;
}

function insertMrktMediaPost(mrkt_media_id) {
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
    return true;
}

function insertMrktMediaCollegeEntrance(mrkt_media_id) {
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
    return true;
}

function insertMrktWeb(status_id) {
    var web_date_needed = $('#web_date_needed').find('input').val();
    var ckb_web_create_new = ($('#ckb_web_create_new').is(':checked') ? true : false);
    var ckb_web_update_existing = ($('#ckb_web_update_existing').is(':checked') ? true : false);
    var ckb_web_update_url = $.trim($('#web_update_existing_url').val());
    var ckb_web_add_page = ($('#ckb_web_add_page').is(':checked') ? true : false);
    var ckb_web_add_url = $.trim($('#ckb_web_add_page_url').val());
    var ckb_web_request_website = ($('#ckb_web_request_website').is(':checked') ? true : false);
    var ckb_web_report_problem = ($('#ckb_web_report_problem').is(':checked') ? true : false);
    
    var result = new Array();
    result = db_getMrktWebByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktWebByReqID(mrkt_request_id, 0, status_id, web_date_needed, ckb_web_create_new, ckb_web_update_existing, ckb_web_update_url,
                                        ckb_web_add_page, ckb_web_add_url, ckb_web_request_website, ckb_web_report_problem)) {
            var str_msg = "DB system error UPDATE MRKT_WEB - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktWeb(mrkt_request_id, 0, status_id, web_date_needed, ckb_web_create_new, ckb_web_update_existing, ckb_web_update_url,
                                ckb_web_add_page, ckb_web_add_url, ckb_web_request_website, ckb_web_report_problem) === "") {
            var str_msg = "DB system error INSERT MRKT_WEB";
            return dbSystemErrorHandling(str_msg);
        }
    }
    return true;
}

function insertMrktVideo(status_id) {
    var ckb_vdo_filming_request = ($('#ckb_vdo_filming_request').is(':checked') ? true : false);
    var ckb_vdo_other = ($('#ckb_vdo_other').is(':checked') ? true : false);
    
    var result = new Array();
    result = db_getMrktVideoByReqID(mrkt_request_id);
    var mrkt_video_id = "";
    
    if (result.length === 1) {
        mrkt_video_id = result[0]['MrktVideoID'];
        if (!db_updateMrktVideoByReqID(mrkt_request_id, 0, status_id, ckb_vdo_filming_request, ckb_vdo_other)) {
            var str_msg = "DB system error UPDATE MRKT_VIDEO - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        var mrkt_video_id = db_insertMrktVideo(mrkt_request_id, 0, status_id, ckb_vdo_filming_request, ckb_vdo_other);
        if (mrkt_video_id === "") {
            var str_msg = "DB system error INSERT MRKT_VIDEO";
            return dbSystemErrorHandling(str_msg);
        }
    }
    
    if (ckb_vdo_filming_request) {
        if (!insertMrktVideoFilming(mrkt_video_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktVideoFilming()) {
                return false;
            }
        }
    }
    if (ckb_vdo_other) {
        if (!insertMrktVideoOther(mrkt_video_id)) {
            return false;
        }
    }
    else {
        if (!m_new_request) {
            if (!deleteMrktVideoOther()) {
                return false;
            }
        }
    }
    
    return true;
}

function insertMrktVideoFilming(mrkt_video_id) {
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
    return true;
}

function insertMrktVideoOther(mrkt_video_id) {
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
    return true;
}

function insertMrktEditorial(status_id) {
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
    
    var result = new Array();
    result = db_getMrktEditorialByReqID(mrkt_request_id);
    if (result.length === 1) {
        if (!db_updateMrktEditorialByReqID(mrkt_request_id, 0, status_id, ckb_edt_copywriting, edt_copywriting_date_needed, ckb_edt_proofreading, edt_proofreading_date_needed)) {
            var str_msg = "DB system error UPDATE MRKT_EDITORIAL - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    }
    else {
        if (db_insertMrktEditorial(mrkt_request_id, 0, status_id, ckb_edt_copywriting, edt_copywriting_date_needed, ckb_edt_proofreading, edt_proofreading_date_needed) === "") {
            var str_msg = "DB system error INSERT MRKT_EDITORIAL";
            return dbSystemErrorHandling(str_msg);
        }
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertMrktProcessLog() {
    if (db_insertMrktProcessLog(mrkt_request_id, sessionStorage.getItem('ss_mrkt_loginName'), 0, 2, "New Request", 0) === "") {
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
function updateMrktAttachmentReqID() {
    $('#req_file_view_section').children().each(function () {
        var mrkt_attachment_id = $(this).attr('id').replace("mrkt_attachment_id_", "");
        if (!db_updateMrktAttachmentRequestIDByID(mrkt_attachment_id, mrkt_request_id)) {
            var str_msg = "DB system error UPDATE MRKT_ATTACHMENT - MrktRequestID: " + mrkt_request_id;
            return dbSystemErrorHandling(str_msg);
        }
    });
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteMrktAttachment(mrkt_attachment_id) {
    if (!db_deleteMrktAttachmentByID(mrkt_attachment_id)) {
        var str_msg = "DB system error DELETE MRKT_ATTACHMENT - MrktAttachmentID: " + mrkt_attachment_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktPrint() {    
    if (!db_deleteMrktPrintByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PRINT - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    if (!deleteMrktPrintAd()) {
        return false;
    }
    if (!deleteMrktPrintBrochure) {
        return false;
    }
    if (!deleteMrktPrintBanner()) {
        return false;
    }
    if (!deleteMrktPrintFlyer()) {
        return false;
    }
    if (!deleteMrktPrintCert()) {
        return false;
    }
    if (!deleteMrktPrintPostCard()) {
        return false;
    }
    if (!deleteMrktPrintPoster()) {
        return false;
    }
    if (!deleteMrktPrintProgram()) {
        return false;
    }
    if (!deleteMrktPrintOther()) {
        return false;
    }
    if (!deleteMrktPrintWGraphic()) {
        return false;
    }
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

function deleteMrktPhoto() {
    if (!db_deleteMrktPhotoByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_PHOTO - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktMedia() {
    if (!db_deleteMrktMediaByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_MEDIA - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    if (!deleteMrktMediaCollege()) {
        return false;
    }
    if (!deleteMrktMediaSherpa()) {
        return false;
    }
    if (!deleteMrktMediaMonitor()) {
        return false;
    }
    if (!deleteMrktMediaPost()) {
        return false;
    }
    if (!deleteMrktMediaEntrance()) {
        return false;
    }
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

function deleteMrktWeb() {
    if (!db_deleteMrktWebByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_WEB - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

function deleteMrktVideo() {
    if (!db_deleteMrktVideoByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_VIDEO - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    if (!deleteMrktVideoFilming()) {
        return false;
    }
    if (!deleteMrktVideoOther()) {
        return false;
    }
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

function deleteMrktEditorial() {
    if (!db_deleteMrktEditorialByReqID(mrkt_request_id)) {
        var str_msg = "DB system error DELETE MRKT_EDITORIAL - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteMrktAttachmentFile(file_link_name) {
    if (!removeFileMrktAttachment(file_link_name)) {
        var str_msg = "FILE system error DELETE MRKT_ATTACHMENT - MrktRequestID: " + mrkt_request_id;
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteUnsavedFileAttachment() {
    var result = new Array();
    result = db_getMrktAttachmentByReqID(0);
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            deleteMrktAttachmentFile(result[i]['FileLinkName']);
        }
        db_deleteMrktAttachmentByReqID(0);
    }
}