'use strict';

// const mongoose = require('mongoose');
const dbUri = require('../util/config').mongoURI;

const Realm = require('realm');
const realmSettings = require('../util/config').realm;

let inited = false;

async function init() {
    for (let uId in Realm.Sync.User.all) {
        if (Realm.Sync.User.all.hasOwnProperty(uId)) {
            Realm.Sync.User.all[uId].logout();
        }
    }

    // Realm.Sync.setFeatureToken(realmSettings.apiToken);
    await Realm.Sync.User.login(`https://${realmSettings.url}`, realmSettings.user, realmSettings.password);
    console.log();
}

if (!inited) {
    init();
    inited = true;
}

// module.exports = () => {
//     return new Realm.Sync.User.login(realmSettings.url, realmSettings.user, realmSettings.password);
// };
module.exports.url = realmSettings.url;

// mongoose.connect(dbUri);
// mongoose.Promise = global.Promise;

// mongoose.connection.on('connected', function () {
//     console.log('Mongoose connected to ' + dbUri);
// });

// mongoose.connection.on('disconnected', function () {
//     console.log('Mongoose disconnected from ' + dbUri);
// });

// mongoose.connection.on('error', function (err) {
//     console.log('Mongoose connection failed due to the following reason: ' + err);
// });

/**
 * Prints the message to the log and executes callback
 * @param msg a message to be logged
 * @param callback a function to be executed
 */
// const smoothShutdown = function (msg, callback) {
//     mongoose.connection.close(function () {
//         console.log('Mongoose disconnected due to the following reason: ' + msg);
//         callback();
//     });
// };

/**
 * On app termination
 */
// process.on('SIGINT', function () {
//     smoothShutdown('app terminated', function () {
//         process.exit(0);
//     });
// });

/**
 * On app shutdown
 */
// process.on('SIGTERM', function () {
//     smoothShutdown('app shutdown', function () {
//         process.exit(0);
//     });
// });

/**
 * On nodemon restart
 */
// process.once('SIGUSR2', function () {
//     smoothShutdown('nodemon restart', function () {
//         process.kill(process.pid, 'SIGUSR2');
//     })
// });