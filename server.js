'use strict'
const express = require('express');
const app = express();
const path = require('path');
const userController = require('./server-mongoose/controllers/user-controller');
// const messageController = require('./messages/messageController');
// const authController = require('./utils/authController');
// const eventCtrl = require('./server-mongoose/controllers/event-controller');
const bodyParser = require('body-parser');

// app.use(express.static(path.join(__dirname, './../client')));

// place routes here

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.sendfile('./index.html');
})

app.get('/', (req,res) => {
    res.setHeader('content-type', 'text/html; charset=UTF-8');
    res.sendStatus(200);
})

app.get('/style.css', (req,res) => {
    res.sendfile('./style.css');
})

app.get('/style.css', (req,res) => {
    res.setHeader('content-type', 'text/html; charset=UTF-8');
    res.sendStatus(200);
})

app.get('/build/bundle.js', (req,res) => {
    res.sendfile('./build/bundle.js');
})

app.get('/build/bundle.js', (req,res) => {
    res.setHeader('content-type', 'text/html; charset=UTF-8');
    res.sendStatus(200);
})

app.post('/checkCredentials', userController.createUser);

// var jsonParser = bodyParser.json();

// app.get('/users', eventCtrl.index);    //route, middleware

// app.get('/user/:id', eventCtrl.show);

//MAKE POST EVENT TO DATABASE
// app.post('/postUser', eventCtrl.createUser);
///////

app.listen(9000);

module.exports = app;




// app.get('/messages', messageController.giveMessages);

// app.get('/messages', (req,res) => {
//     res.sendfile(messageController);
//     res.setHeader('content-type', 'text/html; charset=UTF-8');
//     res.sendStatus(200);
// })
