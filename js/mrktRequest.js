var m_file_name_1 = "";
var m_file_name_2 = "";

var m_base64_data_1 = "";
var m_base64_data_2 = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) {
        hideRequestTypeSection();
        isLoginAdmin();
        getLoginInfo();
        getRequestTypeList();
        getVideoFormatList();
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
    
    // request type change event ///////////////////////////////////////////////
    $('#sel_request_type').change(function() {
        var req_type_id = $(this).val();
        setEventSections(req_type_id);
        return false;
    });
    
    // delivery type change event //////////////////////////////////////////////
//    $('#sel_delivery_type').change(function() {
//        var del_type_id = $(this).val();
//        deliveryOptions(del_type_id);
//    });
    
    // sherpa email check box change event /////////////////////////////////////
//    $('#ckb_email_student').on('ifChanged', function() {
//        if ($(this).is(':checked') || $('#ckb_email_faculty').is(':checked')) {
//            $('#sherpa_email_section').show();
////            $('#sherpa_email_section').animatePanel();
//        }
//        else {
//            $('#sherpa_email_section').hide();
//            $('#email_subject').val("");
//            $('#email_body').val("").trigger('autosize.resize');
//        }
//    });
    
    // sherpa email check box change event /////////////////////////////////////
//    $('#ckb_email_faculty').on('ifChanged', function() {
//        if ($(this).is(':checked') || $('#ckb_email_student').is(':checked')) {
//            $('#sherpa_email_section').show();
////            $('#sherpa_email_section').animatePanel();
//        }
//        else {
//            $('#sherpa_email_section').hide();
//            $('#email_subject').val("");
//            $('#email_body').val("").trigger('autosize.resize');
//        }
//    });
    
    // sherpa newsfeed check box change event //////////////////////////////////
//    $('#ckb_newsfeed').on('ifChanged', function() {
//        if ($(this).is(':checked')) {
//            $('#sherpa_newsfeed_section').show();
////            $('#sherpa_newsfeed_section').animatePanel();
//        }
//        else {
//            $('#sherpa_newsfeed_section').hide();
//            $('#announ_start_date').val("");
//            $('#announ_start_time').val("");
//            $('#announ_end_date').val("");
//            $('#announ_end_time').val("");
//            $('#event_title').val("");
//            $('#event_location').val("");
//            $('#announ_text').val("").trigger('autosize.resize');
//            $('#announ_descrip').val("").trigger('autosize.resize');
//        }
//    });
    
    // suggest post check box change event /////////////////////////////////////
//    $('#ckb_facebook').on('ifChanged', function() {
//        if ($('#ckb_facebook').is(':checked') || $('#ckb_twitter').is(':checked') || $('#ckb_instagram').is(':checked')
//            || $('#ckb_bstic').is(':checked') || $('#ckb_ssc').is(':checked') || $('#ckb_lsb').is(':checked')) {
//            $('#suggest_post_section').show();
//        }
//        else {
//            $('#suggest_post_section').hide();
//            $('#suggest_post').val("").trigger('autosize.resize');
//        }
//    });
//    
//    $('#ckb_twitter').on('ifChanged', function() {
//        if ($('#ckb_facebook').is(':checked') || $('#ckb_twitter').is(':checked') || $('#ckb_instagram').is(':checked')
//            || $('#ckb_bstic').is(':checked') || $('#ckb_ssc').is(':checked') || $('#ckb_lsb').is(':checked')) {
//            $('#suggest_post_section').show();
//        }
//        else {
//            $('#suggest_post_section').hide();
//            $('#suggest_post').val("").trigger('autosize.resize');
//        }
//    });
//    
//    $('#ckb_instagram').on('ifChanged', function() {
//        if ($('#ckb_facebook').is(':checked') || $('#ckb_twitter').is(':checked') || $('#ckb_instagram').is(':checked')
//            || $('#ckb_bstic').is(':checked') || $('#ckb_ssc').is(':checked') || $('#ckb_lsb').is(':checked')) {
//            $('#suggest_post_section').show();
//        }
//        else {
//            $('#suggest_post_section').hide();
//            $('#suggest_post').val("").trigger('autosize.resize');
//        }
//    });
//    
//    $('#ckb_bstic').on('ifChanged', function() {
//        if ($('#ckb_facebook').is(':checked') || $('#ckb_twitter').is(':checked') || $('#ckb_instagram').is(':checked')
//            || $('#ckb_bstic').is(':checked') || $('#ckb_ssc').is(':checked') || $('#ckb_lsb').is(':checked')) {
//            $('#suggest_post_section').show();
//        }
//        else {
//            $('#suggest_post_section').hide();
//            $('#suggest_post').val("").trigger('autosize.resize');
//        }
//    });
//    
//    $('#ckb_ssc').on('ifChanged', function() {
//        if ($('#ckb_facebook').is(':checked') || $('#ckb_twitter').is(':checked') || $('#ckb_instagram').is(':checked')
//            || $('#ckb_bstic').is(':checked') || $('#ckb_ssc').is(':checked') || $('#ckb_lsb').is(':checked')) {
//            $('#suggest_post_section').show();
//        }
//        else {
//            $('#suggest_post_section').hide();
//            $('#suggest_post').val("").trigger('autosize.resize');
//        }
//    });
//    
//    $('#ckb_lsb').on('ifChanged', function() {
//        if ($('#ckb_facebook').is(':checked') || $('#ckb_twitter').is(':checked') || $('#ckb_instagram').is(':checked')
//            || $('#ckb_bstic').is(':checked') || $('#ckb_ssc').is(':checked') || $('#ckb_lsb').is(':checked')) {
//            $('#suggest_post_section').show();
//        }
//        else {
//            $('#suggest_post_section').hide();
//            $('#suggest_post').val("").trigger('autosize.resize');
//        }
//    });
    ////////////////////////////////////////////////////////////////////////////
    
    // announcement start date change event ////////////////////////////////////
//    $('#announ_start_date').change(function() {
//        var announ_start = $(this).val();
//        if (announ_start !== "") {
//            $('#announ_end_date').datepicker("option", "minDate", announ_start);
////            var dt_event = new Date(announ_start);
////            dt_event.setDate(dt_event.getDate()+14);
////            $('#event_date').datepicker("option", "minDate", dt_event);
//        }
//    });
    
    // attachment 1 button click ///////////////////////////////////////////////
//    $('#attach_1').change(function() {
//        getImageFileInfo("#attach_1");
//        convertImageFiletoBase64("#attach_1");
//    });
    
    // attachment 2 button click ///////////////////////////////////////////////
//    $('#attach_2').change(function() {
//        getImageFileInfo("#attach_2");
//        convertImageFiletoBase64("#attach_2");
//    });
    
    // submit button click /////////////////////////////////////////////////////
//    $('#btn_submit').click(function() {          
//        if (!requestValidation()) {
//            return false;
//        }
//        if (!deliveryValidation()) {
//            return false;
//        }
//        if (!optionValidation()) {
//            return false;
//        }
//        
//        if (mrktSubmit()) {
//            sendEmailSubmitted();
//            sendEmailToAdministrator();
//            swal({  title: "Submitted!", 
//                text: "Your request has been submitted successfuly", 
//                type: "success",
//                confirmButtonText: "OK",
//                closeOnConfirm: false 
//            }, 
//            function() {   
//                window.open('userReqList.html', '_self');
//                return false;
//            });
//        }
//        else {
//            swal({title: "Error", text: "There was a system error. please conatact IT support at 949.451.5696 or ivctech@ivc.edu", type: "error"});
//        }
//    });
    
    // cancel button click /////////////////////////////////////////////////////
//    $('#btn_cancel').click(function() {
//        window.open('userReqList.html', '_self');
//        return false;
//    });
    
    // bootstrap datepicker
    $('#pr_send_date').datepicker();
    $('#vd_date').datepicker();
    $('#wb_launch_date').datepicker();
 
    // timepicker
    $('#vd_time').timepicker();
  
    // auto size
    $('#req_descrip').autosize();
    $('#pr_body').autosize();
    $('#wb_body_copy').autosize();
    
    // file attachment
    $(":file").filestyle({buttonName: "btn-primary"});
    
    // iCheck initialize
    $('input').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris',
        increaseArea: '-10%' // optional
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function hideAllDeliverySection() {
//    $('#delivery_sherpa').hide();
//    $('#delivery_social_media').hide();
//    $('#delivery_digital_signage').hide();
//}
//
//
//function clearAllCheckBox() {
//    $('#ckb_email').iCheck('uncheck');
//    $('#ckb_newsfeed').iCheck('uncheck');
//    
//    $('#ckb_facebook').iCheck('uncheck');
//    $('#ckb_twitter').iCheck('uncheck');
//    $('#ckb_instagram').iCheck('uncheck');
//    
//    $('#ckb_bstic').iCheck('uncheck');
//    $('#ckb_ssc').iCheck('uncheck');
//    $('#ckb_lsb').iCheck('uncheck');
//}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function hideRequestTypeSection() {
    $('#pr_sections').hide();
    $('#video_sections').hide();
    $('#website_sections').hide();
    $('#print_design_sections').hide();
}

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
    $('#login_user').html(sessionStorage.getItem('ss_mrkt_loginName'));
    $('#req_name').val(sessionStorage.getItem('ss_mrkt_loginName'));
    $('#req_email').val(sessionStorage.getItem('ss_mrkt_loginEmail'));
    $('#req_phone').val(sessionStorage.getItem('ss_mrkt_phone'));
    $('#req_depart').val(sessionStorage.getItem('ss_mrkt_department'));
    $('#req_date').val(getToday());
//    
//    $('#email_send_date').datepicker("option", "minDate", "+14d");
//    $('#announ_start_date').datepicker("option", "minDate", "+14d");
//    $('#announ_end_date').datepicker("option", "minDate", "+14d");
}

