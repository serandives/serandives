var http = require('http'),
    util = require('util'),
    knox = require('knox'),
    path = require('path'),
    uuid = require('node-uuid'),
    MultiPartUpload = require('knox-mpu'),
    formidable = require('formidable'),
    StringDecoder = require('string_decoder').StringDecoder,
    server;

var s3Client = knox.createClient({
    secure: false,
    key: '',
    secret: '',
    bucket: 'auto.serandives.com'
});

server = http.createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end('<html>' +
            '<body>' +
            '<form action="/upload" method="POST" enctype="multipart/form-data">' +
            '<input type="text" name="title1" value="serandives1"><br>' +
            '<input type="text" name="title2" value="serandives2"><br>' +
            '<input type="file" name="thumb1"/>' +
            '<input type="file" name="thumb2"/>' +
            '<input type="submit" name="save" value="Submit"/>' +
            '</form>' +
            '</body>' +
            '</html>');
    } else if (req.url == '/upload') {
        var form = new formidable.IncomingForm();
        form.onPart = function (part) {
            var self = this;
            if (part.filename === undefined) {
                var value = '',
                    decoder = new StringDecoder(this.encoding);

                part.on('data', function (buffer) {
                    self._fieldsSize += buffer.length;
                    if (self._fieldsSize > self.maxFieldsSize) {
                        self._error(new Error('maxFieldsSize exceeded, received ' + self._fieldsSize + ' bytes of field data'));
                        return;
                    }
                    value += decoder.write(buffer);
                });

                part.on('end', function () {
                    self.emit('field', part.name, value);
                });
                return;
            }
            self.emit('file', part);
            /*console.log('part begining');
             console.log(part);
             part.on('data', function (buffer) {
             //console.log(buffer);
             console.log('part data');
             });

             part.on('end', function () {
             console.log('part end');
             });*/
        };
        form.on('progress', function (rec, exp) {
            console.log('received >>> ' + rec);
            console.log('expected >>> ' + exp);
        });
        form.on('field', function (name, value) {
            console.log(name + ' ' + value);
        });
        form.on('file', function (part) {
            console.log(part);
            var upload = new MultiPartUpload({
                    client: s3Client,
                    objectName: uuid.v4() + path.extname(part.filename), // Amazon S3 object name
                    headers: {
                        'Content-Type': part.headers['content-type'],
                        'x-amz-acl': 'public-read'
                    },
                    stream: part
                },
                function (err, body) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(body);
                }
            );
            upload.on('initiated', function () {
                console.log('mpu initiated');
            });
            upload.on('uploading', function () {
                console.log('mpu uploading');
            });
            upload.on('uploaded', function () {
                console.log('mpu uploaded');
            });
            upload.on('error', function () {
                console.log('mpu error');
            });
            upload.on('completed', function () {
                console.log('mpu complete');
            });
        });
        form.on('error', function (err) {
            console.log(err);
        });
        form.on('aborted', function () {
            console.log('request was aborted');
        });
        form.on('end', function () {
            res.end('200');
        });
        form.parse(req);
    } else {
        res.writeHead(404, {'content-type': 'text/plain'});
        res.end('404');
    }
});
server.listen(8000);

console.log('listening on http://localhost:' + 8000 + '/');