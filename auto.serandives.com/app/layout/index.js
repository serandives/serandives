var serand = require('serand'),
    page = serand.page;

var layout;

/*page('*', function (ctx, next) {
    layout || (layout = $(require('./three-column')).appendTo('#content'));
    next();
});*/

/*serand.on('layout', 'update', function (name) {
    if (layout) {
        if (layout.name === name) {
            return;
        }
        layout.el.remove();
    }
    layout = {
        name: name,
        el: $(require('./' + name)).appendTo('#content')
    };
    serand.on('layout', 'updated', layout.el);
});*/

var el = $(require('./three-column'));

serand.layout('*', 'three-column', {
    el: el,
    vars: {
        header: $('.header', el),
        left: $('.left', el),
        middle: $('.middle', el)
    }
});

/*serand.on('user', 'register', function() {

 });*/
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
