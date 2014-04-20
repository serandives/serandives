var express = require('express');

var app = module.exports = express();

// middleware
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/auto'));
//app.use(express.static(__dirname));

app.listen(10000);