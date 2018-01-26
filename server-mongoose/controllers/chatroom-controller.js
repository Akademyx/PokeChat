const ChatRoom = require('../models/message-model');
const mongoose = require('mongoose');

let ChatRoomController = {
	createChatRoom(req, res) {
		console.log('REQ BODY', req.body);
		ChatRoom.create({
      roomName: req.body.roomName,
      owner: req.body.owner,
      image: req.body.image,
      authorizedUsers: req.body.authorizedUsers,
      messages: req.body.messages
		}, (err, savedDoc) => {
			if (err) {
				res.status(400).send('error');
			} else {
				res.json({
          roomName: req.body.roomName,
          owner: req.body.owner,
          image: req.body.image,
          authorizedUsers: req.body.authorizedUsers,
          messages: req.body.messages
				})
			}
		})
	},
	getAllChatrooms(req, res) {
    console.log('REQUEST TO GETALLCHATROOMS', req.body);
		ChatRoom.find({}, function(err, messages) {
		  res.status(200);
		  res.setHeader('Content-type', 'application/json');
			res.end(JSON.stringify(messages));
			console.log(messages);
		});
	}
};




module.exports = ChatRoomController;
