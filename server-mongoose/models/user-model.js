const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/mongodb-orm');
mongoose.connect('mongodb://pokechat:pokechat@ds159926.mlab.com:59926/pokechat');
mongoose.connection.once('open', () => {
  console.log('Connected with PokeChat server');
});

const userSchema = new Schema({
  name: String,
  password: String
});

const User = mongoose.model('User', userSchema); //One document. Naming the columns for it. 

module.exports = User;
