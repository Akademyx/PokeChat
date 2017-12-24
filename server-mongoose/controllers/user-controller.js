const User = require('../models/user-model');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

let UserController = {
	createUser(req, res) {
		console.log('REQ BODY', req.body);
		User.create({
			name: req.body.name,
			password: req.body.password,
			pokemon: req.body.pokemon,
			themeColor: req.body.themeColor
		}, (err, savedDoc) => {
			if (err) {
				res.status(400).send('error');
			} else {
				res.json({
					name: req.body.name,
					password: req.body.password,
					pokemon: req.body.pokemon,
					themeColor: req.body.themeColor
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
	},
	getAllUsers(req, res) {
		User.find({}, function(err, users) {
		  res.status(200);
		  res.setHeader('Content-type', 'application/json');
			res.end(JSON.stringify(users));
			console.log(users);
		});
	},
	updateUser(req, res) {
		// console.log('UPDATE THEME REQ.PARAMS', req.params);
		console.log('REQUEST', req);

		let id = req.body.ID;
		let newThemeColor = req.body.newThemeColor;


		User.findById(id, function (err, user) {
			if (err) return handleError(err);
			
			// console.log('UPDATE THEME REQ.BODY', req.params);
			// let propertyToUpdate = req.body.propertyToUpdate;
			// let newValue = req.body.newValue;

			// user.set({ size: 'large' });
			user.set({ themeColor: newThemeColor });

			user.save(function (err, updatedUser) {
				if (err) return handleError(err);
				res.send(updatedUser);
			});
		});
	}
};





module.exports = UserController;
