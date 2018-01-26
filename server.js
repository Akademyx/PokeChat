'use strict'
const express = require('express');
const app = express();
const path = require('path');
const userController = require('./server-mongoose/controllers/user-controller');
const messageController = require('./server-mongoose/controllers/message-controller');
const chatRoomController = require('./server-mongoose/controllers/chatroom-controller');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve landing (shows login component)
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
// chatRoom refresh redirects to landing (login)
app.get('/chatroom', (req,res) => {
  res.redirect('/');
})

// MIDDLEWARE
// user
app.post('/checkCredentials', userController.checkCredentials);
app.post('/addUser', userController.createUser);
app.post('/updateUser', userController.updateUser);
            // app.get('/getUsers', userController.getAllUsers);
// messages
app.post('/addMessage', messageController.createMessage);
app.get('/getMessages', messageController.getAllMessages);
app.get('/checkForUpdates', messageController.getAllMessages);
// chatRoom
app.get('/getAllChatRooms', chatRoomController.getAllChatRooms);
app.post('/createChatRoom', chatRoomController.createChatRoom);

// catch all
app.get('/*', (req,res) => {
  res.sendfile('./index.html');
})
app.get('/*', (req,res) => {
  res.setHeader('content-type', 'text/html; charset=UTF-8');
  res.sendStatus(200);
})

app.listen(9000);

module.exports = app;

