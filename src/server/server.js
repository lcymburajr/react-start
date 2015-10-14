var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('dist'));
app.use('/dist', express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen('8080');

console.log('http://localhost:8080');