var createError = require('http-errors');
var express = require('express');
var http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");


// db connection
const url = 'mongodb+srv://test:Dq86aViXtIps9L8v@cluster0.knqht.mongodb.net/Tasksdb?retryWrites=true&w=majority';
mongoose.connect(url,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true})
  .then(result => {
    console.log("Connection established");
  })
  .catch(err => console.log(err));


// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const limiter = rateLimit({
  max: 5,
  windowMs: 30 * 60 * 1000, // 30 mins       60 * 60 * 24 * 30 // per month
  message: "Too many request from this IP"
}); 
app.use(limiter);

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/', usersRouter);

app.get('/', (req, res) => {
  res.status(200).json({
      status: "success",
      message: "Hello from the express server",
      headers: true
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;