const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('/home/glib/Developing/canvas-tutorial/static/styles'));
app.use(express.static('/home/glib/Developing/canvas-tutorial/static/scripts'));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join('/home/glib/Developing/canvas-tutorial', '/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);