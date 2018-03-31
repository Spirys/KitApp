/*!
 * Application
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./app_server/presentation/routes/index');
const users = require('./app_server/presentation/routes/users');
const api = require('./app_server/presentation/routes/api');

const app = express();

/**
 * View engine setup
 * @private
 */

app.set('views', path.join(__dirname, 'app_server', 'presentation', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(async function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    // TODO Write custom errors
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render('errors/404', {code: 404, message: err.message})
    } else {
        res.render('errors/error');
    }
});

/**
 * Module exports
 * @public
 */

module.exports = app;