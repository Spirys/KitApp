'use strict';

const mongoose = require('mongoose');
const dbUri = require('../util/config').mongoURI;

mongoose.connect(dbUri);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', function () {
   console.log('Mongoose connected to ' + dbUri)
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected from ' + dbUri)
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection failed due to the following reason: ' + err)
});

/**
 * Prints the message to the log and executes callback
 * @param msg a message to be logged
 * @param callback a function to be executed
 */
const smoothShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected due to the following reason: ' + msg);
        callback();
    })
};

/**
 * On app termination
 */
process.on('SIGINT', function () {
    smoothShutdown('app terminated', function () {
        process.exit(0);
    })
});

/**
 * On app shutdown
 */
process.on('SIGTERM', function () {
    smoothShutdown('app shutdown', function () {
        process.exit(0);
    })
});

/**
 * On nodemon restart
 */
process.once('SIGUSR2', function () {
    smoothShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    })
});