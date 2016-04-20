//this files deals with what happens when the user clicks the submit button in the contact form
var SERVER_SETTINGS = require('../config/server-config');
var email = require('../utils/mailer');

var handleContact = function(req, res, next) {
  if (req.body && req.body.name && req.body.email && req.body.message) {
    //the user has filled everything out
    var message = "Someone contacted you from the contact form at www.uwarg.com/contact";
    message += "\nName: " + req.body.name;
    message += "\nEmail: " + req.body.email;
    message += "\nMessage: \n" + req.body.message;
    var mailOptions = {
      from: SERVER_SETTINGS.emailSender, // sender address
      to: SERVER_SETTINGS.emailReceiver, // list of receivers
      subject: 'Contact From UWARG.COM', // Subject line
      text: message // plain text body
    };
    // send mail with defined transport object
    email.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        res.render("pages/contact", {
          title: "Contact us",
          message: {
            type: "error",
            content: "Looks like we're having some server issues. Try emailing us at uw.warg@gmail.com instead."
          }
        });
      } else {
        console.log('Message sent: ' + info.response);
        res.render("pages/contact", {
          title: "Contact us",
          message: {
            type: "success",
            content: "Great! Thanks for contacting us. We'll get back to you as soon as we can."
          }
        });
      }
    });
  } else {
    res.render("pages/contact", {
      title: "Contact us",
      message: {
        type: "error",
        content: "Oops, something went wrong. Please make sure you've filled everything out correctly and try again."
      }
    });
  }
};
module.exports = handleContact;