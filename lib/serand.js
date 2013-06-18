var on = function(module, event, fn) {};
/*
user - login, register
menu - primary, secondary
footer - footer
banner - x800, x400
*/

on('user', '.login', function() {

});

on('user', '.register', function() {

});

on('user', '.login1', function() {

});

on('user', '#register', function() {

});

on(['#login1', '#primary1'], function() {

});

var page = [];
var user = require('user');
var u1 = new user.User('ruchira@wso2.com');
u1.json();
u1.html();
u1.js();
u1.css();
u1.code();

u1.on('login success', function() {

});

u1.on('login error', function() {

});

var menu = require('menu');
var m1 = new menu.Menu([]);
page.push(m1);
