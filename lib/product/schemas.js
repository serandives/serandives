var mongoose = require('mongoose');
var Item = require('item').schemas.Item;

var Product = Item.extend({
    creator: String,
    createdAt: String
});

module.exports.Product = Product;