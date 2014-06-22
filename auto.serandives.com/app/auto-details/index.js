var dust = require('dust')();
var serand = require('serand');

var user;

var list = function (el, options, paging, fn) {
    $.ajax({
        url: '/apis/vehicles',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            dust.render('auto-details', data, function (err, out) {
                $('.auto-details', el).remove();
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
                    el.remove('.auto-details');
                });
            });
        },
        error: function () {
            fn(true, function () {

            });
        }
    });
};

dust.loadSource(dust.compile(require('./template'), 'auto-details'));

module.exports = function (sandbox, fn, options) {
    $.ajax({
        url: '/apis/vehicles/' + options.id,
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            dust.render('auto-details', data, function (err, out) {
                $('.auto-details', sandbox).remove();
                sandbox.off('click', '.auto-sort .btn');
                sandbox.append(out);
                sandbox.on('click', '.auto-sort .btn', function () {
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
                    sandbox.remove('.auto-details');
                });
            });
        },
        error: function () {
            fn(true, function () {

            });
        }
    });
};

serand.on('user', 'login', function (data) {
    user = data;
});
