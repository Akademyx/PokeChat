'use strict'
const express = require('express');
const app = express();
const path = require('path');
const userController = require('./server-mongoose/controllers/user-controller');
const messageController = require('./server-mongoose/controllers/message-controller');
const bodyParser = require('body-parser');

// app.use(express.static(path.join(__dirname, './../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve landing (login)
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


// MIDDLEWARE
app.post('/checkCredentials', userController.checkCredentials);
app.post('/addUser', userController.createUser);
app.get('/getUsers', userController.getAllUsers);
app.post('/addMessage', messageController.createMessage);
app.get('/getMessages', messageController.getAllMessages);
app.get('/checkForUpdates', messageController.getAllMessages);
// console.log('MESSAGE CONTROLLER', messageController.getAllMessages);
// app.post('/redirectOnLogin', (req,res) => {
//   res.redirect('/chatroom');
// })

app.listen(9000);

module.exports = app;




// app.get('/messages', messageController.giveMessages);

// app.get('/messages', (req,res) => {
//     res.sendfile(messageController);
//     res.setHeader('content-type', 'text/html; charset=UTF-8');
//     res.sendStatus(200);
// })


//serve chatRoom
// app.get('/chatRoom', (req,res) => {
//   res.sendFile('./components/chatRoom.jsx')
// })
// app.get('/chatRoom', (req,res) => {
//   res.setHeader('content-type', )
// })