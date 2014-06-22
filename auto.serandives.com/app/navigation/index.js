var dust = require('dust')();
var serand = require('serand');

var user;

dust.loadSource(dust.compile(require('./template'), 'navigation-ui'));

module.exports = function (el, fn, options) {
    dust.render('navigation-ui', options, function (err, out) {
        if (err) {
            fn(err);
            return;
        }
        var login = function (user) {
            dust.renderSource(require('./user-ui'), user, function (err, out) {
                $('.navbar-right', el).html(out);
                $('.navigation-user-ui', el).on('click', '.logout', function () {
                    serand.emit('user', 'logout', user);
                });
            });
        };
        $(out).appendTo(el);
        serand.on('user', 'login', login);
        if (user) {
            login(user);
        }
        fn(false, function () {
            el.remove('.navigation');
        });
    });
};

serand.on('user', 'login', function (data) {
    user = data;
});

serand.on('user', 'logout', function (data) {
    user = null;
});