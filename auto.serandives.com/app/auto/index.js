var dust = require('dust')();
var serand = require('serand');

var user;

module.exports.search = function (action, options, fn) {
    switch (action) {
        case 'create':
            dust.renderSource(require('./search-ui'), {}, function (err, out) {
                if (err) {
                    return;
                }
                options.el.append(out);
            });
            fn(false);
            break;
        case 'destroy':
            options.el.remove('.search-ui');
            break;
    }
};

var list = function (el, paging) {
    $.ajax({
        url: '/apis/vehicles',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            dust.renderSource(require('./listing-ui'), data, function (err, out) {
                $('.auto-listing', el).remove();
                el.off('click', '.auto-sort .btn');
                el.append(out);
                el.on('click', '.auto-sort .btn', function () {
                    var sort = $(this).attr('name');
                    var serand = require('serand');
                    serand.emit('auto', 'sort', { sort: sort});
                    list(el, {
                        sort: sort
                    });
                });
            });
        },
        error: function () {

        }
    });
};

module.exports.listing = function (action, options, fn) {
    switch (action) {
        case 'create':
            list(options.el, {
                sort: 'recent'
            });
            fn(false);
            break;
        case 'destroy':
            options.el.remove('.auto-listing');
            break;
    }
};

serand.on('user', 'login', function (data) {
    user = data;
});
