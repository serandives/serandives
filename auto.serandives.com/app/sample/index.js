/**
 * var sample = require('./sample');
 * sample({
 *  el: $('.left')
 * });
 *
 * sample('destroy');
 *
 * sample({action: 'destroy'});
 *
 * sample('destroy', options);
 *
 * sample('create', options);
 *
 * sample('init', options);
 */


module.exports = function (options) {

};

/**
 * var user = require('./user');
 * user.profile('create', {
 *  el: $('.left')
 * });
 *
 * user.profile('destroy', {
 *  el: $('.left')
 * });
 *
 */
module.exports.profile = function (action, options) {
    var el;
    switch (action) {
        case 'create':
            el = $('<div class="profile"><div class="info">More</div></div>').appendTo(options.el);
            el.on('click', '.info', function () {
                $.post('/user', function (data) {
                    dust.renderSource(require('./profile-ui'), data, function (err, out) {
                        if (!err) {
                            return;
                        }
                        $('.info', el).html(out);
                    });
                }, 'json');
            });

            serand.on('user logout', function(user) {
                 $('.profile', $(document)).remove();
            });
            break;
        case 'destroy':
            options.el.remove('.profile');
            break;
    }
};