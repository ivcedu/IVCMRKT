////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    $('#logn_error').hide();
    var curBrowser = bowser.name;
    var curVersion = Number(bowser.version);
    
    switch (curBrowser) {
        case "Safari":
            if (curVersion < 6)
                window.open('browser_not_support.html', '_self');
            break;
        case "Chrome":
            if (curVersion < 7)
                window.open('browser_not_support.html', '_self');
            break;
        case "Firefox":
            if (curVersion < 22)
                window.open('browser_not_support.html', '_self');
            break;
        case "Internet Explorer":
            if (curVersion < 11)
                window.open('browser_not_support.html', '_self');
            break;
        default:     
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {      
    $('#btn_login').click(function() { 
        // ireport.ivc.edu validation //////////////////////////////////////////
        if(location.href.indexOf("ireport.ivc.edu") >= 0 && !ireportValidation()) {
            swal({  title: "Access Denied",
                    text: "This is a Development site. It will redirect to IVC Application site",
                    type: "error",
                    confirmButtonText: "OK" },
                    function() {
                        sessionStorage.clear();
                        window.open('https://services.ivc.edu/', '_self');
                        return false;
                    }
            );
        }
        ////////////////////////////////////////////////////////////////////////
        else {
            var login_error = loginInfo();
            if(login_error === "") {
                window.open('home.html', '_self');
                return false;
            }
            else {
                $('#error_msg').html(login_error);
                $('#logn_error').show();
                this.blur();
                return false;
            }
        }
    });
    
    $.backstretch(["images/ivcmrkt_back_web_3.jpg"], {duration: 3000, fade: 750});
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    var username = $('#username').val().toLowerCase();
    var password = $('#password').val();
    var error = loginEmailValidation(username);
    if(error !== "") {
        return error;
    }
    
    var result = new Array();
    username = username.replace("@ivc.edu", "");
    result = getLoginUserInfo("php/login.php", username, password);    
    if (result.length === 0) {
        return "Invalid Email or Password";
    }
    else {
        var name = objToString(result[0]);
        var email = objToString(result[1]);
        var department = objToString(result[2]);
        var phone = objToString(result[3]);
        sessionData_login(name, email, department, phone);
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function loginEmailValidation(login_email) {    
    if (login_email.indexOf("@ivc.edu") !== -1) {
        return "";
    }
    else {
        return "Invalid Email";
    }
}

////////////////////////////////////////////////////////////////////////////////
function ireportValidation() {
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "").replace("@saddleback.edu", "");
    if (ireportDBgetUserAccess(username) !== null) {
        return true;
    }
    else {
        return false;
    }
}