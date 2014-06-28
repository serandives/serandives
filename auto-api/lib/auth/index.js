var Token = require('token');

module.exports = function (options) {
    return function (req, res, next) {
        var path = req.path;
        var open = options.open;
        var i, length;
        if (open) {
            length = open.length;
            for (i = 0; i < length; i++) {
                if (new RegExp(open[i], 'i').test(path)) {
                    return next();
                }
            }
        }
        var auth = req.headers['authorization'];
        if (!auth) {
            res.send(401, {
                error: 'missing authorization header'
            });
            return;
        }
        var match = /^\s*Bearer\s+(.*)$/g.exec(auth);
        if (!match) {
            res.send(401, {
                error: 'invalid authorization header'
            });
            return;
        }
        var token = match[1];
        //TODO: validate auth header
        Token.findOne({
            _id: token
        })
            .exec(function (err, token) {
                if (err) {
                    res.send(500, {
                        error: err
                    });
                    return;
                }
                if (!token) {
                    res.send(401, {
                        error: 'invalid token'
                    });
                    return;
                }
                res.token = token;
                next();
            });
    };
};