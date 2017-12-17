const User = require('../models/event-model');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
//functionality for interacting with the database. 
//controller is middleware

//interacts with the database:
let EventController = {
  createUser(req, res) {
    console.log(req, res)
    User.create({id: req.body.id,
      name: req.body.name,
      buyPoint: req.body.buyPoint,
      stopLoss: req.body.stopLoss}, (err, savedDoc) => {
        if(err) {
          res.status(400).send('error');
        } else {
          res.json({id: req.body.id,
            name: req.body.name,
            buyPoint: req.body.buyPoint,
            stopLoss: req.body.stopLoss})
        }
    })
  },
  index (req, res) {
    User.findOne({name: req.body.name}, function(err,result){
      if(err) {
        res.status(400).send(err);
      } 
      console.log('RESYLT', result);
      res.send(result);
    })
    // User.find({}, function(err, users) {
    //   res.status(200);
    //   res.setHeader('Content-type', 'application/json');
    //   res.end(JSON.stringify(users));
    // });
  }

};



// function show(req, res) {
//   User.findOne(req.params, function(err, user) {
//    if (!user) {
//      res.status(404);
//      res.setHeader('Content-type', 'application/json');
//      res.end();
//    }
//    else {
//      res.status(200);
//      res.setHeader('Content-type', 'application/json');
//      res.end(JSON.stringify(user));
//    }
//   });
// }  

// function create(req, res) {

//     const newUser = new User(req.body); //create instance
//     console.log('REQ BODY', req.body);
    //ajax request
    // User.create(id: req.body.id,
    //   name: req.body.name,
    //   buyPoint: req.body.buyPoint,
    //   stopLoss: req.body.stopLoss, (err, savedDoc) => {
    //     if(err) {
    //       res.status(400).send('error');
    //     } else {
    //       res.json({id: req.body.id,
    //         name: req.body.name,
    //         buyPoint: req.body.buyPoint,
    //         stopLoss: req.body.stopLoss})
    //     }
    // })
//     newUser.save(function(err, user){
//     if (err) return console.log(err);
//     res.status(200);
//     res.setHeader('Content-type', 'application/json');
//     res.end(JSON.stringify(user));  
//   })
// }
//   // console.group(req);
//   // User.save(function(err, req){
//   //   if (err) return console.error(err);
//   //   return req;
//   // })


//   // var scrapedData = xhr.responseText;
//   // let clg = JSON.parse(scrapedData);
//   // // console.log('TYPE', typeof clg);
//   // this.setState({data: clg});
//   // // console.log(this.state.data);


module.exports = EventController;
