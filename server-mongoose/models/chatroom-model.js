const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/mongodb-orm');

const chatRoomSchema = new Schema({
  roomName: String,
  owner: String,
  image: String,
  authorizedUsers: [{ name: String, date: Date }],
  messages: [{ name: String, date: Date }]
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema); //One document. Naming the columns for it. 

module.exports = ChatRoom;
