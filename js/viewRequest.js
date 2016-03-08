var m_event_request_id = "";
var m_admin = false;

var m_base64_data_1 = "";
var m_base64_data_2 = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        getURLParameters();
        hideAllDeliverySection();
        hideAllOptionSection();
        
        isLoginAdmin();
        getLoginInfo();
        getEventRequest();
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
function getURLParameters() {
    var searchStr = location.search;
    //var section = location.hash.substring(1,location.hash.length);
    var searchArray = new Array();
    while (searchStr!=='') 
    {
        var name, value;
        // strip off leading ? or &
        if ((searchStr.charAt(0)==='?')||(searchStr.charAt(0)==='&')) 
            searchStr = searchStr.substring(1,searchStr.length);
        // find name
        name = searchStr.substring(0,searchStr.indexOf('='));
        // find value
        if (searchStr.indexOf('&')!==-1) 
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.indexOf('&'));
        else 
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.length);
        // add pair to an associative array
        value = value.replace("%20", " ");
        searchArray[name] = value;
        // cut first pair from string
        if (searchStr.indexOf('&')!==-1) 
            searchStr =  searchStr.substring(searchStr.indexOf('&')+1,searchStr.length);
        else 
            searchStr = '';
    }
    
    m_event_request_id = searchArray['event_request_id'];
}

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

    // save button click /////////////////////////////////////////////////////
    $('#btn_save').click(function() {
        updateEventRequestStatus();
        insertTransaction();
        sendEmailNotification();
        swal({  title: "Updated!", 
                text: "Event Request status has been updated successfuly", 
                type: "success",
                confirmButtonText: "OK",
                closeOnConfirm: false 
            }, 
            function() {   
                window.open('adminReqList.html', '_self');
                return false;
            });
    });

    // cancel button click /////////////////////////////////////////////////////
    $('#btn_cancel').click(function() {
        window.open('adminReqList.html', '_self');
        return false;
    });
    
    // attachment 1 click event ////////////////////////////////////////////////
    $('#attach_1').click(function() {
        if (m_base64_data_1 !== "") {
            $.fancybox.open({ href : m_base64_data_1 });
        }
    });
    
    // attachment 2 click event ////////////////////////////////////////////////
    $('#attach_2').click(function() {
        if (m_base64_data_2 !== "") {
            $.fancybox.open({ href : m_base64_data_2 });
        }
    });

    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
    
    // auto size
    $('#req_comments').autosize();
    
    // disable all icheck
    $('input').iCheck('disable');
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isLoginAdmin() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_mrkt_loginEmail'));
    
    if (result.length === 1) {
        m_admin = true;
        var referrer =  document.referrer;
        if (referrer.indexOf("adminReqList.html") >= 0) {
            $('#menu_admin_sub_req_list').addClass("active");
            $('#admin_section').show();
        }
        else {
            $('#menu_admin_sub_complete_list').addClass("active");
            $('#admin_section').hide();
        }
        
        setStatusList();
        $('#menu_administrator').show();
    }
    else {
        $('#menu_administrator').hide();
        $('#admin_section').hide();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_mrkt_loginName');
    $('#login_user').html(login_name);
}

