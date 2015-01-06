//express for modulus.io
var express = require('express');
var app = express();
var port     = process.env.PORT || 8000;

app.use(express.static(__dirname + '/client/'));

app.listen(port);
console.log('The magic happens on port ' + port);