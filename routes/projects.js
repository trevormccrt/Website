//routes for all pages under /projects
var SERVER_SETTINGS = require('../config/server-config.js');
var express = require('express');

//setting up and configuring the router
var router = express.Router({
  caseSensitive: false, //so that /About/ and /about are the same
  strict: false //so that /about and /about/ are the same
});

router.get('/', function(req, res, next) {
  res.render('pages/projects', {
    title: "My Projects"
  });
});

router.get('/picpilot',function(req,res,next){
  res.render('pages/projects/picpilot',{
    title: 'PicPilot'
  })
});

router.get('/groundstation',function(req,res,next){
  res.render('pages/projects/groundstation',{
    title: 'Ground Station'
  })
});

module.exports=router;


