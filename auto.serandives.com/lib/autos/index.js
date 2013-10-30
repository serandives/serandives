var express = require('express');
var app = module.exports = express();
var http = require('http');

app.use(express.bodyParser());

var data = [
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    },
    {
        "title": "Honda Hybrid 2012",
        "price": {
            "amount": "4000000",
            "currency": "LKR"
        },
        "make": {
            "brand": "Honda",
            "year": "2012"
        },
        "engine": {
            "capacity": "1400",
            "powerb": "petrol"
        }
    }
];

for (var i = 0; i < 10; i++) {
    app.get('/apis/v' + i, function (req, res) {
        var t1 = new Date().getTime();
        http.get('http://www.amazon.com/',function (response) {
            var data = '';
            console.log("Got response: " + res.statusCode);

            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', function () {
                console.log('================================' + (new Date().getTime() - t1)/1000);
                console.log('B4 - ' + new Date().getTime());
                res.send(data);
                console.log('After - ' + new Date().getTime());
            });
        }).on('error', function (e) {
                console.log("Got error: " + e.message);
            });
    });

}