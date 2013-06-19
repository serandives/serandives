var vehicle = require('vehicle');
var express = require('express');
var app = module.exports = express();

app.use(express.bodyParser());

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.get('/', function (req, res) {
    res.render('index', {});
});