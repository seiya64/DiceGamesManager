var tokenKey = 'accessToken';

function ViewModel() {
    var self = this;
    
    self.registerEmail = ko.observable();
    self.registerPassword = ko.observable();
    self.registerPassword2 = ko.observable();

    self.loginEmail = ko.observable();
    self.loginPassword = ko.observable();

    self.user = ko.observable();
    self.loged = ko.observable();
}

var app = new ViewModel();

app.register = function () {
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

app.login = function () {
    
    var loginData = {
        grant_type: 'password',
        username: app.loginEmail(),
        password: app.loginPassword()
    };

    $.ajax({
        type: 'POST',
        url: '/Token',
        data: loginData
    }).done(function (data) {
        alert("Login!");
        sessionStorage.setItem(tokenKey, data.access_token);
    }).fail(function () {
        alert("Error");
    });
}

app.logout = function () {
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
        alert("Logout!");
        sessionStorage.removeItem(tokenKey);
    }).fail(function () {
        alert("Error");
    });
}

ko.applyBindings(app);

$(document).ready(function () {
    var token = sessionStorage.getItem(tokenKey);
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }

    $.ajax({
        type: 'GET',
        url: '/api/values',
        headers: headers
    }).done(function (data) {
        app.loged = true;
        app.user(data.userName);
    }).fail(function () {
        alert("Error");
    });
});