var dust = require('dust')();

module.exports.search = function (action, options) {
    switch (action) {
        case 'create':
            dust.renderSource(require('./search-ui'), {}, function (err, out) {
                if (err) {
                    return;
                }
                options.el.append(out);
            });
            break;
        case 'destroy':
            options.el.remove('.search-ui');
            break;
    }
};

module.exports.listing = function (action, options) {
    switch (action) {
        case 'create':
            dust.renderSource(require('./listing-ui'), [
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
            ], function (err, out) {
                if (err) {
                    console.log(err);
                    return;
                }
                options.el.append(out);
            });
            break;
        case 'destroy':
            options.el.remove('.listing-ui');
            break;
    }
};