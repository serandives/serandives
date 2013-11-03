var page = require('page');

var dust = require('dust')();

var lyout;

var layout = function (name, fn) {
    if (lyout == name) {
        fn();
        return;
    }
    dust.renderSource(require('./' + name), {}, function (err, out) {
        lyout = name;
        $('#content').html(out);
        fn();
    });
};

var navigation;
var autoSearch;
var autoListing;

page('*', function (ctx) {
    layout('three-column', function () {
        if (!navigation) {
            require('navigation').navigation('create', {
                el: $('#header')
            });
            navigation = true;
        }

        if (!autoSearch) {
            require('auto').search('create', {
                el: $('#left')
            });
            autoSearch = true;
        }
        if (!autoListing) {
            require('auto').listing('create', {
                el: $('#middle')
            });
            autoListing = true;
        }
    });
});

page();

setTimeout(function () {
    var serand = require('serand');
    serand.emit('user', 'login', { username: 'ruchira'});
}, 4000);




