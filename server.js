//=======Initializing Required Modules=======
var express = require('express');
var app = express(); //the instance of express
var router=require('./routes/routes'); //creating the router for incoming requests
var http = require('http').Server(app);
var morgan = require('morgan'); //for logging http requests and their details
var compression=require('compression'); //for compressing files before serving them
var ejsMate=require('ejs-mate'); //for layout support in ejs

//======Configuring the Server=======
var SERVER_SETTINGS=require('./config/server-config.js'); //custom server settings

//setting the port number for the server to use
app.set('port', process.env.PORT || SERVER_SETTINGS.serverPort);

//settings the views directory for the templating engine
app.set('views', __dirname + '/views');

// use ejs-locals for all ejs templates: 
app.engine('ejs', ejsMate);

//setting ejs as the templating engine
app.set('view engine', 'ejs');

//tells the server to serve html files through ejs
app.engine('html', require('ejs').renderFile);

//======Configuration of Middleware===========

if(SERVER_SETTINGS.logRequests){
  //Using morgan middle ware to log all requests and pipe them to winston
  app.use(require('morgan')('dev'));
}
//compresses all requests before sending them
app.use(compression());

//Setting the public folder to server lib content(images, javascript, stylesheets)
app.use(express.static(__dirname + "/public", {
  index:false, //disable directory indexing
  maxAge: SERVER_SETTINGS.userCacheTTL //how long to cache the content on client side (1 day)
}));

app.use("/", router);

// catch 404 and render 404 page
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(err.status);
  res.render('pages/404', {
    title: "Page Not Found",
    message: err.message,
    error: {}
  });
});

//Start the server and listen on the defined port
http.listen(app.get('port'), function() {
  console.log('WARG Web Server Started. Listening on Port: ' + SERVER_SETTINGS.serverPort);
});