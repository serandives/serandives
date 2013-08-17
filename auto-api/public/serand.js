$(function () {
    $.get('tmpl1.dust', function (data) {
        //console.log(data);
        //var compiled = dust.compile(data, 'tmpl1');
        //console.log(compiled);
        var context = {
            "type": function (chunk) {
                return chunk.map(function (chunk) {
                    setTimeout(function () {
                        chunk.end("Async-type");
                    }, 4000);
                });
            },
            "category": function (chunk) {
                return chunk.map(function (chunk) {
                    setTimeout(function () {
                        chunk.end("Async-category");
                    }, 2000);
                });
            },
            "name": function (chunk) {
                return chunk.write("Bob");
            }
        };
        //dust.loadSource(compiled);
        dust.compileFn(data, 'tmpl1');
        /*dust.render("tmpl1", context, function(err, out) {
         console.log(out);
         });*/
        var t1 = new Date().getTime();
        dust.stream("tmpl1", context)
            .on("data", function (data) {
                console.log(data);
            })
            .on("end", function () {
                console.log("I'm finished! " + (new Date().getTime() - t1));
            })
            .on("error", function (err) {
                console.log("Something terrible happened!");
            });
        console.log('Started......');
    });
});