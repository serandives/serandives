var serand = require('serand');
var page = serand.page;

var listingEl;

var dust = require('dust')({
    slice: function (chunk, context, bodies, params) {
        return chunk.map(function (chunk) {
            var ctx = context.current(),
                length = ctx.length,
                start = parseInt(params.start, 10) || 0,
                end = parseInt(params.end, 10) || length,
                count = parseInt(params.count, 10) || length,
                size = parseInt(params.size, 10) || length,
                i = start,
                c = 0;
            while (i < end && c++ < count) {
                console.log(ctx.slice(i, (i + size)));
                chunk.render(bodies.block, context.push(ctx.slice(i, (i += size))));
            }
            chunk.end();
        });
    }
});

page('*', 'three-column', function (ctx, next) {
    var vars = ctx.layout.vars;
    console.log('adding auto listing');
    console.log(ctx.layout.header);
    var fn = dust.compileFn(require('./listing-ui'));
    fn({autos: [
        {
            title: 'Insight1',
            thumbnail: '/images/prius.jpeg',
            make: 'Toyota',
            model: 'Prius',
            year: 2013,
            price: '4400000LKR',
            color: 'Metallic Black'
        },
        {
            title: 'Insight2',
            thumbnail: '/images/prius.jpeg',
            make: 'Toyota',
            model: 'Prius',
            year: 2013,
            price: '4400000LKR',
            color: 'Metallic Black'
        },
        {
            title: 'Insight3',
            thumbnail: '/images/prius.jpeg',
            make: 'Toyota',
            model: 'Prius',
            year: 2013,
            price: '4400000LKR',
            color: 'Metallic Black'
        },
        {
            title: 'Insight1',
            thumbnail: '/images/prius.jpeg',
            make: 'Toyota',
            model: 'Prius',
            year: 2013,
            price: '4400000LKR',
            color: 'Metallic Black'
        },
        {
            title: 'Insight2',
            thumbnail: '/images/prius.jpeg',
            make: 'Toyota',
            model: 'Prius',
            year: 2013,
            price: '4400000LKR',
            color: 'Metallic Black'
        },
        {
            title: 'Insight3',
            thumbnail: '/images/prius.jpeg',
            make: 'Toyota',
            model: 'Prius',
            year: 2013,
            price: '4400000LKR',
            color: 'Metallic Black'
        }
    ]}, function (err, data) {
        if (!err) {
            listingEl = $(data).appendTo(vars.middle);
        }
    });
    next();
});