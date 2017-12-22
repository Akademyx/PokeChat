const Message = require('../models/message-model');
const mongoose = require('mongoose');

let MessageController = {
	createMessage(req, res) {
		console.log('REQ BODY', req.body);
		Message.create({
      message: req.body.message,
			name: req.body.name,
			password: req.body.password,
			pokemon: req.body.pokemon,
			themeColor: req.body.themeColor,
		}, (err, savedDoc) => {
			if (err) {
				res.status(400).send('error');
			} else {
				res.json({
          message: req.body.message,
					name: req.body.name,
					password: req.body.password,
					pokemon: req.body.pokemon,
					themeColor: req.body.themeColor
				})
			}
		})
	},
	getAllMessages(req, res) {
    console.log('REQUEST TO GETALLMESSAGES', req.body);
		Message.find({}, function(err, messages) {
		  res.status(200);
		  res.setHeader('Content-type', 'application/json');
			res.end(JSON.stringify(messages));
			console.log(messages);
		});
	}
};




module.exports = MessageController;
