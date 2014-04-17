var dust = require('dust')();
var serand = require('serand');

dust.loadSource(dust.compile(require('./nav-ui'), 'user-nav'));

module.exports.links = function (options, fn) {
    dust.render('user-nav', {}, function (err, out) {
        if (err) {
            return;
        }
        options.el.append(out);
        fn(false, function () {
            options.el.remove('.user-nav');
        });
    });
};

dust.loadSource(dust.compile(require('./login-ui'), 'user-login'));

module.exports.login = function (options, fn) {
    dust.render('user-login', {}, function (err, out) {
        if (err) {
            return;
        }
        options.el.append(out);
        options.el.on('click', '.user-login .signin', function (e) {
            var el = $('.user-login');
            var username = $('.username', el).val();
            var password = $('.password', el).val();
            serand.emit('user', 'login', {
                username: username
            });
            return false;
        });
        fn(false, function () {
            options.el.remove('.user-login');
        });
    });
};

dust.loadSource(dust.compile(require('./register-ui'), 'user-register'));

module.exports.register = function (options, fn) {
    dust.render('user-register', {}, function (err, out) {
        if (err) {
            return;
        }
        options.el.append(out);
        fn(false, function () {
            options.el.remove('.user-register');
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