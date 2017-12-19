'use strict'
const express = require('express');
const app = express();
const path = require('path');
const userController = require('./server-mongoose/controllers/user-controller');
const bodyParser = require('body-parser');

// app.use(express.static(path.join(__dirname, './../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve landing (serves login and signup components (idea: separate login and signup to different routes instead of conditionally rendering?))
app.get('/', (req,res) => {
	res.sendfile('./index.html');
})
app.get('/', (req,res) => {
  res.setHeader('content-type', 'text/html; charset=UTF-8');
  res.sendStatus(200);
})
// serve landing styles
app.get('/style.css', (req,res) => {
	res.sendfile('./style.css');
})
app.get('/style.css', (req,res) => {
  res.setHeader('content-type', 'text/html; charset=UTF-8');
  res.sendStatus(200);
})
// serve bundle
app.get('/build/bundle.js', (req,res) => {
	res.sendfile('./build/bundle.js');
})
app.get('/build/bundle.js', (req,res) => {
  res.setHeader('content-type', 'text/html; charset=UTF-8');
  res.sendStatus(200);
})
//serve chatRoom
// app.get('/chatRoom', (req,res) => {
//   res.sendFile('./components/chatRoom.jsx')
// })
// app.get('/chatRoom', (req,res) => {
//   res.setHeader('content-type', )
// })

// MIDDLEWARE
// check login credentials
app.post('/checkCredentials', userController.checkCredentials);
// add user 
app.post('/addUser', userController.createUser);

app.listen(9000);

module.exports = app;




// app.get('/messages', messageController.giveMessages);

// app.get('/messages', (req,res) => {
//     res.sendfile(messageController);
//     res.setHeader('content-type', 'text/html; charset=UTF-8');
//     res.sendStatus(200);
// })
