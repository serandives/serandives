var serand = require('serand'),
    page = serand.page;

//console.log('registered: module-user');

var listing;

var colors = ['#FFC0CB', '#FF1493', '#DC143C', '#FF0000', '#FFA500', '#BDB76B', '#8B4513', '#6B8E23', '#4169E1', '#696969'];

page('/vehicles', 'three-column', function (ctx, next) {
    var thumbs = dust.compile(require('./auto-thumbs.dust'), 'auto-thumbs');
    dust.loadSource(thumbs);

    var t1 = new Date().getTime();
    for (var i = 0; i < 10; i++) {
        $.get('/apis/v' + i, (function (i) {
            return function (data) {
                //dust.render('auto-thumbs', { vehicles: {}, index: i, color: colors[i]}, function (err, out) {
                    //$(data).appendTo('.middle');
                //});
                console.log(new Date().getTime());
                console.log('==================' + (new Date().getTime() - t1)/1000);
            };
        }(i)));
    }
    next();
});

var logout;
page('/logout', 'three-column', function (ctx, next) {
    logout || (logout = $(require('./login-ui')).appendTo('.middle'));
    next();
});

var navEl;

page('/', 'three-column', function (ctx, next) {
    console.log('adding navigation');
    navEl || (navEl = $(require('./nav-ui')).appendTo('.left'));
    next();
});

page('/', 'three-column', function(ctx, next) {

});

require('./search');
require('./listing');
