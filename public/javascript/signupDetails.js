var signupUserDetails = () => {
    var userData = {};
    userData.accountId = $("#userAccountId").val();
    userData.accountPwd = $("#password").val();
    userData.mailId = $("#email").val();
    console.log(userData);

    $.ajax({
        url: '/newuser/signup',
        method: 'POST',
        data: userData,
        dataType: 'JSON',
        success: (response  ) => {
            console.log(response);
            if (response.status == 'Success') {
                $("#signupResult").html(response.msg);
            } else {
                var msg = `<b style='color: red'>${response.msg}</b>`;
                $("#signupResult").html(msg);
            }
        },
        error: (error) => {
            console.log(error);
        }
    })
    
}