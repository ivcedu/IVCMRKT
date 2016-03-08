var m_file_name_1 = "";
var m_file_name_2 = "";

var m_base64_data_1 = "";
var m_base64_data_2 = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) {
        hideAllDeliverySection();
        hideAllOptionSection();
    
        isLoginAdmin();
        getLoginInfo();
        getRequestTypeList();
    }
    else {
        window.open('login.html', '_self');
    }
};

$(window).bind("load", function () {
    // Remove splash screen after load
    $('.splash').css('display', 'none');
});

$(window).bind("resize click", function () {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Waint until metsiMenu, collapse and other effect finish and set wrapper height
    setTimeout(function () {
        fixWrapperHeight();
    }, 300);
});
////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {   
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Handle minimalize sidebar menu
    $('.hide-menu').on('click', function(event){
        event.preventDefault();
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    });

    // Initialize metsiMenu plugin to sidebar menu
    $('#side-menu').metisMenu();

    // Initialize iCheck plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    // Initialize animate panel function
    $('.animate-panel').animatePanel();

    // Function for collapse hpanel
    $('.showhide').on('click', function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });

    // Function for close hpanel
    $('.closebox').on('click', function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
        if($('body').hasClass('fullscreen-panel-mode')) { $('body').removeClass('fullscreen-panel-mode');}
    });

    // Fullscreen for fullscreen hpanel
    $('.fullscreen').on('click', function() {
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        $('body').toggleClass('fullscreen-panel-mode');
        icon.toggleClass('fa-expand').toggleClass('fa-compress');
        hpanel.toggleClass('fullscreen');
        setTimeout(function() {
            $(window).trigger('resize');
        }, 100);
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').on('click', function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Function for small header
    $('.small-header-action').on('click', function(event){
        event.preventDefault();
        var icon = $(this).find('i:first');
        var breadcrumb  = $(this).parent().find('#hbreadcrumb');
        $(this).parent().parent().parent().toggleClass('small-header');
        breadcrumb.toggleClass('m-t-lg');
        icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    });

    // Set minimal height of #wrapper to fit the window
    setTimeout(function () {
        fixWrapperHeight();
    });

    // Sparkline bar chart data and options used under Profile image on left navigation panel
    $("#sparkline1").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 11, 4], {
        type: 'bar',
        barWidth: 7,
        height: '30px',
        barColor: '#62cb31',
        negBarColor: '#53ac2a'
    });

    // Initialize tooltips
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]"
    });

    // Initialize popover
    $("[data-toggle=popover]").popover();

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    $('#mobile_nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // request type change event ///////////////////////////////////////////////
    $('#sel_request_type').change(function() {
        var req_type_id = $(this).val();
        getDeliveryTypeList(req_type_id);
        if (req_type_id === "0") {
            deliveryOptions("0");
        }
    });
    
    // delivery type change event //////////////////////////////////////////////
    $('#sel_delivery_type').change(function() {
        var del_type_id = $(this).val();
        deliveryOptions(del_type_id);
    });
    
    // sherpa email check box change event /////////////////////////////////////
    $('#ckb_email').on('ifChanged', function() {
        if ($(this).is(':checked')) {
            $('#sherpa_email_section').show();
            $('#sherpa_email_section').animatePanel();
        }
        else {
            $('#sherpa_email_section').hide();
            $('#email_subject').val("");
            $('#email_body').val("").trigger('autosize.resize');
        }
    });
    
    // sherpa newsfeed check box change event //////////////////////////////////
    $('#ckb_newsfeed').on('ifChanged', function() {
        if ($(this).is(':checked')) {
            $('#sherpa_newsfeed_section').show();
            $('#sherpa_newsfeed_section').animatePanel();
        }
        else {
            $('#sherpa_newsfeed_section').hide();
            $('#announ_start_date').val("");
            $('#announ_start_time').val("");
            $('#announ_end_date').val("");
            $('#announ_end_time').val("");
            $('#event_title').val("");
            $('#event_location').val("");
            $('#announ_text').val("").trigger('autosize.resize');
            $('#announ_descrip').val("").trigger('autosize.resize');
        }
    });
    
    // contract email validation event /////////////////////////////////////////
//    $('#cont_email').change(function() {
//        if (!isValidEmailAddress($(this).val())) {
//            $(this).val("");
//            swal({title: "Warning", text: "Please enter valid email address", type: "warning"});
//        }
//    });
    
    // announcement start date change event ////////////////////////////////////
    $('#announ_start_date').change(function() {
        var announ_start = $(this).val();
        if (announ_start !== "") {
            $('#announ_end_date').datepicker("option", "minDate", announ_start);
//            var dt_event = new Date(announ_start);
//            dt_event.setDate(dt_event.getDate()+14);
//            $('#event_date').datepicker("option", "minDate", dt_event);
        }
    });
    
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
    $('#btn_submit').click(function() {          
        if (!requestValidation()) {
            return false;
        }
        if (!deliveryValidation()) {
            return false;
        }
        if (!optionValidation()) {
            return false;
        }
        
        if (mrktSubmit()) {
            sendEmailSubmitted();
            sendEmailToAdministrator();
            swal({  title: "Submitted!", 
                text: "Your request has been submitted successfuly", 
                type: "success",
                confirmButtonText: "OK",
                closeOnConfirm: false 
            }, 
            function() {   
                window.open('userReqList.html', '_self');
                return false;
            });
        }
        else {
            swal({title: "Error", text: "There was a system error. please conatact IT support at 949.451.5696 or ivctech@ivc.edu", type: "error"});
        }
    });
    
    // cancel button click /////////////////////////////////////////////////////
    $('#btn_cancel').click(function() {
        window.open('userReqList.html', '_self');
        return false;
    });
    
    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
    
    // bootstrap datepicker
    $('#email_send_date').datepicker();
    $('#announ_start_date').datepicker();
    $('#announ_end_date').datepicker();
    
    // timepicker
    $('#announ_start_time').timepicker();
    $('#announ_end_time').timepicker();
    
    // auto size
    $('#req_descrip').autosize();
    $('#email_body').autosize();
    $('#announ_text').autosize();
    $('#announ_descrip').autosize();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

////////////////////////////////////////////////////////////////////////////////
function fixWrapperHeight() {
    // Get and set current height
    var headerH = 62;
    var navigationH = $("#navigation").height();
    var contentH = $(".content").height();

    // Set new height when contnet height is less then navigation
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH + 'px');
    }

    // Set new height when contnet height is less then navigation and navigation is less then window
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH  + 'px');
    }

    // Set new height when contnet is higher then navigation but less then window
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
    }
}

