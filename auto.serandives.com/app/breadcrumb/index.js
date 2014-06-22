var dust = require('dust')();
var serand = require('serand');

var user;

dust.loadSource(dust.compile(require('./template'), 'breadcrumb-ui'));

module.exports = function (sandbox, fn, options) {
    dust.render('breadcrumb-ui', options, function (err, out) {
        if (err) {
            fn(err);
            return;
        }
        $(out).appendTo(sandbox);
        fn(false, function () {
            sandbox.remove('.breadcrumb');
        });
    });
};
