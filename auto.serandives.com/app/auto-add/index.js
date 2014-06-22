var dust = require('dust')();
var serand = require('serand');

dust.loadSource(dust.compile(require('./template'), 'auto-add'));

module.exports = function (sandbox, fn, options) {
    dust.render('auto-add', {}, function (err, out) {
        if (err) {
            return;
        }
        var elem = sandbox.append(out);
        $('.make', elem).selecter({
            label: 'Make'
        });
        $('.model', elem).selecter({
            label: 'Model'
        });
        $('.year', elem).selecter({
            label: 'Year'
        });
        fn(false, function () {
            sandbox.remove('.auto-add');
        });
    });
};