var m_previous_url = "";
var mrkt_request_id = "";
var rpt_option_id = "";
var m_table;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        isLoginAdmin();
        getLoginInfo();
        setActiveNavMenu();
        
        if(!getMrktRequestID()) {
            window.open('home.html', '_self');
            return false;
        }
        else {
            getMrktRequest();
            getMrktTask();
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
            var site_url = window.location.href.replace("rptMrktReqView.html", "attach_files/");
            var file_link_name = result[0]['FileLinkName'];
            window.open(site_url + file_link_name, '_blank');
            return false;
        }
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
    // ivc tech support click //////////////////////////////////////////////////
    $('#mod_btn_ivc_tech_submit').click(function() { 
        if (!appSystemTechSupport("Application Web Site: Marketing and Creative Services Request - Print View<br/><br/>", $('#mod_ivc_tech_problems').val(), str_img)) {
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
    rpt_option_id = sessionStorage.getItem('ss_rpt_option_id');
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

function setActiveNavMenu() {
    $('#li_rpt_my_history').removeClass('active');
    $('#li_rpt_all_request').removeClass('active');
    $('#li_rpt_in_process').removeClass('active');
    $('#li_rpt_completed').removeClass('active');
    $('#li_rpt_cancelled').removeClass('active');
    
    if (sessionStorage.getItem('ss_mrkt_referrer') === "home.html") {
        m_previous_url = "home.html";
        $('#home_icon').addClass('ivcmarkt_active_color');
        $('#sidebar-reports').removeClass('in');
    }
    else if (sessionStorage.getItem('ss_mrkt_referrer') === "rptMyHistoryList.html") {
        m_previous_url = "rptMyHistoryList.html";
        $('#nav_sidebar_reports').addClass('active');
        $('#li_rpt_my_history').addClass('active');
    }
    else if (sessionStorage.getItem('ss_mrkt_referrer') === "rptAllRequest.html") {
        m_previous_url = "rptAllRequest.html";
        $('#nav_sidebar_reports').addClass('active');
        if (rpt_option_id === "0") {
            $('#li_rpt_all_request').addClass('active');
        }
        else if (rpt_option_id === status_in_progress_id) {
            $('#li_rpt_in_process').addClass('active');
        }
        else if (rpt_option_id === status_complete_id) {
            $('#li_rpt_completed').addClass('active');
        }
        else if (rpt_option_id === status_cancel_id) {
            $('#li_rpt_cancelled').addClass('active');
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
function getMrktRequest() {
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
    str_html += "<div class='col-sm-5 col-sm-offset-4'>";
    str_html += "<p class='form-control ivcmrkt-text-area-view'>" + file_name + "</p>";
    str_html += "</div>";
    str_html += "<div class='col-sm-2'>";
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
            $("#ckb_main_print").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_print_section').show();
            getMrktPrint();
        }
        else {
            $("#ckb_main_print").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktPhoto'] === "1") {            
            $("#ckb_main_photo").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_photo_section').show();
            getMrktPhoto();
        }
        else {
            $("#ckb_main_photo").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktMedia'] === "1") {            
            $("#ckb_main_media").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_media_section').show();
            getMrktMedia();
        }
        else {
            $("#ckb_main_media").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktWeb'] === "1") {            
            $("#ckb_main_web").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_web_section').show();
            getMrktWeb();
        }
        else {
            $("#ckb_main_web").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktVideo'] === "1") {            
            $("#ckb_main_video").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#main_video_section').show();
            getMrktVideo();
        }
        else {
            $("#ckb_main_video").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckbMrktEditorial'] === "1") {            
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
        $('#prt_date_need').html(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
        
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
        $('#pht_event_date').html(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
        $('#pht_event_time').html(result[0]['EventTime']);
        $('#pht_event_location').html(result[0]['Location']);
        $('#pht_event_estimate_time').html(result[0]['EstimatedTime']);
    }
}

function getMrktMedia() {
    var result = new Array();
    result = db_getMrktMediaByReqID(mrkt_request_id);
    
    if (result.length === 1) {        
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
            getMrktMediaMonitor();
        }
        else {
            $("#ckb_mda_monitor").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_mda_social_media'] === "1") {
            $("#ckb_mda_social_media").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#mda_social_media_section').show();
            getMrktMediaPost();
        }
        else {
            $("#ckb_mda_social_media").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_mda_college_entrance'] === "1") {
            $("#ckb_mda_college_entrance").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#mda_college_entrance_section').show();
            getMrktMediaEntrance();
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

function getMrktMediaMonitor() {
    var result = new Array();
    result = db_getMrktMediaMonitorByReqID(mrkt_request_id);

    if (result.length === 1) {
        $('#mda_monitor_start_date').html(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
        $('#mda_monitor_end_date').html(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
    }
}

function getMrktMediaPost() {
    var result = new Array();
    result = db_getMrktMediaPostByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#mda_soc_media_date').html(moment(result[0]['PostDate']).format('MM/DD/YYYY'));
    }
}

function getMrktMediaEntrance() {
    var result = new Array();
    result = db_getMrktMediaEntranceByReqID(mrkt_request_id);

    if (result.length === 1) {
        $('#mda_college_entrance_start_date').html(moment(result[0]['StartDate']).format('MM/DD/YYYY'));
        $('#mda_college_entrance_end_date').html(moment(result[0]['EndDate']).format('MM/DD/YYYY'));
    }
}

function getMrktWeb() {
    var result = new Array();
    result = db_getMrktWebByReqID(mrkt_request_id);
    
    if (result.length === 1) {        
        $('#web_date_needed').html(moment(result[0]['DateNeeded']).format('MM/DD/YYYY'));
        
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
        if (result[0]['ckb_vdo_filming_request'] === "1") {
            $("#ckb_vdo_filming_request").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#vdo_filming_request_section').show();
            getMrktVideoFilming();
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

function getMrktVideoFilming() {
    var result = new Array();
    result = db_getMrktVideoFilmingByReqID(mrkt_request_id);
    
    if (result.length === 1) {
        $('#vdo_filming_date').html(moment(result[0]['EventDate']).format('MM/DD/YYYY'));
        $('#vdo_filming_time').html(result[0]['EventTime']);
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
        if (result[0]['ckb_edt_copywriting'] === "1") {
            $("#ckb_edt_copywriting").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#edt_copywriting_date_needed').html(moment(result[0]['CWDateNeeded']).format('MM/DD/YYYY'));
        }
        else {
            $("#ckb_edt_copywriting").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
        if (result[0]['ckb_edt_proofreading'] === "1") {
            $("#ckb_edt_proofreading").append("<i class='ion-android-checkbox ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
            $('#edt_proofreading_date_needed').html(moment(result[0]['PRDateNeeded']).format('MM/DD/YYYY'));
        }
        else {
            $("#ckb_edt_proofreading").append("<i class='ion-android-checkbox-outline-blank ivcmrkt-pos-neg-10' style='font-size: 28px;'></i>");
        }
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