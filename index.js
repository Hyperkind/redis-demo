var redis = require('redis');

// connect to redis (default configurations 127.0.0.1:6379)
var client = redis.createClient();

client.on('ready', function () {
  console.log('Ready to go!');
});

client.on('connect', function () {
  runExample();
});

client.on('error', function (err) {
  console.log(err);
});

client.on('end', function () {
  console.log('Good bye Redis');
  client.end();
});

function runExample () {
  client.set('name', 'Jon');
  client.get('secret', function (err, secret) {
    if (err) {
      return;
    }
    console.log('The secret is...', secret);
  });
}