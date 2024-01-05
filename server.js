const express = require('express');
const path = require('path');
const cors = require('cors');
const User = require('./models/User');
const System = require('./models/System');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { requireAuth,  checkUser, _checkUser } = require('./authentication/auth');

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//----
//handle error
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errorsResponse = {username: '', password: ''};

  if (err.code === 11000) {
    errorsResponse.username = 'That username is already registered';
    return errorsResponse;
  }

  if (err.message.includes('incorrect username')) {
    errorsResponse.username = 'Incorrect username';
    return errorsResponse;
  }

  if (err.message.includes('incorrect password')) {
    errorsResponse.password = 'Incorrect password';
    return errorsResponse;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach( ({properties}) => {
      errorsResponse[properties.path] = properties.message;  
    });
  }

  return errorsResponse;
}
//

//JWT Token creation
const maxAge = 60 * 60; //1 hour
const createToken = (id) => {
  return jwt.sign({ id }, 'KURWA KURWA JA PIERDOLE', {
    expiresIn: maxAge
  }); //Create token with secret hash key
}

const dbURI = 'mongodb+srv://1avrutin:1avrutin@tiproject.euzxkzp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => console.log('DB Connect succesful'))
  .catch((err) => console.log(err));

app.get('*', checkUser);

// sendFile will go here
app.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname, 'index.html'));
  res.render('index');
});

app.get('/signin', function(req, res) {
  res.render('content', {toRender: 'sign-in'});
});

app.post('/signin', async function(req, res) {
  const {username, password} = req.body;

  try {
    const user = await User.signin(username, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id})
  }
  catch (err) {
    const errorsResponse = handleErrors(err);
    res.status(400).json(errorsResponse);
  }
}); 

app.get('/signup', function(req, res) {
  res.render('content', {toRender: 'sign-up'});
});

app.post('/signup', async function(req, res) {
  const {username, password} = req.body;
  console.log('signup POST request');
  console.log(req.body);
  
  try {
    const user = await User.create({username, password});
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id});
  }
  catch (err) {
    const errorsResponse = handleErrors(err);
    res.status(400).json(errorsResponse);
  }
});

app.get('/profile', /*requireAuth,*/ async function(req, res) {
  try {
    let user = await _checkUser(req);
    let userSystems = await System.find({userId: user._id});
    res.locals.userSystems = userSystems;
  }
  catch (err) {
    res.locals.userSystems = null;
    console.log(err.message);
  }
  
  res.render('content', {toRender: 'profile'});
});

app.get('/editor', function(req, res) {
  res.render('editor');
});

app.get('/logout', function(req, res) {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/signin');
});

app.post('/editor/savesystem', async function(req, res) {
  try {
    let system = req.body;
    let user = await _checkUser(req);
    if (user) {
      system.userId = user._id;
      await System.create(system);
      res.status(201).json({systemName: 'System saved!'});
    }
    else {
      throw new Error('JWT does not exist');
    }
  } 
  catch (err) {
    res.status(400).json({systemName: 'Could not save system'});
  }  
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