function getRequestTypeList() {
    var result = new Array();
    result = db_getRequestTypeList();
    
    $('#sel_request_type').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['RequestTypeID']  + "'>" + result[i]['RequestType'] + "</option>";
    }
    
    $('#sel_request_type').append(html);
}

function getVideoFormatList() {
    var result = new Array();
    result = db_getVideoFormatList();
    
    $('#vd_req_format').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['VideoFormatID']  + "'>" + result[i]['VideoFormat'] + "</option>";
    }
    
    $('#vd_req_format').append(html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setEventSections(req_type) {
    switch(req_type) {
        case "0":
            $('#pr_sections').hide();
            $('#video_sections').hide();
            $('#website_sections').hide();
            $('#print_design_sections').hide();
            break;
        case "1":
            $('#pr_sections').show();
            $('#video_sections').hide();
            $('#website_sections').hide();
            $('#print_design_sections').hide();
            break;
        case "2":
            $('#pr_sections').hide();
            $('#video_sections').show();
            $('#website_sections').hide();
            $('#print_design_sections').hide();
            break;
        case "3":
            $('#pr_sections').hide();
            $('#video_sections').hide();
            $('#website_sections').show();
            $('#print_design_sections').hide();
            break;
        case "4":
            $('#pr_sections').hide();
            $('#video_sections').hide();
            $('#website_sections').hide();
            $('#print_design_sections').show();
            break;
        default:
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function deliveryOptions(del_type_id) {
//    hideAllDeliverySection();
//    hideAllOptionSection();
//    clearAllCheckBox();
//
//    switch(del_type_id) {
//        case "1":
//            $('#delivery_sherpa').show();
//            $('#delivery_sherpa').animatePanel();
//            break;
//        case "2":
//            $('#delivery_social_media').show();
//            $('#delivery_social_media').animatePanel();
//            break;
//        case "3":
//            $('#delivery_digital_signage').show();
//            $('#delivery_digital_signage').animatePanel();
//            break;
//        default:
//            break;
//    }
//}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function getImageFileInfo(id) {
//    var file = $(id).get(0).files[0];
//    var f_name = file.name.replace(/#/g, "");
//    
//    if (typeof file !== "undefined") {
//        var f_extension = getFileExtension(f_name);
//        if (f_extension !== "jpg" && f_extension !== "jpeg" && f_extension !== "pdf") {
//            swal({title: "Warning", text: "Only jpeg/jpg or pdf file can be upload", type: "warning"});
//            $(id).filestyle('clear');
//            return false;
//        } 
//        else {   
//            if (file.size >= 2000000) {
//                swal({title: "Warning", text: "Attached file size is too big, max. file size allow is 2Mb or less", type: "warning"});
//                $(id).filestyle('clear');
//                return false;
//            }
//            else {
//                return true;
//            }
//        }
//    }
//    else {
//        return false;
//    }
//}

//function convertImageFiletoBase64(id) {
//    var file = $(id).get(0).files[0];
//    var reader = new FileReader();
//
//    reader.onloadend = function () {
//        if (id === "#attach_1") {
//            m_file_name_1 = file.name.replace(/#/g, "");
//            m_base64_data_1 = reader.result;
//        }
//        else {
//            m_file_name_2 = file.name.replace(/#/g, "");
//            m_base64_data_2 = reader.result;
//        }
//    };
//
//    if (file) {
//        reader.readAsDataURL(file);
//    } 
//}

// user input validation ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function requestValidation() {
    var err = "";
    
    if ($('#req_phone').val().replace(/\s+/g, '') === "") {
        err += "Phone number is a required field\n";
    }
    else {
        if (!isValidPhoneNumber($('#req_phone').val())) {
            err += "Phone number is an INVALID\n";
        }
    }
    if ($('#req_title').val().replace(/\s+/g, '') === "") {
        err += "Request title is a required field\n";
    }
    if ($('#req_descrip').val().replace(/\s+/g, '') === "") {
        err += "Request description is a required field\n";
    }
    if ($('#sel_request_type').val() === "0") {
        err += "Request type is a required field\n";
    }
    if ($('#sel_delivery_type').val() === null || $('#sel_delivery_type').val() === "0") {
        err += "Delivery type is a required field\n";
    }

    if (err !== "") {
        swal({title: "Request Form Error", text: err, type: "error"});
        return false;
    }
    else {
        return true;
    }
}

function deliveryValidation() {
    var del_type_id = $('#sel_delivery_type').val();
    switch(del_type_id) {
        case "1":
            if(!$('#ckb_email').is(':checked') && !$('#ckb_newsfeed').is(':checked')) {
                swal({title: "Sherpa Error", text: "Sherpa option is a required field", type: "error"});
                return false;
            }
            else {
                return true;
            }
        case "2":
            if(!$('#ckb_facebook').is(':checked') && !$('#ckb_twitter').is(':checked') && !$('#ckb_instagram').is(':checked')) {
                swal({title: "Social Media Error", text: "Social Media option is a required field", type: "error"});
                return false;
            }
            else {
                return true;
            }
        case "3":
            if(!$('#ckb_bstic').is(':checked') && !$('#ckb_ssc').is(':checked') && !$('#ckb_lsb').is(':checked')) {
                swal({title: "Digital Signage Error", text: "Digital Signage option is a required field", type: "error"});
                return false;
            }
            else {
                return true;
            }
        default:
            return true;
    }
}

function optionValidation() {
    var del_type_id = $('#sel_delivery_type').val();
    switch(del_type_id) {
        case "1":
            if ($('#ckb_email').is(':checked')) {
                if (!sherpaEmailValidation()) {
                    return false;
                }
            }
            if ($('#ckb_newsfeed').is(':checked')) {
                if (!sherpaNewsfeedValidation()) {
                    return false;
                }
            }
            return true;
        default:
            return true;
    }
}

function sherpaEmailValidation() {
    var err = "";
 
    if ($('#email_send_date').val() === "") {
        err += "Email send date is a required field\n";
    }
    if ($('#email_subject').val().replace(/\s+/g, '') === "") {
        err += "Email subject is a required field\n";
    }
    if ($('#email_body').val().replace(/\s+/g, '') === "") {
        err += "Email body is a required field\n";
    }
    
    if (err !== "") {
        swal({title: "Sherpa Email Error", text: err, type: "error"});
        return false;
    }
    else {
        return true;
    }
}

function sherpaNewsfeedValidation() {
    var err = "";
 
    if ($('#announ_start_date').val() === "") {
        err += "Start date is a required field\n";
    }
    if ($('#announ_start_time').val() === "") {
        err += "Start time is a required field\n";
    }
    if ($('#announ_end_date').val() === "") {
        err += "End date is a required field\n";
    }
    if ($('#announ_end_time').val() === "") {
        err += "End time is a required field\n";
    }
    if ($('#alt_name').val().replace(/\s+/g, '') === "") {
        err += "Alternate name is a required field\n";
    }
    if ($('#alt_email').val().replace(/\s+/g, '') === "") {
        err += "Alternate email is a required field\n";
    }
    else {
        if (!isValidEmailAddress($('#alt_email').val())) {
            err += "Alternate email is an INVALID\n";
        }
    }
    
    if ($('#alt_phone').val().replace(/\s+/g, '') === "") {
        err += "Alternate phone is a required field\n";
    }
    else {
        if (!isValidPhoneNumber($('#alt_phone').val())) {
            err += "Alternate phone is an INVALID\n";
        }
    }
    if ($('#event_title').val().replace(/\s+/g, '') === "") {
        err += "Event title is a required field\n";
    }
    if ($('#event_location').val().replace(/\s+/g, '') === "") {
        err += "Event location is a required field\n";
    }
    if ($('#announ_text').val().replace(/\s+/g, '') === "") {
        err += "Announcement text is a required field\n";
    }
    if ($('#announ_descrip').val().replace(/\s+/g, '') === "") {
        err += "Description is a required field\n";
    }
    
    if (err !== "") {
        swal({title: "Sherpa Newsfeed Error", text: err, type: "error"});
        return false;
    }
    else {
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mrktSubmit() {
    var event_request_id = insertEventRequest();
    if (event_request_id === "") {
        return false;
    }
    
    var del_type_id = $('#sel_delivery_type').val();
    switch(del_type_id) {
        case "1":
            if (insertSherpa(event_request_id) === "") {
                return false;
            }
            
            if ($('#ckb_email').is(':checked')) {
                if (insertEventEmail(event_request_id) === "") {
                    return false;
                }
            }
            if ($('#ckb_newsfeed').is(':checked')) {
                if (insertEventNewsFeed(event_request_id) === "") {
                    return false;
                }
            }
            break;
        case "2":
            insertSocialMedia(event_request_id);
            break;
        case "3":
            insertDigitalSignage(event_request_id);
            break;
        default:
            break;
    }
    
    insertTransaction(event_request_id);
    return true;
}

function insertEventRequest() {
    var req_type_id = $('#sel_request_type').val();
    var del_type_id = $('#sel_delivery_type').val();
    var status_id = 1;
    var req_name = textReplaceApostrophe($.trim($('#req_name').val()));
    var req_phone = textReplaceApostrophe($.trim($('#req_phone').val()));
    var req_email = textReplaceApostrophe($.trim($('#req_email').val()));
    var department = textReplaceApostrophe($.trim($('#department').val()));
    var req_date = $('#req_date').val();
    var req_title = textReplaceApostrophe($.trim($('#req_title').val()));
    var req_descrip = textReplaceApostrophe($.trim($('#req_descrip').val()));
    
    return db_insertEventRequest(req_type_id, del_type_id, status_id, req_name, req_phone, req_email, department, req_date, req_title, req_descrip);
}

function insertAttachment(event_request_id) {
    if (m_base64_data_1 !== "") {
        db_insertAttachment(event_request_id, m_file_name_1, m_base64_data_1);
    }
    if (m_base64_data_2 !== "") {
        db_insertAttachment(event_request_id, m_file_name_2, m_base64_data_2);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertSherpa(event_request_id) {
    var ckb_email = $('#ckb_email').is(':checked');
    var ckb_newsfeed = $('#ckb_newsfeed').is(':checked');
    
    return db_insertSherpa(event_request_id, ckb_email, ckb_newsfeed);
}

function insertSocialMedia(event_request_id) {
    var ckb_facebook = $('#ckb_facebook').is(':checked');
    var ckb_twitter = $('#ckb_twitter').is(':checked');
    var ckb_instagram = $('#ckb_instagram').is(':checked');
    
    return db_insertSocialMedia(event_request_id, ckb_facebook, ckb_twitter, ckb_instagram);
}

function insertDigitalSignage(event_request_id) {
    var ckb_bstic = $('#ckb_bstic').is(':checked');
    var ckb_ssc = $('#ckb_ssc').is(':checked');
    var ckb_lsb = $('#ckb_lsb').is(':checked');
    
    return db_insertDigitalSignage(event_request_id, ckb_bstic, ckb_ssc, ckb_lsb);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertEventEmail(event_request_id) {
    var send_date = $('#email_send_date').val();
    var subject = textReplaceApostrophe($.trim($('#email_subject').val()));
    var body = textReplaceApostrophe($.trim($('#email_body').val()));
    
    return db_insertEventEmail(event_request_id, send_date, subject, body);
}

function insertEventNewsFeed(event_request_id) {
    var ann_start_date = $('#announ_start_date').val();
    var ann_start_time = $('#announ_start_time').val();
    var ann_end_date = $('#announ_end_date').val();
    var ann_end_time = $('#announ_end_time').val();
    var alt_name = textReplaceApostrophe($.trim($('#alt_name').val()));
    var alt_email = textReplaceApostrophe($.trim($('#alt_email').val()));
    var alt_phone = textReplaceApostrophe($.trim($('#alt_phone').val()));
    var ann_title = textReplaceApostrophe($.trim($('#event_title').val()));
    var ann_location = textReplaceApostrophe($.trim($('#event_location').val()));
    var ann_text = textReplaceApostrophe($.trim($('#announ_text').val()));
    var description = textReplaceApostrophe($.trim($('#announ_descrip').val()));
    
    return db_insertEventNewsFeed(event_request_id, ann_start_date, ann_start_time, ann_end_date, ann_end_time, alt_name, alt_email, alt_phone, ann_title, ann_location, ann_text, description);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertTransaction(event_request_id) {
    var login_name = sessionStorage.getItem('ss_mrkt_loginName');
    
    return db_insertTransaction(event_request_id, login_name, "Request submitted");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function sendEmailSubmitted() {
    var req_email = textReplaceApostrophe($('#req_email').val());
    var req_name = textReplaceApostrophe($('#req_name').val());
    var subject = "Marketing Announcement Request Submitted";
    var message = "Your request has been successfully submitted. A member of the marketing team will contact you regarding your request.<br/><br/>";
    message += "Should you have any questions or comments, please contact the IVC Marketing.<br/>"; 
    message += "Thank you.<br/>";
    message += "IVC Public Information & Marketing<br/>";
    message += "ivcpio@ivc.edu<br/>";
    message += "phone: 949.451.5293";
    
    proc_sendEmail(req_email, req_name, "", "", subject, message);
}

function sendEmailToAdministrator() {
    var admin_email = "bramchandani@ivc.edu";
    var admin_name = "Brittany Ramchandani";
    var subject = "New Marketing Announcement Request";
    var message = "You have a new request.";
    
    // testing
    admin_email = "presidenttest@ivc.edu";
    proc_sendEmail(admin_email, admin_name, "", "", subject, message);
}