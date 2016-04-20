var SERVER_SETTINGS = require('../config/server-config.js');
var express = require('express');
var bodyParser = require('body-parser').urlencoded({ //for parsing forms with no file uploads
  extended: false
});
var handleContact = require('./contact');
var handleSubscribe = require('./subscribe').handleSubscribe;
var handleUnsubscribe = require('./subscribe').handleUnsubscribe;
var unsubscribeMailingList = require('./subscribe').unsubscribeMailingList;
var projectsRouter=require('./projects.js');

//setting up and configuring the router
var router = express.Router({
  caseSensitive: false, //so that /About/ and /about are the same
  strict: false //so that /about and /about/ are the same
});

router.use('/projects', projectsRouter); //using a different router for requests made under '/projects'

router.get('/', function(req, res, next) {
  res.render('pages/homepage', {
    title: "Welcome"
  });
});

router.get('/about', function(req, res, next) {
  res.render('pages/aboutme', {
    title: "About Me"
  });
});

router.get('/sponsors', function(req, res, next) {
  res.render('pages/sponsors', {
    title: "Sponsors"
  });
});



router.get('/contact', function(req, res, next) {
  res.render('pages/contact', {
    title: "Contact Me",
    message: false
  });
});

router.post('/contact', bodyParser, handleContact);


router.param('type', function(req, res, next, type) {
  req.body={};
  if(type==="all"){
    req.body.mechanical=true;
    req.body.electrical=true;
    req.body.general=true;
    req.body.software=true;
    req.body.business=true;
  }
  else if (type==="mechanical"){
    req.body.mechanical=true;
  }
  else if (type==="electrical"){
    req.body.electrical=true;
  }
  else if (type==="software"){
    req.body.software=true;
  }
  else if (type==="general"){
    req.body.general=true;
  }
  else if (type==="business"){
    req.body.business=true;
  }
  next();
});

router.param('email', function(req, res, next, email) {
  if(!req.body){
    req.body={};
  }
  req.body.email = email;
  next();
});

//so that users can type in uwarg.com/unsubscribe/email@example.com and it would unsubscribe them
router.get('/unsubscribe/:type/:email', handleUnsubscribe);

router.get('/unsubscribe', function(req, res, next) {
  res.render('pages/unsubscribe', {
    title: 'Unsubscribe',
    message: false
  });
});

router.post('/unsubscribe', bodyParser, handleUnsubscribe);

module.exports = router;