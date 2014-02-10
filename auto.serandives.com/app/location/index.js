var dust = require('dust')();
var serand = require('serand');

dust.loadSource(dust.compile(require('./address-ui'), 'location-address'));

module.exports.address = function (options, fn) {
    dust.render('location-address', {}, function (err, out) {
        if (err) {
            return;
        }
        options.el.append(out);
        fn(false, function () {
            options.el.remove('.location-address');
        });
    });
};

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