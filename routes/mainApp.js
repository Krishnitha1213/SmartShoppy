var loadTemplate = (page) => {
    var templateurl;
    switch (page) {
        case 'login' :
            templateurl = 'Templates/LoginPage1.htm';
            break;
        case 'forgotpwd' :
            templateurl = 'Templates/forgotpwd.htm';
            break;
        case 'signup' :
            templateurl = 'Templates/signup.html';
            break;        
    }
    $.ajax({
        url: templateurl,
        method: 'GET',
        data: {},
        success: (response) => {
            console.log(response);
        },
        error: () => {
            console.log("Error while retriving the data");
        }
    })
}

loadTemplate('login');