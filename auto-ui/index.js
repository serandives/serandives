var dust = require('dustjs-linkedin');
var express = require('express');

var app = module.exports = express();

// middleware
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

// mount
app.use(require('boot'));
