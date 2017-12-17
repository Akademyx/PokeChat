'use strict';

const request = require('request');
// const API_URL = 'http://slack-server.elasticbeanstalk.com/calendar/17';

let migrate;
const dbname = process.argv[2];
if (dbname === 'mongodb-raw') {
  migrate = require('./mongodb/mongodb-raw');
}

if (dbname === 'mongodb-orm') {
  migrate = require('./mongodb/mongodb-orm');
}

if (dbname === 'postgresql-raw') {
  migrate = require('./postgresql/postgresql-raw');
}

if (dbname === 'postgresql-orm') {
  migrate = require('./postgresql/postgresql-orm');
}


request(API_URL, (err, resp) => {
  let data = JSON.parse(resp.body);
  migrate(data);
});
