var tokenKey = 'accessToken',
    userNameKey = 'userName',
    userName = '',
    login, logout, register;

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
        $('#wellcomeMessage').show();
        $('#btnLogout').show();
        sessionStorage.setItem(tokenKey, data.access_token);
        sessionStorage.setItem(userNameKey, userName);
    }).fail(function () { });
}

register = function () {
    var data = {
        Email: app.registerEmail(),
        Password: app.registerPassword(),
        ConfirmPassword: app.registerPassword2()
    };

    $.ajax({
        type: 'POST',
        url: '/api/Account/Register',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
    }).done(function (data) {
        alert("Done!");
    }).fail(function () {
        alert("Error");
    });
}

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
    }).fail(function () {
        alert("Error");
    });
}

$(document).ready(function () {
    $('#wellcomeMessage').hide();
    $('#btnLogout').hide();
    $('#btnLogin').on('click', login);
    $('#btnLogout').on('click', logout);
});