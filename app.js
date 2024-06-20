var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

var indexRouter = require('./routes/index');

var app = express();
const helmet = require('helmet');
app.use(helmet());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
const passportConfig = require('./config')
passport.use(new GitHubStrategy(passportConfig,
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}
));
passport.serializeUser((user, cb)=>{
  cb(null,user);
})
passport.deserializeUser((user,cb)=>{
  cb(null,user)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
