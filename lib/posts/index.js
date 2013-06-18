
var express = require('express');
var app = module.exports = express();

app.get('/posts', function(req, res) {
    res.render('list of posts');
});