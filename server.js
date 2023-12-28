const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(cors());
app.use(bodyParser.json());

// sendFile will go here
app.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname, 'index.html'));
  res.render('index', {signIn : true});
});

app.get('/signin', function(req, res) {
  // res.sendFile(path.join(__dirname, 'index.html'));
  res.render('sign-up');
});

app.get('/profile', function(req, res) {
  res.render('profile');
})

app.get('/editor', function(req, res) {
  res.render('editor');
})

app.listen(port);
console.log('Server started at http://localhost:' + port);