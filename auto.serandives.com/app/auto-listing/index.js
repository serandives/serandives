var dust = require('dust')();
var serand = require('serand');

var user;

var list = function (el, options, paging, fn) {
    $.ajax({
        url: '/apis/v/vehicles',
        headers: {
            'x-host': 'auto.serandives.com:4000'
        },
        dataType: 'json',
        success: function (data) {
            dust.render('auto-listing', data, function (err, out) {
                $('.auto-listing', el).remove();
                el.off('click', '.auto-sort .btn');
                el.append(out);
                el.on('click', '.auto-sort .btn', function () {
                    var sort = $(this).attr('name');
                    var serand = require('serand');
                    serand.emit('auto', 'sort', { sort: sort});
                    list(options, {
                        sort: sort
                    });
                });
                if (!fn) {
                    return;
                }
                fn(false, function () {
                    el.remove('.auto-listing');
                });
            });
        },
        error: function () {
            fn(true, function () {

            });
        }
    });
};

dust.loadSource(dust.compile(require('./template'), 'auto-listing'));

module.exports = function (sandbox, fn, options) {
    list(sandbox, options, {
        sort: 'recent'
    }, fn);
};

serand.on('user', 'login', function (data) {
    user = data;
});
