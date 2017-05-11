var tokenKey = 'accessToken',
    userNameKey = 'userName',
    userName = '',
    login, logout, register, isAuthenticated;

login = function (event) {
    event.preventDefault();
    var loginData = {
        grant_type: 'password',
        username: $('#txtEmail').val(),
        password: $('#txtPassword').val()
    };

    $.ajax({
        type: 'POST',
        url: '/Token',
        data: loginData
    }).done(function (data) {
        userName = data.userName;
        $('#wellcomeMessage').text('Wellcome ' + userName);
        $('#loginForm').hide();
        $('#aRegister').remove();
        $('#wellcomeMessage').show();
        $('#btnLogout').show();
        sessionStorage.setItem(tokenKey, data.access_token);
        sessionStorage.setItem(userNameKey, userName);
    }).fail(function (data) {
        $('#errorMessage').text(data.responseJSON.error_description);
        $('#errorMessage').show();
    });
};

register = function () {
    var data = {
        Email: $('#txtEmail').val(),
        Password: $('#txtPassword1').val(),
        ConfirmPassword: $('#txtPassword2').val()
    };

    $.ajax({
        type: 'POST',
        url: '/api/Account/Register',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
    }).done(function (data) {
        window.location.href = "/";
    }).fail(function (data) {
        $('#errorMessage').text(data.responseJSON.Message);
        $('#errorMessage').show();
    });
};

logout = function () {
    var token = sessionStorage.getItem(tokenKey);
    var headers = {};

    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }

    $.ajax({
        type: 'POST',
        url: '/api/Account/Logout',
        headers: headers
    }).done(function (data) {
        sessionStorage.removeItem(tokenKey);
        sessionStorage.removeItem(userNameKey);
        window.location.href = "/";
    });
};

isAuthenticated = function () {
    var token = sessionStorage.getItem(tokenKey),
        userName = sessionStorage.getItem(userNameKey);

    return token && userName;
};

$(document).ready(function () {
    var userName = sessionStorage.getItem(userNameKey);

    $('#btnLogin').on('click', login);
    $('#btnLogout').on('click', logout);
    $('#btnRegister').on('click', register);

    if (isAuthenticated()) {
        $('#loginForm').remove();
        $('#aRegister').remove();
        $('#wellcomeMessage').text('Wellcome ' + userName);
    }
    else {
        $('#btnLogout').hide();
        $('#errorMessage').hide();
    }

});