var formidable = require('formidable');
var IncomingForm = formidable.IncomingForm;
var StringDecoder = require('string_decoder').StringDecoder;

IncomingForm.prototype.onPart = function (part) {
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
};

module.exports = formidable;