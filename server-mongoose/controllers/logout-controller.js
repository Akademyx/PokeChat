const express = require('express');
const app = express();

let logoutController = {
  redirectToLanding (req,res) {
    res.render('/');
  }
}

module.exports = logoutController;