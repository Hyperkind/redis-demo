var express = require('express');
var redis = require('redis');
var path = require('path');

var app = express();
var router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.route('/info')
  .get(function (req, res) {
    res.render('get-info');
  })
  .post(function (req, res) {
    res.send('Thank you!');
  });

var server = app.listen(3000, function () {
  console.log('Server listening on port ' + server.address().port);
});