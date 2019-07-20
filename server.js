
const path        = require('path');
const express     = require('express');

const hostname    = '127.0.0.1';
const port        = process.env.PORT || 3000;

const { Client }  = require('pg');

const client      = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

var app = express();
var http = require('http').createServer(app);

app.use('/css', express.static(path.join(__dirname + '/css')));
app.use('/img', express.static(path.join(__dirname + '/img')));
app.use('/js', express.static(path.join(__dirname + '/js')));
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')));
app.use('/scss', express.static(path.join(__dirname + '/scss')));
app.use('/vendor', express.static(path.join(__dirname + '/vendor')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/thanks', function(req, res) {
  res.sendFile(path.join(__dirname + '/thanks.html'));
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/projects', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/team', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/events', function(req, res) {
  res.sendFile(path.join(__dirname + '/events.html'));
});

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.post('/', function(request, response) {
  console.log("Got email: " + request.body.email);
  var query = `INSERT INTO public.mail(email) VALUES ('${request.body.email}');`
  console.log(query);
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    };
    client.end();
  });

  response.redirect('/thanks');
});

http.listen(port, function() {
  console.log(`Listening on ${port}.`);
})
