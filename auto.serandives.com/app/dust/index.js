module.exports = function (helpers) {
    var dust = require('./dust');
    var render = dust.render;
    var stream = dust.stream;
    var compileFn = dust.compileFn;
    helpers = helpers || {};

    dust.render = function () {
        var args = Array.prototype.slice.call(arguments);
        var base = dust.makeBase(helpers);
        args[1] = base.push(args[1]);
        return render.apply(dust, args);
    };

    dust.steam = function () {
        var args = Array.prototype.slice.call(arguments);
        var base = dust.makeBase(helpers);
        args[1] = base.push(args[1]);
        return stream.apply(dust, args);
    };

    dust.compileFn = function () {
        var fn = compileFn.apply(dust, Array.prototype.slice.call(arguments));
        return function (context, f) {
            var base = dust.makeBase(helpers);
            context = base.push(context);
            return fn(context, f);
        };
    };

    return dust;
};