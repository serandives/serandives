var dust = require('dust')();
var serand = require('serand');

dust.loadSource(dust.compile(require('./template'), 'auto-search'));

module.exports = function (el, fn, options) {
    dust.render('auto-search', {}, function (err, out) {
        if (err) {
            return;
        }
        var elem = el.append(out);
        $('.make', elem).selecter({
            label: 'Make'
        });

        $('.model', elem).selecter({
            label: 'Model'
        });

        fn(false, function () {
            el.remove('.search-ui');
        });
    });
};