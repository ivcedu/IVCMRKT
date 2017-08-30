// global variables setting ////////////////////////////////////////////////////
var status_draft_id = "1";
var status_submitted_id = "2";
var status_task_assigned_id = "5";
var status_task_partially_assigned_id = "11";
var status_waiting_for_more_info_id = "3";
var status_complete_id = "4";
var status_hold_id = "6";
var status_cancel_id = "7";
var status_in_progress_id = "9";
var status_scheduled_id = "10";

var task_print_id = "2";
var task_photo_id = "3";
var task_media_id = "4";
var task_web_id = "5";
var task_video_id = "6";
var task_editorial_id = "7";

////////////////////////////////////////////////////////////////////////////////
function sessionData_login(loginName, loginEmail, department, phone) {  
    sessionStorage.setItem('ss_mrkt_loginName', loginName);
    sessionStorage.setItem('ss_mrkt_loginEmail', loginEmail);
    sessionStorage.setItem('ss_mrkt_department', department);
    sessionStorage.setItem('ss_mrkt_phone', phone);
}

function sessionData_MrktRequestID(mrkt_request_id) {
    sessionStorage.setItem('ss_mrkt_request_id', mrkt_request_id);
}

////////////////////////////////////////////////////////////////////////////////
function objToString(obj) {
    if (obj === null) {
        return "";
    }
    else {
        return obj;
    }
}

////////////////////////////////////////////////////////////////////////////////
function formatDollar(num, digit) {
    if (digit === 0) {
        var int_num = parseInt(num);
        return "$" + int_num;
    }
    else {
        var p = num.toFixed(digit).split(".");
        return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
            return  num + (i && !(i % 3) ? "," : "") + acc;
        }, "") + "." + p[1];
    }
}

function revertDollar(amount) {
    var result = 0;
    
    if(amount !== "") {
        amount = amount.replace("$", "");
        amount = amount.replace(/\,/g,'');
        result = parseFloat(amount);
    }
    
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function textTruncate(t_size, t_value) {
    var t_default = t_value.length;
    var tr_text = "";
    
    if (t_default > t_size) {
        tr_text = t_value.substring(0, t_size);
        tr_text += " ...";
    }
    else
        tr_text = t_value;
    
    return tr_text;
}

function textReplaceApostrophe(str_value) {
    return str_value.replace(/'/g, "''");
}

////////////////////////////////////////////////////////////////////////////////
function getFileExtension(file_name) {
    return file_name.substr((file_name.lastIndexOf('.') +1)).toLowerCase();
}

////////////////////////////////////////////////////////////////////////////////
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}

function isValidPhoneNumber(phoneNumber) {
    var pattern = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    return pattern.test(phoneNumber);
}

////////////////////////////////////////////////////////////////////////////////
function getToday() {
    var today = new Date();
    var day = today.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var mon = today.getMonth() + 1;
    if (mon < 10) {
        mon = "0" + mon;
    }
    var yr = today.getFullYear();
    return mon + "/" + day + "/" + yr;
}

function convertDBDateTimeToString(date_time) {
    if (date_time === null || date_time === "") {
        return "";
    }
    else {
        var a = date_time.split(" ");
        var d = a[0].split("-");
        var t = a[1].split(":");
        var sel_date_time = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);

        var day = sel_date_time.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var mon = sel_date_time.getMonth() + 1;
        if (mon < 10) {
            mon = "0" + mon;
        }
        var yrs = sel_date_time.getFullYear();
        
        var shift = "AM";
        var hrs = sel_date_time.getHours();
        if (hrs >= 12) {
            if (hrs > 12) {
                hrs -= 12;
            }
            shift = "PM";
        }
        var min = sel_date_time.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }

        return mon + "/" + day + "/" + yrs + " " + hrs + ":" + min + " " + shift;
    }
}

function convertDBDateToString(date_time) {
    if (date_time === null || date_time === "") {
        return "";
    }
    else {
        var a = date_time.split(" ");
        var d = a[0].split("-");
        var t = a[1].split(":");
        var sel_date_time = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);

        var day = sel_date_time.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var mon = sel_date_time.getMonth() + 1;
        if (mon < 10) {
            mon = "0" + mon;
        }
        var yrs = sel_date_time.getFullYear();

        return mon + "/" + day + "/" + yrs;
    }
}

////////////////////////////////////////////////////////////////////////////////
function getDTUIStamp() {
    var result = "";
    var cur_dt = new Date();
    
    result += cur_dt.getFullYear();
    result += cur_dt.getMonth() + 1;
    result += cur_dt.getDate();
    result += cur_dt.getHours();
    result += cur_dt.getMinutes();
    result += cur_dt.getMilliseconds();
    
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function getFistDayOfMothWithSetMonth(change_month) {
    var cur_date = new Date();
    cur_date.setMonth(cur_date.getMonth() + change_month);
    var dt_firstDay = new Date(cur_date.getFullYear(), cur_date.getMonth(), 1);

    var yrs = dt_firstDay.getFullYear();
    var mon = dt_firstDay.getMonth() + 1;
    var day = dt_firstDay.getDate();
    
    return mon + "/" + day + "/" + yrs;
}

function getCurrentLastDayOfMonth() {
    var cur_date = new Date();
    var dt_lastDay = new Date(cur_date.getFullYear(), cur_date.getMonth() + 1, 0);
    
    var yrs = dt_lastDay.getFullYear();
    var mon = dt_lastDay.getMonth() + 1;
    var day = dt_lastDay.getDate();
    
    return mon + "/" + day + "/" + yrs;
}