/*
var util = require('util');
var Item = require('item');

var Product = function (options) {
    Item.call(this, options);
    this.price = options.price;
};

util.inherits(Product, Item);*/
var mongoose = require('mongoose');
var schemas = require('./schemas.js');

exports.models = {
    'Product': mongoose.model('Product', schemas.)
};