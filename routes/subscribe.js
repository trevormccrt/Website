//handles the subscriptions and unsubscriptions for mailman
var SERVER_SETTINGS = require('../config/server-config.js');
var request = require('request');
var analytics= require('universal-analytics');
var visitor=analytics(SERVER_SETTINGS.google_analytics_id);

var subscribeGeneral = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/subscribe/warg').form({
    email: email
  });
  visitor.event("Mailing List", "subscribe","general").send();
};
var subscribeMechanical = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/subscribe/warg-mechanical').form({
    email: email
  });
  visitor.event("Mailing List", "subscribe","mechanical").send();
};
var subscribeElectrical = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/subscribe/warg-electrical').form({
    email: email
  });
  visitor.event("Mailing List", "subscribe","electrical").send();
};
var subscribeSoftware = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/subscribe/warg-software').form({
    email: email
  });
  visitor.event("Mailing List", "subscribe","software").send()
};
//TODO: Actually make this mailing list
var subscribeBusiness = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/subscribe/warg-business').form({
    email: email
  });
  visitor.event("Mailing List", "subscribe","business").send();
};

var unsubscribeGeneral = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/options/warg/'+email).form({
    "login-unsub": "Unsubscribe"
  });
  visitor.event("Mailing List", "unsubscribe","general").send();
};

var unsubscribeMechanical = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/options/warg-mechanical/'+email).form({
    "login-unsub": "Unsubscribe"
  });
  visitor.event("Mailing List", "unsubscribe","mechanical").send();
};
var unsubscribeElectrical = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/options/warg-electrical/'+email).form({
    "login-unsub": "Unsubscribe"
  });
  visitor.event("Mailing List", "unsubscribe","electrical").send();
};
var unsubscribeSoftware = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/options/warg-software/'+email).form({
    "login-unsub": "Unsubscribe"
  });
  visitor.event("Mailing List", "unsubscribe","software").send();
};
//TODO: Actually make this mailing list
var unsubscribeBusiness = function(email) {
  request.post('https://lists.uwaterloo.ca/mailman/options/warg-business/'+email).form({
    "login-unsub": "Unsubscribe"
  });
  visitor.event("Mailing List", "unsubscribe","business").send();
};

var handleSubscribe = function(req, res, next) { //called with a post request to /subscribe
  if (req.body && req.body.email) {
    subscribeGeneral(req.body.email);
    if (req.body.mechanical) {
      subscribeMechanical(req.body.email);
    }
    if (req.body.electrical) {
      subscribeElectrical(req.body.email);
    }
    if (req.body.software) {
      subscribeSoftware(req.body.email);
    }
    //TODO: Make the business mailing list
    // if(req.body.business){
    // 	subscribeBusiness(req.body.email);
    // }
    res.render('pages/subscribe', {
      title: "Subscribe",
      message: {
        type: 'success',
        content: "Great! Please confirm your subscription by checking your email"
      }
    });
  } else {
    res.render('pages/subscribe', {
      title: "Subscribe",
      message: {
        type: 'error',
        content: "Subscription unsucessful. Make sure you fill out your email correctly."
      }
    });
  }
};

var handleUnsubscribe = function(req, res, next) { //called with a post request to /unsubscribe
  if (req.body && req.body.email) {
    if(req.body.general){
      unsubscribeGeneral(req.body.email);
    }
    if (req.body.mechanical) {
      unsubscribeMechanical(req.body.email);
    }
    if (req.body.electrical) {
      unsubscribeElectrical(req.body.email);
    }
    if (req.body.software) {
      unsubscribeSoftware(req.body.email);
    }
    // if (req.body.business) {
    //     unsubscribeBusiness(req.body.email);
    // }
    res.render('pages/unsubscribe', {
      title: "Unsubscribe",
      message: {
        type: "info",
        content: "Check your email to complete the unsubscribe process"
      }
    });

  } else {
    res.render('pages/unsubscribe', {
      title: "Unsubscribe",
      message: {
        type: "error",
        content: "Unsubscribe unsuccessful. Please make sure your email is correct"
      }
    });
  }
};

module.exports.handleSubscribe = handleSubscribe;
module.exports.handleUnsubscribe = handleUnsubscribe;