var dust = require('dust')();
var serand = require('serand');

var user;

var elems = [];

var login = function (el, user) {
    dust.renderSource(require('./user-logged-ui'), user, function (err, out) {
        $('.navbar-right', el).html(out);
        $('.navigation-user-ui', el).on('click', '.logout', function () {
            serand.emit('user', 'logout', user);
        });
    });
};

var anon = function (el) {
    dust.renderSource(require('./user-anon-ui'), {}, function (err, out) {
        $('.navbar-right', el).html(out);
    });
};

dust.loadSource(dust.compile(require('./template'), 'navigation-ui'));

module.exports = function (el, fn, options) {
    dust.render('navigation-ui', options, function (err, out) {
        if (err) {
            fn(err);
            return;
        }
        var elem = $(out).appendTo(el);
        user ? login(elem, user) : anon(elem);
        elems.push(elem);
        fn(false, function () {
            el.remove('.navigation');
        });
    });
};

serand.on('boot', 'page', function (ctx) {
    elems = [];
});

serand.on('user', 'login', function (data) {
    user = data;
    elems.forEach(function (el) {
        login(el, user);
    });
});

serand.on('user', 'logout', function (data) {
    user = null;
    elems.forEach(function (el) {
        anon(el);
    });
});