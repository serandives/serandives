/*
 var page = require('page');

 page('/register', function (ctx) {
 console.log('register');
 var component = require('auto-list');
 component.start("single");
 });

 page('/login', function (ctx) {
 console.log('login');
 var component = require('auto-list');
 component.start("single");

 $('body').append(require('./login-ui'));
 });

 page('/logout', function (ctx) {
 console.log('logout');
 var component = require('auto-list');
 component.start("single");
 });

 */

var Hydra = require('hydra');

Hydra.module.register("plugin-user",function (bus) {
    return {
        sModule: 'plugin-user',
        init: function () {
            bus.subscribeTo('channel', 'item:action', this.sayHi, this);
        }
    };
}).start();


var serand = require('serand');

serand.on('page', '/:user/profile', function (url) {

});

var login;

/*serand.page('/:user/profile', function() {
 login = $('.right', document).append(loginUI);
 });*/

serand.page('*', function (url) {
    var loginUI = require('./login-ui');
    login = $('.right', document).append(loginUI);
    login.on('click', '.buy', function () {

    });
});

var cart,
    user;

serand.page('/:id/buy', function (url) {
    var cartUI = require('./cart-ui');
    cart = $('.middle', document).append(cartUI);
    cart.on('click', '.buy', function () {
        var callback = function () {
            $.post('/shipping', function () {
                //serand.emit('page', '/buy');
                var shipping = cart.append(require('shipping-ui'));
                shipping.on('click', '.next', function() {

                });
            });
        };
        return user ? serand.emit('user', 'require:login', callback) : callback();
    });
});

serand.page('*', function() {
    cart.remove();
    login.remove();
});

serand.on('user', 'login-user', function (user) {

});


serand.on('user', 'login-user', function (user) {

});

//buying module
serand.emit('user', 'login-user', function (user) {
    console.log(user.name);
});


//user module

var init;

serand.on('user', 'login-user', function (cb) {
    //show login ui
    var box = $('.login', document);
    if (box) {
        var ui = require('./login-ui');
        box = $('.right', document).append(ui);
    }
    $('.submit', box).click(function () {
        cb.apply(cb);
    });
});



























