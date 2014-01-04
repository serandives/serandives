var dust = require('dust')();
var serand = require('serand');

var user;

dust.loadSource(dust.compile(require('./search-ui'), 'auto-search'));

module.exports.search = function (options) {
    return function (fn) {
        dust.render('auto-search', {}, function (err, out) {
            if (err) {
                return;
            }
            options.el.append(out);
            fn(false, function () {
                options.el.remove('.search-ui');
            });
        });
    };
};

dust.loadSource(dust.compile(require('./add-ui'), 'auto-add'));

module.exports.add = function (options) {
    return function (fn) {
        dust.render('auto-add', {}, function (err, out) {
            if (err) {
                return;
            }
            options.el.append(out);
            fn(false, function () {
                options.el.remove('.auto-add');
            });
        });
    };
};

dust.loadSource(dust.compile(require('./details-ui'), 'auto-details'));

module.exports.details = function (options) {
    console.log(options.data.id);
    return function (fn) {
        var el = options.el;
        $.ajax({
            url: '/apis/vehicles/' + options.data.id,
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                dust.render('auto-details', data, function (err, out) {
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
};

var list = function (options, paging, fn) {
    var el = options.el;
    $.ajax({
        url: '/apis/vehicles',
        contentType: 'application/json',
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

dust.loadSource(dust.compile(require('./listing-ui'), 'auto-listing'));

module.exports.listing = function (options) {
    return function (fn) {
        list(options, {
            sort: 'recent'
        }, fn);
    };
};

serand.on('user', 'login', function (data) {
    user = data;
});
