
var Hydra = require('hydra');

module.exports = Hydra.module.register("single", function () {
    return {
        sModule: 'BaseSample',
        init: function () {
            alert("Single Module started");
        }
    };
});