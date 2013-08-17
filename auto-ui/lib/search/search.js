
var page = require('serand').page;

var searchUI;

console.log('module loading');

page('/logout', function() {
    console.log('logging out');
    searchUI || (searchUI = $('body').append(require('./template')));
});