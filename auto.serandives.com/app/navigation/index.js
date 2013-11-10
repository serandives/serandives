var dust = require('dust')();
var serand = require('serand');

var user;

module.exports.navigation = function (action, options, fn) {
    switch (action) {
        case 'create':
            dust.renderSource(require('./nav-ui'), options.data, function (err, out) {
                if (err) {
                    fn(err);
                    return;
                }
                var update = function (user) {
                    dust.renderSource(require('./user-ui'), user, function (err, out) {
                        $('.navbar-right', el).html(out);
                    });
                };
                var el = $(out).appendTo(options.el);
                serand.on('user', 'login', update);
                if (user) {
                    update(user);
                }
                fn(false, options.el);
            });
            break;
        case 'destroy':
            options.el.remove('.navigation');
            break;
    }
};

serand.on('user', 'login', function (data) {
    user = data;
});