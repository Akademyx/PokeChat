const User = require('../models/user-model');
const mongoose = require('mongoose');

let UserController = {
	createUser(req, res) {
		console.log(req, res)
		User.create({
			name: req.body.name,
			password: req.body.password
		}, (err, savedDoc) => {
			if (err) {
				res.status(400).send('error');
			} else {
				res.json({
					name: req.body.name,
					password: req.body.password
				})
			}
		})
	},
	checkCredentials(req, res) {
		User.findOne({ name: req.body.name, password: req.body.password }, function (err, result) {
			if (err) {
				res.status(400).send(err);
			} 
			res.send(result);
		})
		// User.find({}, function(err, users) {
		//   res.status(200);
		//   res.setHeader('Content-type', 'application/json');
		//   res.end(JSON.stringify(users));
		// });
	},
};





module.exports = UserController;
