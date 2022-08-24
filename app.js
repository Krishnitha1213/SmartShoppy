var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require("http");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validateRouter = require("./routes/validateUserCredentials");
var productRouter = require("./routes/getProductDetails");
var checkUserValidation = require("./routes/checkIsUserLoggedin");
var logoutUser = require("./routes/logoutUser");
var newSignupRouter = require("./routes/newSignup");
var userAccountDetails = require("./routes/getUserAccountDetails");
var addNewProductRouter = require("./routes/addNewProduct");
var uploadproduct = require("./routes/uploadProductImage");

var app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

var session = require('express-session');

io.on("connection", (socket) => {
  console.log("There is a connecton happend");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var sessionData= { 
  secret: 'asdfasdfasfdasdf',
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionData));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log("__dirname");
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/validate/user/details",  validateRouter);
app.use("/get/details/product", productRouter);
app.use("/check/sessionSatus", checkUserValidation);
app.use("/logout/session", logoutUser);
app.use("/newuser/signup", newSignupRouter);
app.use("/get/userAccountDetails", userAccountDetails);
app.use("/add/newProduct", addNewProductRouter);
app.use("/upload/productImage", uploadproduct);

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});


server.listen(8081, () => {
  console.log("SErver is listing at 8081");
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
