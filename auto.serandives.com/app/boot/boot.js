var page = require('page');
var async = require('async');
var dust = require('dust')();
var serand = require('serand');

var comps = JSON.parse(require('./component.json'));
comps.local.forEach(function (comp) {
    require(comp);
});

var layout = function (name, fn) {
    dust.renderSource(require('./' + name), {}, function (err, out) {
        var el = $(out);
        fn({
            el: el
        }, function (err, result) {
            $('#content').html(el);
            serand.emit('page', 'ready');
        });
    });
};

var current = function(path) {
    var ctx = new page.Context(window.location.pathname + window.location.search);
    var route = new page.Route(path);
    route.match(ctx.path, ctx.params);
    return ctx;
};

page('/', function (ctx) {
    layout('three-column', function (data, fn) {
        async.parallel([
            function (fn) {
                require('navigation').navigation('create', {
                    el: $('#header', data.el)
                }, fn);
            },
            function (fn) {
                require('auto').search('create', {
                    el: $('#left', data.el)
                }, fn);
            },
            function (fn) {
                require('auto').listing('create', {
                    el: $('#middle', data.el)
                }, fn);
            }
        ], function (err, results) {
            fn(err, results);
        });
    });
});

page('/login', function (ctx) {
    layout('single-column', function (data, fn) {
        async.parallel([
            function (fn) {
                require('navigation').navigation('create', {
                    el: $('#header', data.el)
                }, fn);
            },
            function (fn) {
                require('user').login('create', {
                    el: $('#middle', data.el)
                }, fn)
            }
        ], function (err, results) {
            fn(err, results);
        });
    });
});

page('/register', function (ctx) {
    layout('single-column', function (data, fn) {
        async.parallel([
            function (fn) {
                require('navigation').navigation('create', {
                    el: $('#header', data.el)
                }, fn);
            },
            function (fn) {
                require('user').register('create', {
                    el: $('#middle', data.el)
                }, fn);
            }
        ], function (err, results) {
            fn(err, results);
        });
    });
});

page();

serand.on('user', 'login', function (data) {
    var ctx = current('/:action?val=?');
    console.log(ctx);
    page('/');
});

serand.on('user', 'logout', function (data) {
    page('/');
});

serand.emit('boot', 'init');