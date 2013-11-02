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
        var nav;
        if (!navigation) {
            nav = require('navigation');
            nav.navigation('create', {
                el: $('#header')
            });
            navigation = true;
        }

        var auto;
        if (!autoSearch) {
            auto = require('auto');
            auto.search('create', {
                el: $('#left')
            });
            autoSearch = true;
        }
        if (!autoListing) {
            auto = require('auto');
            try {
                auto.listing('create', {
                    el: $('#middle')
                });
            } catch (e) {
                console.log(e);
            }
        }
        autoListing = true;
    });
});

page();




