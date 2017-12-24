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
		let propertyToUpdate = req.body.propertyToUpdate;
		let newPropertyValue = req.body.newPropertyValue;
		let id = req.body.id;		

		User.findById(id, function (err, user) {
			if (err) return handleError(err);
			// check for property type to update:
			if (propertyToUpdate === 'themeColor') user.set({themeColor: newPropertyValue});
			else if (propertyToUpdate === 'pokemon') user.set({pokemon: newPropertyValue});
			else if (propertyToUpdate === 'password')	user.set({password: newPropertyValue});
			// no 'else' yet. leave room for other possible updates on the user document	
			user.save(function (err, updatedUser) {
				if (err) return handleError(err);
				res.send(updatedUser);
			});
		});
	}
};

module.exports = UserController;
