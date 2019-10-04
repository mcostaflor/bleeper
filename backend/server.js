var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var auth = require('./auth')();

var app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ credentials: true }));
app.use(auth.initialize());

app.use('/api/usuario', require('./routes/usuarios'));
app.use('/api/bleep', require('./routes/bleep'));

var http = require('http');
var port = process.env.PORT || '80';

var server = http.createServer(app);

server.listen(port, (error) => {
  if (error) {
    throw error;
  } else {
    console.log("Running on port :80");
    console.log("Connecting to MongoDB...");
    mongoose.connect('mongodb+srv://kinazen:123456az@cluster0-skw4p.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (error) => {
      if (error) {
        throw error;
      } else {
        console.log("Connected.");
      }
    });

  }
});
