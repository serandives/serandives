/**
 * Module dependencies.
 */

var build = require('build');
var express = require('express');
var cons = require('consolidate');
var app = module.exports = express();

// settings
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname);

// middleware
app.use(express.favicon(__dirname + '/images/favicon.ico'));

/**
 * GET index page.
 */
app.get('*', build, function (req, res) {
    res.render('index');
});

//accounts.serandives.com/apis/v/auth?response_type=code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos
