var m_event_request_id = "";
var m_admin = false;

var m_base64_data_1 = "";
var m_base64_data_2 = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        getURLParameters();
        isLoginAdmin();
        getLoginInfo();
        getEventRequest();
    }
    else {
//        var str_url = location.href;
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
//    $('.i-checks').iCheck({
//        checkboxClass: 'icheckbox_square-green',
//        radioClass: 'iradio_square-green'
//    });
    
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

    // save button click /////////////////////////////////////////////////////
    $('#btn_save').click(function() {
        window.open('home.html', '_self');
        return false;
    });

    // cancel button click /////////////////////////////////////////////////////
    $('#btn_cancel').click(function() {
        window.open('home.html', '_self');
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
        m_admin = true;
        var referrer =  document.referrer;
        if (referrer.indexOf("adminReqList.html") >= 0) {
            $('#menu_admin_sub_req_list').addClass("active");
        }
        else {
            $('#menu_admin_sub_complete_list').addClass("active");
        }
        
        setStatusList();
        $('#menu_administrator').show();
        $('#admin_section').show();
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
    
    if (result.length === 1) {
        if (m_admin) {
            $('#req_status').val(result[0]['StatusID']);
            $('#req_status').selectpicker('refresh');
        }
        $('#req_name').html(result[0]['ReqName']);
        $('#req_phone').html(result[0]['ReqPhone']);
        $('#req_email').html(result[0]['ReqEmail']);
        $('#department').html(result[0]['Department']);
        $('#req_date').html(result[0]['ReqDate']);
        $('#event_title').html(result[0]['EventTitle']);
        $('#event_date').html(result[0]['EventDate']);
        $('#event_time').html(result[0]['EventTime']);
        $('#event_location').html(result[0]['Location']);
        $('#cont_name').html(result[0]['ContactName']);
        $('#cont_phone').html(result[0]['ContactPhone']);
        $('#cont_email').html(result[0]['ContactEmail']);
        $('#announ_start').html(result[0]['AnnounceStart']);
        $('#announ_end').html(result[0]['AnnounceEnd']);
        getEventAttachment();
        $('#announ_text').html(result[0]['AnnounceText'].replace(/\n/g, "<br>"));
        if (result[0]['Email'] === "1") {
            $('#ckb_email').prop('checked', true);
        }
        if (result[0]['Newsfeed'] === "1") {
            $('#ckb_newsfeed').prop('checked', true);
        }
        if (result[0]['Facebook'] === "1") {
            $('#ckb_facebook').prop('checked', true);
        }
        if (result[0]['Twitter'] === "1") {
            $('#ckb_twitter').prop('checked', true);
        }
        if (result[0]['Instagram'] === "1") {
            $('#ckb_instagram').prop('checked', true);
        }
        if (result[0]['BSTIC'] === "1") {
            $('#ckb_bstic').prop('checked', true);
        }
        if (result[0]['SSC'] === "1") {
            $('#ckb_ssc').prop('checked', true);
        }
        if (result[0]['LSB'] === "1") {
            $('#ckb_lsb').prop('checked', true);
        }
        
        getTransaction();
    }
    
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
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