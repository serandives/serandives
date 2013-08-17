var user = require('user');
var express = require('express');
var app = module.exports = express();

app.use(express.bodyParser());

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/user/create', function (req, res) {
    user.create(req.body, function (err) {
        if (err) {
            console.log('user create error');
            res.send({
                error: true
            });
            return;
        }
        res.send({
            error: false
        });
    });
});

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/user/login', function (req, res) {
    user.authenticate(req.body, function (err) {
        if (err) {
            console.log('user login error');
            res.send({
                error: true
            });
            return;
        }
        res.send({
            error: false
        });
    });
});

/**
 * { "email": "ruchira@serandives.com" }
 */
app.post('/user/findone', function (req, res) {
    user.findOne(req.body, function (err, user) {
        if(err) {
            console.log('user find error');
            res.send({
                error:true
            });
            return;
        }
        res.send(user);
    });
});
