var name = "";
var email = "";
var department = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {  
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
    
    $('#logn_error').hide();
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {      
    $('#btn_login').click(function() { 
        $('#error_msg').html("");
        $('#logn_error').hide();

        if(loginInfo()) {
            sessionData_login(name, email, department);
            window.open('home.html', '_self');
            return false;
        }
        else {
            $('#error_msg').html("Invalid username or password");
            $('#logn_error').show();
        }
    });
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    var result = new Array();
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "");
    var password = $('#password').val();
    
    result = getLoginUserInfo("php/login.php", username, password);    
    if (result.length === 0) {
        return false;
    }
    else {
        name = result[0];
        email = result[1];
        department = result[2];
        return true;
    }
}