function setBodySmall() {
    if ($(this).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}

// Animate panel function
$.fn['animatePanel'] = function() {
    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    // Set default values for attrs
    if(!effect) { effect = 'zoomIn';}
    if(!delay) { delay = 0.06; } else { delay = delay / 10; }
    if(!child) { child = '.row > div';} else {child = "." + child;}

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opacity to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('stagger').addClass('animated-panel').addClass(effect);

    var panelsCount = panel.length + 10;
    var animateTime = (panelsCount * delay * 10000) / 10;

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });

    // Clear animation after finish
    setTimeout(function(){
        $('.stagger').css('animation', '');
        $('.stagger').removeClass(effect).removeClass('animated-panel').removeClass('stagger');
    }, animateTime);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function hideAllDeliverySection() {
    $('#delivery_sherpa').hide();
    $('#delivery_social_media').hide();
    $('#delivery_digital_signage').hide();
}

function hideAllOptionSection() {
    $('#sherpa_email_section').hide();
    $('#sherpa_newsfeed_section').hide();
}

function clearAllCheckBox() {
    $('#ckb_email').iCheck('uncheck');
    $('#ckb_newsfeed').iCheck('uncheck');
    
    $('#ckb_facebook').iCheck('uncheck');
    $('#ckb_twitter').iCheck('uncheck');
    $('#ckb_instagram').iCheck('uncheck');
    
    $('#ckb_bstic').iCheck('uncheck');
    $('#ckb_ssc').iCheck('uncheck');
    $('#ckb_lsb').iCheck('uncheck');
}

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    $('#login_user').html(sessionStorage.getItem('ss_mrkt_loginName'));
    $('#req_name').val(sessionStorage.getItem('ss_mrkt_loginName'));
    $('#req_email').val(sessionStorage.getItem('ss_mrkt_loginEmail'));
    $('#req_phone').val(sessionStorage.getItem('ss_mrkt_phone'));
    $('#department').val(sessionStorage.getItem('ss_mrkt_department'));
    $('#req_date').val(getToday());
    
    $('#email_send_date').datepicker("option", "minDate", "+14d");
    $('#announ_start_date').datepicker("option", "minDate", "+14d");
    $('#announ_end_date').datepicker("option", "minDate", "+14d");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getRequestTypeList() {
    var result = new Array();
    result = db_getRequestTypeList();
    
    $('#sel_request_type').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['RequestTypeID']  + "'>" + result[i]['RequestType'] + "</option>";
    }
    
    $('#sel_request_type').append(html);
    $('#sel_request_type').selectpicker('refresh');
}

