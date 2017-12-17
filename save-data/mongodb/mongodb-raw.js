const MongoClient = require('mongodb').MongoClient;


module.exports = function(data) {
  var insertDocuments = function(db, newData, callback) {
    // Get the documents collection
    var collection = db.collection('events');
    // Insert some documents
    collection.insertMany(newData, function(err, result) {
      console.log("Inserted events into the events collection");
      callback(result);
    });
  }

  let newData = [];
  let keys = Object.keys(data);
  for (let i = 0; i < keys.length; i ++) {
    let array = data[keys[i]];
    for (let j = 0; j < array.length; j++) {
      let event = array[j];
      newData.push({
        'id': event.id,
        'summary': event.summary,
        'htmlLink': event.htmlLink,
        'sequence': event.sequence,
        'created': new Date(event.created),
        'updated': new Date(event.updated),
        'start': new Date(event.start.dateTime),
        'end': new Date(event.end.dateTime)
      })
    }
  }

  MongoClient.connect('mongodb://localhost/mongodb-raw', (err, db) => {
    console.log('Connected with MongoDB Raw - mongodb-raw');

    insertDocuments(db, newData, function(results) {
      db.close();
    });
  });
};
