var dust = require('dust')();

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