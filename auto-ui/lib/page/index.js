var page = require('page');

page('/register', function(ctx) {
    console.log('register');
    var component = require('auto-list');
    component.start("single");
});

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
});