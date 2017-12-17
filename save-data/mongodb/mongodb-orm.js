const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/mongodb-orm');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

// place Schemas here
var userSchema = new Schema({
  id: String,
  name: String,
  buyPoint: Number,
  stopLoss: Number
});

var User = mongoose.model('User', userSchema);

module.exports = function(data) {
  let keys = Object.keys(data);
  for (let i = 0; i < keys.length; i ++) {
    let array = data[keys[i]];
    for (let j = 0; j < array.length; j++) {
      let user = array[j];

      let userRecord = new User({
        'id': user.id,
        'name': user.name,
        'buyPoint': user.buyPoint,
        'stopLoss': user.stopLoss
      });
      
      record.save(function (err, record) {
        if (err) return console.error(err);
        return record;
      });
    }
  }
  
};
