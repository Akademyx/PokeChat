const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/mongodb-orm');

const chatRoomSchema = new Schema({
  roomName: String,
  owner: String,
  authorizedUsers: [{ name: String, date: Date }],
  messages: [{ name: String, date: Date }]
});

const User = mongoose.model('User', userSchema); //One document. Naming the columns for it. 

module.exports = User;
