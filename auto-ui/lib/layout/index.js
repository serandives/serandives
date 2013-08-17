var serand = require('serand'),
    page = serand.page;

var layout;

page('*', function (ctx, next) {
    layout || (layout = $(require('./3-column')).appendTo('#content'));
    next();
});

serand.on('user', 'register', function() {

});
/*

 page('/login', function(ctx) {
 console.log('login');
 var component = require('auto-list');
 component.start("single");
 $('body').append(require('./login-ui'));
 });

 page('/logout', function(ctx) {
 console.log('logout');
 var component = require('auto-list');
 component.start("single");
 });*/
