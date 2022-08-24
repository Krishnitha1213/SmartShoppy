var loadTemplate = (page) => {
    var templateurl;
    switch (page) {
        case 'login' :
            templateurl = 'templates/login.htm';
            break;
        case 'forgotpwd':
            templateurl = 'templates/forgotPwd.htm';
            break;
        case 'signup':
            templateurl = 'templates/signup.htm';
            break;
        case 'pdetails':
            templateurl = 'templates/productDetails.htm';
            break;
        case 'admin':
            templateurl = 'templates/adminpage.htm';
            break;
    }
    $.ajax({
        url: templateurl,
        method: 'GET',
        data: {},
        success: (response) => {
            $("#templateContainer").html(response);
            if (page == 'pdetails') { // product details page
                loadProductsToPage();
            } else if (page == 'admin') {
                loadSelectedTab('acct');
            }
        },
        error: () => {
            console.log("error")
        }
    });
}

$.ajax({
    url: 'http://localhost:8081/check/sessionSatus',
    method: 'POST',
    dataType: 'JSON',
    success: (response) => {
        if (response.status == true) {
            if (response.isAdmin) {
                loadTemplate('admin');
            } else {
                loadTemplate('pdetails');
            }
            
        } else {
            loadTemplate('login');
        }
    }
})




var validateUserCredentials = () => {
    var userData = {
        userId: $("#userId").val(),
        actPwd: $("#actPwd").val()
    };
    $.ajax({
        url: '/validate/user/details',
        data: userData,
        dataType: 'JSON',
        method: 'POST',
        success: (response) => {
            if (response.msg != 'Valid') {
                $(".errBlock").show();
            } else {
                if (response.isAdmin) {
                    loadTemplate('admin');
                } else { // Normal user
                    loadTemplate('pdetails');
                }
            }
        }
    })
    console.log(userData);
}