function getDeliveryTypeList(req_type_id) {
    var result = new Array();
    result = db_getDeliveryTypeList(req_type_id);
    
    $('#sel_delivery_type').empty();
    if (result.length > 0) {
        var html = "<option value='0'>Select...</option>";
        for (var i = 0; i < result.length; i++) {
            html += "<option value='" + result[i]['DeliveryTypeID']  + "'>" + result[i]['DeliveryType'] + "</option>";
        }
    }
    
    $('#sel_delivery_type').append(html);
    $('#sel_delivery_type').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deliveryOptions(del_type_id) {
    hideAllDeliverySection();
    hideAllOptionSection();
    clearAllCheckBox();

    switch(del_type_id) {
        case "1":
            $('#delivery_sherpa').show();
            $('#delivery_sherpa').animatePanel();
            break;
        case "2":
            $('#delivery_social_media').show();
            $('#delivery_social_media').animatePanel();
            break;
        case "3":
            $('#delivery_digital_signage').show();
            $('#delivery_digital_signage').animatePanel();
            break;
        default:
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getImageFileInfo(id) {
    var file = $(id).get(0).files[0];
    var f_name = file.name.replace(/#/g, "");
    
    if (typeof file !== "undefined") {
        var f_extension = getFileExtension(f_name);
        if (f_extension !== "jpg" && f_extension !== "jpeg" && f_extension !== "pdf") {
            swal({title: "Warning", text: "Only jpeg/jpg or pdf file can be upload", type: "warning"});
            $(id).filestyle('clear');
            return false;
        } 
        else {   
            if (file.size >= 2000000) {
                swal({title: "Warning", text: "Attached file size is too big, max. file size allow is 2Mb or less", type: "warning"});
                $(id).filestyle('clear');
                return false;
            }
            else {
                return true;
            }
        }
    }
    else {
        return false;
    }
}

function convertImageFiletoBase64(id) {
    var file = $(id).get(0).files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        if (id === "#attach_1") {
            m_file_name_1 = file.name.replace(/#/g, "");
            m_base64_data_1 = reader.result;
        }
        else {
            m_file_name_2 = file.name.replace(/#/g, "");
            m_base64_data_2 = reader.result;
        }
    };

    if (file) {
        reader.readAsDataURL(file);
    } 
}

// user input validation ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function requestValidation() {
    var err = "";
    
    if ($('#req_phone').val().replace(/\s+/g, '') === "") {
        err += "Phone number is a required field\n";
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
    if ($('#alt_phone').val().replace(/[^0-9\.]/g, '') === "") {
        err += "Alternate phone is a required field\n";
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