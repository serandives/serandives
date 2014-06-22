var dust = require('dust')();
var serand = require('serand');

dust.loadSource(dust.compile(require('./template'), 'user-register'));

module.exports = function (sanbox, fn, options) {
    dust.render('user-register', {}, function (err, out) {
        if (err) {
            return;
        }
        sanbox.append(out);
        fn(false, function () {
            sanbox.remove('.user-register');
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