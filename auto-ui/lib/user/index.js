var serand = require('serand'),
    page = serand.page;

//console.log('registered: module-user');

var loginEl;

page('/register', function (ctx, next) {
    loginEl || (loginEl = $(require('./login-ui')).appendTo('.right'));
    $('.right .login').on('click', '.submit', function () {
        //alert('submitting');
        serand.emit('user', 'register', { username : 'ruchira' });
    });
    next();
});

var logout;
page('/logout', function (ctx, next) {
    logout || (logout = $(require('./login-ui')).appendTo('.middle'));
    next();
});

var navEl;

page('*', function (ctx, next) {
    console.log('adding navigation');
    navEl || (navEl = $(require('./nav-ui')).appendTo('.left'));
    next();
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
