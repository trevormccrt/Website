var nodemailer = require('nodemailer');
var SERVER_SETTINGS=require('../config/server-config.js');

if(!SERVER_SETTINGS.emailSenderPassword){
  var error="Email Account Password Not SET!! Edit your EMAIL_PASSWORD environment variable";
  throw error;
}

var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: SERVER_SETTINGS.emailSender,
    pass: SERVER_SETTINGS.emailSenderPassword
  }
});


module.exports=transporter;