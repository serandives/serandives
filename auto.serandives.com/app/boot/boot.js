var page = require('page');
var async = require('async');
var dust = require('dust')();
var serand = require('serand');

var comps = JSON.parse(require('./component.json'));
comps.local.forEach(function (comp) {
    require(comp);
});

var callbacks = [];

var layout = function (name, fn) {
    callbacks.forEach(function (callback) {
        callback();
    });
    dust.renderSource(require('./' + name), {}, function (err, out) {
        var el = $(out);
        fn({
            el: el
        }, function (err, results) {
            callbacks = results;
            $('#content').html(el);
            serand.emit('page', 'ready');
        });
    });
};

var current = function (path) {
    var ctx = new page.Context(window.location.pathname + window.location.search);
    var route = new page.Route(path);
    route.match(ctx.path, ctx.params);
    return ctx;
};

page('/', function (ctx) {
    layout('three-column', function (data, fn) {
        async.parallel([
            function (fn) {
                require('navigation').navigation({
                    el: $('#header', data.el)
                }, fn);
            },
            function (fn) {
                require('auto').search({
                    el: $('#left', data.el)
                }, fn);
            },
            function (fn) {
                require('auto').listing({
                    el: $('#middle', data.el)
                }, fn);
            }
        ], fn);
    });
});

page('/login', function (ctx) {
    layout('single-column', function (data, fn) {
        async.parallel([
            function (fn) {
                require('navigation').navigation({
                    el: $('#header', data.el)
                }, fn);
            },
            function (fn) {
                require('user').login({
                    el: $('#middle', data.el)
                }, fn);
            }
        ], fn);
    });
});

page('/register', function (ctx) {
    layout('single-column', function (data, fn) {
        async.parallel([
            function (fn) {
                require('navigation').navigation({
                    el: $('#header', data.el)
                }, fn);
            },
            function (fn) {
                require('user').register({
                    el: $('#middle', data.el)
                }, fn);
            }
        ], fn);
    });
});

page('/add', function (ctx) {
    layout('single-column', function (data, fn) {
        async.parallel([
            function (fn) {
                require('navigation').navigation({
                    el: $('#header', data.el)
                }, fn);
            },
            function (fn) {
                require('auto').add({
                    el: $('#middle', data.el)
                }, fn);
            }
        ], fn);
    });
});

page('/vehicles/:id', function (ctx) {
    layout('three-column', function (data, fn) {
        async.parallel([
            function (fn) {
                require('navigation').navigation({
                    el: $('#header', data.el)
                }, fn);
            },
            function (fn) {
                require('auto').search({
                    el: $('#left', data.el)
                }, fn);
            },
            function (fn) {
                require('auto').details({
                    el: $('#middle', data.el),
                    data: {
                        id: ctx.params.id
                    }
                }, fn);
            }
        ], fn);
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