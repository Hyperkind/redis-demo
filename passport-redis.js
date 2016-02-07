var express = require('express');
var redis = require('redis');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local');

var CONFIG = require('./config');

var app = express();
var router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 1) Body parser so we can see their info
app.use(bodyParser.urlencoded({ extended: false }));
// 2) Sessions
app.use(session(CONFIG.SESSION));
// 3) Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(
  function (username, done) {
    if (!username) {
      return done(null, false);
    }
    return done(null, username);
  })
);

// serialize user
passport.serializeUser(function (user, done) {
  return done(null, user);
});
// deserialize user
passport.deserializeUser(function (user, done) {
  return done(null, user);
});

app.route('/info')
  .get(function (req, res) {
    res.render('get-info');
  })
  .post(function (req, res) {
    res.send('Thank you!');
  });

var server = app.listen(CONFIG.PORT, function () {
  console.log('Server listening on port ' + server.address().port);
});