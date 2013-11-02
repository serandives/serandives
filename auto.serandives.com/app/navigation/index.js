var dust = require('dust')();

module.exports.navigation = function (action, options) {
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
            options.el.remove('.navigation');
            break;
    }
};