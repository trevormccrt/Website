//routes for all pages under /projects
var SERVER_SETTINGS = require('../config/server-config.js');
var express = require('express');

//setting up and configuring the router
var router = express.Router({
  caseSensitive: false, //so that /About/ and /about are the same
  strict: false //so that /about and /about/ are the same
});

router.get('/', function(req, res, next) {
  res.render('pages/employers', {
    title: "My Previous Employers"
  });
});

module.exports=router;


