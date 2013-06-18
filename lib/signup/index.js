
var express = require('express');
var app = module.exports = express();

app.set('views', __dirname);
//app.set('view engine', 'dust');

/**
 * serandives.com/signup
 */
app.post('/user/signup', function(req, res) {
    console.log(req.body);
    res.send('{error:false}');
    /*res.render('form', { name : "ruchira", age : 28 }, function(err, html, end) {
        console.log(html);
        if(!end) {
            res.write(html);
            return;
        }
        res.end(html);
    });*/
});