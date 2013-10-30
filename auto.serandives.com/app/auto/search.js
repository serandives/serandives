var page = require('serand').page;

var searchEl;

page('*', 'three-column', function (ctx, next) {
    var vars = ctx.layout.vars;
    console.log('adding auto search');
    console.log(ctx.layout.header);
    searchEl || (searchEl = $(require('./search-ui')).appendTo(vars.left));
    next();
});