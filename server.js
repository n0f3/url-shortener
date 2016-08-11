var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
  res.send('Hello');
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));