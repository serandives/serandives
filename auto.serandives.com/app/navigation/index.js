var serand = require('serand'),
    page = serand.page;

var navEl;

page('*', 'three-column', function (ctx, next) {
    var vars = ctx.layout.vars;
    console.log('adding navigation');
    navEl || (navEl = $(require('./nav-ui')).appendTo(vars.header));
    next();
});