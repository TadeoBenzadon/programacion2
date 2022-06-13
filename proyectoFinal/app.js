var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./database/models'); 
let session = require('express-session'); 
const users = db.User; 

app.use(session({
	secret: 'userDb', 
	resave: false,
	saveUninitialized: true
}))
app.use(function(res, req, next){
res.locals.user = req.session.user
return next()
})

app.use(function(res, req, next){
if(req.session.user == undefined && req.cookies.userId !== undefined){
	let idDeLaCookie = req.cookies.userId; 
db.User.findByPk(idDeLaCookie)
.then(function(user){
	req.session.user = user
	res.locals.user = user	
	return next()
})
.catch(error => console.log(error))
}
return next()
})


var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var usuariosRouter = require('./routes/usuarios');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'productDb',
  resave:false,
  saveUnitialized: true
}))

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/usuarios', usuariosRouter);



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
