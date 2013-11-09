var dust = require('dust')();
var serand = require('serand');

module.exports.links = function (action, options) {
    switch (action) {
        case 'create':
            dust.renderSource(require('./nav-ui'), {}, function (err, out) {
                if (err) {
                    return;
                }
                options.el.append(out);
            });
            break;
        case 'destroy':
            options.el.remove('.user-nav');
            break;
    }
};

var user;

serand.on('boot', 'init', function () {
    $.ajax({
        url: '/apis/user',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            serand.emit('user', 'login', data);
        },
        error: function () {
            serand.emit('user', 'error');
        }
    });
});
/*

 setTimeout(function () {
 var serand = require('serand');
 serand.emit('user', 'login', { username: 'ruchira'});
 }, 4000);*/

