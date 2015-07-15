var m_file_name_1 = "";
var m_file_name_2 = "";

var m_base64_data_1 = "";
var m_base64_data_2 = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        isLoginAdmin();
        getLoginInfo();
    }
    else {
        window.open('Login.html', '_self');
    }
};

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
    $('.hide-menu').click(function(event){
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
    $('.showhide').click(function (event) {
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
    $('.closebox').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
    });
    
    // Function for small header
    $('.small-header-action').click(function(event){
        event.preventDefault();
        var icon = $(this).find('i:first');
        var breadcrumb  = $(this).parent().find('#hbreadcrumb');
        $(this).parent().parent().parent().toggleClass('small-header');
        breadcrumb.toggleClass('m-t-lg');
        icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    });
    
    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();
    
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
    // Fix Bootstrap backdrop issue with animation.css
    $('.modal').appendTo("body");
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // contract email validation event /////////////////////////////////////////
    $('#cont_email').change(function() {
        if (!isValidEmailAddress($(this).val())) {
            $(this).val("");
            swal({title: "Warning", text: "Please enter valid email address", type: "warning"});
        }
    });
    
    // attachment 1 button click ///////////////////////////////////////////////
    $('#attach_1').change(function() {
        getImageFileInfo("#attach_1");
        convertImageFiletoBase64("#attach_1");
    });
    
    // attachment 2 button click ///////////////////////////////////////////////
    $('#attach_2').change(function() {
        getImageFileInfo("#attach_2");
        convertImageFiletoBase64("#attach_2");
    });
    
    // submit button click /////////////////////////////////////////////////////
    $('#btn_submit').click(function() {        
        if (mrktSubmit()) {
            swal({title: "Submitted!", text: "Your request has been submitted successfuly", type: "success"});
            window.open('home.html', '_self');
            return false;
        }
        else {
            swal({title: "Error", text: "There was a system error. please conatact IT support at 949.451.5696 or ivctech@ivc.edu", type: "error"});
        }
    });
    
    // cancel button click /////////////////////////////////////////////////////
    $('#btn_cancel').click(function() {
        window.open('home.html', '_self');
        return false;
    });
    
    // bootstrap datepicker
    $('#event_date').datepicker();
    $('#announ_start').datepicker();
    $('#announ_end').datepicker();
    
    // timepicker
    $('#event_time').timepicker();
    
    // auto size
    $('#announ_text').autosize();
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
    if(!effect) { effect = 'zoomIn';};
    if(!delay) { delay = 0.06; } else { delay = delay / 10; };
    if(!child) { child = '.row > div';} else {child = "." + child;};

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opactiy to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('animated-panel').addClass(effect);

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });
};

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_mrkt_loginName');
    $('#login_user').html(login_name);
    $('#req_name').val(login_name);
    
    var login_email = sessionStorage.getItem('ss_mrkt_loginEmail');
    $('#req_email').val(login_email);
    
    var department = sessionStorage.getItem('ss_mrkt_department');
    $('#department').val(department);
    
    $('#req_date').val(getToday());
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getImageFileInfo(id) {
    var file = $(id).get(0).files[0];
    var f_name = file.name.replace(/#/g, "");
    
    if (typeof file !== "undefined") {
        var f_extension = getFileExtension(f_name);
        if (f_extension !== "jpg" && f_extension !== "jpeg") {
            swal({title: "Warning", text: "Only jpeg/jpg file can be upload", type: "warning"});
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mrktSubmit() {
    var event_request_id = insertEventRequest();
    insertAttachment(event_request_id);
    if (insertSherpa(event_request_id) === "") {
        return false;
    }
    if (insertSocialMedia(event_request_id) === "") {
        return false;
    }
    if (insertDigitalSignage(event_request_id) === "") {
        return false;
    }
    
    return true;
}

function insertEventRequest() {
    var req_name = textReplaceApostrophe($('#req_name').val());
    var req_phone = textReplaceApostrophe($('#req_phone').val());
    var req_email = textReplaceApostrophe($('#req_email').val());
    var department = textReplaceApostrophe($('#department').val());
    var req_date = $('#req_date').val();
    var event_title = textReplaceApostrophe($('#event_title').val());
    var event_date = $('#event_date').val();
    var event_time = $('#event_time').val();
    var event_location = textReplaceApostrophe($('#event_location').val());
    var cont_name = textReplaceApostrophe($('#cont_name').val());
    var cont_phone = textReplaceApostrophe($('#cont_phone').val());
    var cont_email = textReplaceApostrophe($('#cont_email').val());
    var announ_start = $('#announ_start').val();
    var announ_end = $('#announ_end').val();
    var announ_text = textReplaceApostrophe($('#announ_text').val());
    
    return db_insertEventRequest(1, req_name, req_phone, req_email, department, req_date, event_title, event_date, event_time, event_location, cont_name, cont_phone, cont_email, announ_start, announ_end, announ_text);
}

function insertAttachment(event_request_id) {
    if (m_base64_data_1 !== "") {
        db_insertAttachment(event_request_id, m_file_name_1, m_base64_data_1);
    }
    if (m_base64_data_2 !== "") {
        db_insertAttachment(event_request_id, m_file_name_2, m_base64_data_2);
    }
}

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