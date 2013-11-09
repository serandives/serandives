var page = require('page');
var dust = require('dust')();
var serand = require('serand');

var lyout;

var comps = JSON.parse(require('./component.json'));
comps.local.forEach(function (comp) {
    require(comp);
});

var layout = function (name, fn) {
    if (lyout == name) {
        fn(false);
        return;
    }
    dust.renderSource(require('./' + name), {}, function (err, out) {
        lyout = name;
        $('#content').html(out);
        fn(true);
    });
};

page('/index.html', function (ctx) {
    layout('three-column', function (fresh) {
        require('navigation').navigation('create', {
            el: $('#header')
        });
        require('auto').search('create', {
            el: $('#left')
        });
        require('auto').listing('create', {
            el: $('#middle')
        });
        serand.emit('page', 'ready');
    });
});

page();

serand.emit('boot', 'init');