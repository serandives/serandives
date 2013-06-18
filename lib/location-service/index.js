var express = require('express');
var app = module.exports = express();

app.use(express.bodyParser());

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/apis/location/add', function (req, res) {
    var um = require('user').models;
    var user = um.User(req.body);
    user.save(function (err) {
        if (err) {
            console.log('signup error');
            res.send({
                error: true
            });
            return;
        }
        console.log('signup success');
        res.send({
            error: false
        });
    });
});

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/apis/location/update', function (req, res) {
    res.send({
        error: false
    });
});

/**
 * { "email": "ruchira@serandives.com" }
 */
app.post('/apis/location/get', function (req, res) {
    var User = require('user').models.User;
    User.find(req.body.email, function (err, user) {
        res.send(user.toJSON());
    });
});
