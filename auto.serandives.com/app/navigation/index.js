var dust = require('dust')();
var serand = require('serand');

module.exports.navigation = function (action, options) {
    switch (action) {
        case 'create':
            dust.renderSource(require('./nav-ui'), {}, function (err, out) {
                if (err) {
                    return;
                }
                var el = $(out).appendTo(options.el);
                serand.on('user', 'login', function (user) {
                    dust.renderSource(require('./user-ui'), user, function (err, out) {
                        $('.navbar-right', el).html(out);
                    });
                });
            });
            break;
        case 'destroy':
            options.el.remove('.navigation');
            break;
    }
};