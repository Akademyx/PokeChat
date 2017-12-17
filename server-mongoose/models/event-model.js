const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/mongodb-orm');

const userSchema = new Schema({
  id: String,
  name: String,
  buyPoint: String,
  stopLoss: String
});

const User = mongoose.model('User', userSchema); //One document. Naming the columns for it. 

module.exports = User;
