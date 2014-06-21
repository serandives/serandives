var dust = require('dust')();
var serand = require('serand');

dust.loadSource(dust.compile(require('./template'), 'user-login'));

module.exports = function (el, fn, options) {
    dust.render('user-login', {}, function (err, out) {
        if (err) {
            return;
        }
        el.append(out);
        el.on('click', '.user-login .login', function (e) {
            var el = $('.user-login');
            var username = $('.username', el).val();
            var password = $('.password', el).val();
            serand.emit('user', 'login', {
                username: username
            });
            return false;
        });
        fn(false, function () {
            el.remove('.user-login');
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