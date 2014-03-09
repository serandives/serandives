var dust = require('dust')();
var serand = require('serand');

var user;

dust.loadSource(dust.compile(require('./address-ui'), 'location-address'));

module.exports.address = function (options, fn) {
    dust.render('location-address', {}, function (err, out) {
        if (err) {
            return;
        }
        options.el.append(out);
        if (options.existing) {
            existing($('.existing', options.el));
        }
        $('.address-new-add a', options.el).click(function (e) {
            e.preventDefault();
            $('.address-new', options.el).show();
        });
        fn(false, function () {
            options.el.remove('.location-address');
        });
    });
};

var existing = function (el) {
    $.ajax({
        url: '/apis/locations',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var html = '';
            data.forEach(function (location) {
                html += '<option value="' + location + '">' + location.name + '</option>';
            });
            $(el).html(html);
        },
        error: function () {

        }
    });
};

serand.on('boot', 'init', function () {
    /*$.ajax({
     url: '/apis/user',
     contentType: 'application/json',
     dataType: 'json',
     success: function (data) {
     serand.emit('user', 'login', data);
     },
     error: function () {
     serand.emit('user', 'error');
     }
     });*/
});
/*

 setTimeout(function () {
 var serand = require('serand');
 serand.emit('user', 'login', { username: 'ruchira'});
 }, 4000);*/