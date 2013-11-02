var serand = require('serand');
var page = serand.page;

var listingEl;

var dust = require('dust')();

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