function setStatusList() {
    var result = new Array();
    result = db_getStatusList();
    
    var status_html = "";
    for (var i = 0; i < result.length; i++) {
        status_html += "<option value ='" + result[i]['StatusID'] + "'>" + result[i]['Status'] + "</option>";
    }
    
    $('#req_status').append(status_html);
    $('#req_status').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getEventRequest() {
    var result = new Array();
    result = db_getEventRequestByID(m_event_request_id);
    
    if (m_admin) {
        $('#req_status').val(result[0]['StatusID']);
        $('#req_status').selectpicker('refresh');
    }
    $('#cur_status').html(result[0]['Status']);
    $('#req_name').html(result[0]['ReqName']);
    $('#req_phone').html(result[0]['ReqPhone']);
    $('#req_email').html(result[0]['ReqEmail']);
    $('#department').html(result[0]['Department']);
    $('#req_date').html(result[0]['ReqDate']);
    $('#req_title').html(result[0]['ReqTitle']);
    $('#req_descrip').html(result[0]['ReqDescrip']);
    $('#sel_request_type').html(result[0]['RequestType']);
    $('#sel_delivery_type').html(result[0]['DeliveryType']);
    
    switch(result[0]['DeliveryTypeID']) {
        case "1":
            getSherpa();
            $('#delivery_sherpa').show();
            break;
        case "2":
            getSocialMedia();
            $('#delivery_social_media').show();
            break;
        case "3":
            getDigitalSignage();
            $('#delivery_digital_signage').show();
            break;
        default:
            break;
    }   

    getTransaction();
    
//    $('.i-checks').iCheck({
//        checkboxClass: 'icheckbox_square-green',
//        radioClass: 'iradio_square-green'
//    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSherpa() {
    var result = new Array();
    result = db_getSherpa(m_event_request_id);
    
    if (result[0]['Email'] === "1") {
        $('#ckb_email').iCheck('check');
        getEventEmail();
        $('#sherpa_email_section').show();
    }
    if (result[0]['Newsfeed'] === "1") {
        $('#ckb_newsfeed').iCheck('check');
        getEventNewsFeed();
        $('#sherpa_newsfeed_section').show();
    }
}

function getEventEmail() {
    var result = new Array();
    result = db_getEventEmail(m_event_request_id);
    
    $('#email_send_date').html(convertDBDateToString(result[0]['SendDate']));
    $('#email_subject').html(result[0]['Subject']);
    $('#email_body').html(result[0]['Body']);
}

function getEventNewsFeed() {
    var result = new Array();
    result = db_getEventNewsFeed(m_event_request_id);
    
    $('#announ_start_date').html(convertDBDateToString(result[0]['AnnStartDate']));
    $('#announ_start_time').html(result[0]['AnnStartTime']);
    $('#announ_end_date').html(convertDBDateToString(result[0]['AnnEndDate']));
    $('#announ_end_time').html(result[0]['AnnEndTime']);
    $('#alt_name').html(result[0]['AltName']);
    $('#alt_email').html(result[0]['AltEmail']);
    $('#alt_phone').html(result[0]['AltPhone']);
    $('#event_title').html(result[0]['AnnTitle']);
    $('#event_location').html(result[0]['AnnLocation']);
    $('#announ_text').html(result[0]['AnnText']);
    $('#announ_descrip').html(result[0]['Description']);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSocialMedia() {
    var result = new Array();
    result = db_getSocialMedia(m_event_request_id);
    
    if (result[0]['Facebook'] === "1") {
        $('#ckb_facebook').iCheck('check');
    }
    if (result[0]['Twitter'] === "1") {
        $('#ckb_twitter').iCheck('check');
    }
    if (result[0]['Instagram'] === "1") {
        $('#ckb_instagram').iCheck('check');
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getDigitalSignage() {
    var result = new Array();
    result = db_getDigitalSignage(m_event_request_id);
    
    if (result[0]['BSTIC'] === "1") {
        $('#ckb_bstic').iCheck('check');
    }
    if (result[0]['SSC'] === "1") {
        $('#ckb_ssc').iCheck('check');
    }
    if (result[0]['LSB'] === "1") {
        $('#ckb_lsb').iCheck('check');
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getEventAttachment() {
    var result = new Array();
    result = db_getEventAttachment(m_event_request_id);
    
    if (result.length === 1) {
        $('#attach_1').html(result[0]['FileName']);
        m_base64_data_1 = result[0]['PDFData'];
    }
    else if (result.length === 2) {
        $('#attach_1').html(result[0]['FileName']);
        m_base64_data_1 = result[0]['PDFData'];
        
        $('#attach_2').html(result[1]['FileName']);
        m_base64_data_2 = result[1]['PDFData'];
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTransaction() {
    var result = new Array();
    result = db_getEventTransaction(m_event_request_id);
    
    var log_html = "";
    for (var i = 0; i < result.length; i++) {
        log_html += result[i]['LoginName'] + " : " + convertDBDateTimeToString(result[i]['DTStamp']) + "<br>" + result[i]['Note'].replace(/\n/g, "<br>") + "<br><br>";
    }
    
    $("#transaction_history").html(log_html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateEventRequestStatus() {
    var req_status_id = $('#req_status').val();

    db_updateEventRequestStatus(m_event_request_id, req_status_id);
}

function insertTransaction() {
    var req_status = $('#req_status option:selected').text();
    var login_name = sessionStorage.getItem('ss_mrkt_loginName');
    var req_comments = $('#req_comments').val();
    
    var note = "Status has been changed to " + req_status;
    if (req_comments !== "") {
        note += "\n" + textReplaceApostrophe($.trim(req_comments));
    }
    
    return db_insertTransaction(m_event_request_id, login_name, note);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function sendEmailNotification() {
    var req_status_id = $('#req_status').val();
    
    switch(req_status_id) {
        case "2":   // No PPRF
            sendEmailNoPPRF();
            break;
        case "3":   // Waiting for more Info
            sendEmailWaitingForMoreInfo();
            break;
        case "4":   // Complete
            sendEmailComplete();
            break;
        case "5":   // Approved
            sendEmailApproved();
            break;
        case "6":   // Hold
            sendEmailHold();
            break;
        case "7":   // Deny
            sendEmailDeny();
            break;
        default:
            break;
    }
}

function sendEmailNoPPRF() {
    var req_email = $('#req_email').html();
    var req_name = $('#req_name').html();
    var subject = "Marketing Announcement Request Status Change To No PPRF";
    var message = "Your request required additional publications materials. Please fill out the ";
    message += "<a href='https://inside.ivc.edu/nonacademic/marketing/publications/Pages/requests.aspx'>publications project request</a>";
    message += " for your printed or graphics materials.<br><br>";
    
    message += "Should you have any questions or comments, please contact the IVC Marketing.<br><br>"; 
    message += "Thank you.<br><br>";
    message += "IVC Public Information & Marketing<br>";
    message += "ivcpio@ivc.edu<br>";
    message += "phone: 949.451.5293";
    
    proc_sendEmail(req_email, req_name, "", "", subject, message);
}

function sendEmailWaitingForMoreInfo() {
    var req_email = $('#req_email').html();
    var req_name = $('#req_name').html();
    var subject = "Marketing Announcement Request Status Change To Waiting For More Info";
    var message = "Your request requires more information. Please read the comment below:<br><br>";
    message += $('#req_comments').val().replace(/\n/g, "<br>") + "<br><br>";
    
    message += "Should you have any questions or comments, please contact the IVC Marketing.<br><br>"; 
    message += "Thank you.<br><br>";
    message += "IVC Public Information & Marketing<br>";
    message += "ivcpio@ivc.edu<br>";
    message += "phone: 949.451.5293";
    
    proc_sendEmail(req_email, req_name, "", "", subject, message);
}

function sendEmailComplete() {
    var req_email = $('#req_email').html();
    var req_name = $('#req_name').html();
    var subject = "Marketing Announcement Request Status Change To Complete";
    var message = "Your request has been successfully completed.<br><br>";
    
    message += "Should you have any questions or comments, please contact the IVC Marketing.<br><br>"; 
    message += "Thank you.<br><br>";
    message += "IVC Public Information & Marketing<br>";
    message += "ivcpio@ivc.edu<br>";
    message += "phone: 949.451.5293";
    
    proc_sendEmail(req_email, req_name, "", "", subject, message);
}

function sendEmailApproved() {
    var req_email = $('#req_email').html();
    var req_name = $('#req_name').html();
    var subject = "Marketing Announcement Request Status Change To Approved";
    var message = "Your request has been approved.<br><br>";
    
    message += "Should you have any questions or comments, please contact the IVC Marketing.<br><br>"; 
    message += "Thank you.<br><br>";
    message += "IVC Public Information & Marketing<br>";
    message += "ivcpio@ivc.edu<br>";
    message += "phone: 949.451.5293";
    
    proc_sendEmail(req_email, req_name, "", "", subject, message);
}

function sendEmailHold() {
    var req_email = $('#req_email').html();
    var req_name = $('#req_name').html();
    var subject = "Marketing Announcement Request Status Change To Hold";
    var message = "Your request is on hold. A member of the Marketing staff will contact you regarding the hold.<br><br>";
    
    message += "Should you have any questions or comments, please contact the IVC Marketing.<br><br>"; 
    message += "Thank you.<br><br>";
    message += "IVC Public Information & Marketing<br>";
    message += "ivcpio@ivc.edu<br>";
    message += "phone: 949.451.5293";
    
    proc_sendEmail(req_email, req_name, "", "", subject, message);
}

function sendEmailDeny() {
    var req_email = $('#req_email').html();
    var req_name = $('#req_name').html();
    var subject = "Marketing Announcement Request Status Change To Deny";
    var message = "Your request has been denied. Please read the comment below:<br>";
    message += $('#req_comments').val().replace(/\n/g, "<br>") + "<br><br>";
    
    message += "Should you have any questions or comments, please contact the IVC Marketing.<br><br>"; 
    message += "Thank you.<br><br>";
    message += "IVC Public Information & Marketing<br>";
    message += "ivcpio@ivc.edu<br>";
    message += "phone: 949.451.5293";
    
    proc_sendEmail(req_email, req_name, "", "", subject, message);
}