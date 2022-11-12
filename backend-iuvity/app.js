var createError = require('http-errors');
var express = require('express');
const { MongoClient } = require("mongodb");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');

const usersApiRouter = require('./routes/users.routes');

app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { config } = require("./config");
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_HOST = config.dbHost;
const DB_NAME = config.dbName;
const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${DB_HOST}/?authSource=${DB_NAME}&retryWrites=true&w=majority`; // prettier-ignore
const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require("./utils/errors/errorsHandlers");

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Conectado a MongoDB correctamente!');
  app.locals.db = client.db(DB_NAME)
  
  usersApiRouter(app);

  app.use('/', indexRouter);

  // error handlers
  app.use(logErrors);
  app.use(wrapErrors);
  app.use(errorHandler);

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



  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => console.log('fin')/*client.close()*/);






module.exports = app;
