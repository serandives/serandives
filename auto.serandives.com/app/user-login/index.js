var dust = require('dust')();
var serand = require('serand');

var auth;

dust.loadSource(dust.compile(require('./template'), 'user-login'));

module.exports = function (sanbox, fn, options) {
    dust.render('user-login', {}, function (err, out) {
        if (err) {
            return;
        }
        sanbox.append(out);
        sanbox.on('click', '.user-login .login', function (e) {
            var el = $('.user-login');
            var username = $('.username', el).val();
            var password = $('.password', el).val();
            $.ajax({
                method: 'POST',
                url: '/apis/v/token',
                headers: {
                    'x-host': 'accounts.serandives.com:4000'
                },
                data: {
                    grant_type: 'password',
                    username: username,
                    password: password
                },
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                success: function (data) {
                    auth = data;
                    serand.emit('user', 'login', {
                        username: username
                    });
                },
                error: function () {
                    serand.emit('user', 'error');
                }
            });
            return false;
        });
        fn(false, function () {
            sanbox.remove('.user-login');
        });
    });
};


var user;

serand.on('boot', 'init', function () {
    /*$.ajax({
     url: '/apis/user',
     contentType: 'application/json',
     dataType: 'json',
     success: function (data) {
     serand.emit('user', 'login', data);
     },
     error: function () {
     serand.emit('user', 'error');
     }
     });*/
});
/*

 setTimeout(function () {
 var serand = require('serand');
 serand.emit('user', 'login', { username: 'ruchira'});
 }, 4000);*/