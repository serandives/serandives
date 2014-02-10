var dust = require('dust')();
var serand = require('serand');

var user;

dust.loadSource(dust.compile(require('./nav-ui'), 'navigation-ui'));

module.exports.navigation = function (options, fn) {
    dust.render('navigation-ui', options.data, function (err, out) {
        if (err) {
            fn(err);
            return;
        }
        var update = function (user) {
            dust.renderSource(require('./user-ui'), user, function (err, out) {
                $('.navbar-right', el).html(out);
                $('.navigation-user-ui').on('click', '.logout', function () {
                    serand.emit('user', 'logout', user);
                });
            });
        };
        var el = $(out).appendTo(options.el);
        serand.on('user', 'login', update);
        if (user) {
            update(user);
        }
        fn(false, function () {
            options.el.remove('.navigation');
        });
    });
};

serand.on('user', 'login', function (data) {
    user = data;
});

serand.on('user', 'logout', function (data) {
    user = null;
});