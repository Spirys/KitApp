'use strict';

/**
 * Module dependencies
 * @private
 */

const Realm = require('realm');
const realmSettings = require('../util/config').realm;

/*
    Schemas
 */

const User = require('../domain/models/users/User');
const Login = require('../domain/models/auth/Login');
const Session = require('../domain/models/auth/Session');

const Author = require('../domain/models/documents/Author');

const Book = require('../domain/models/documents/Book');
const Journal = require('../domain/models/documents/Journal');
const Article = require('../domain/models/documents/Article');
const Media = require('../domain/models/documents/Media');
const BookInstance = require('../domain/models/documents/DocumentInstances/BookInstance');
const JournalInstance = require('../domain/models/documents/DocumentInstances/JournalInstance');
const MediaInstance = require('../domain/models/documents/DocumentInstances/MediaInstance');

// Time manager
const moment = require('moment');

/**
 * Module functions
 * @private
 */

let realm;
let initialised = false;

async function init() {
    // for (let uId in Realm.Sync.User.all) {
    //     if (Realm.Sync.User.all.hasOwnProperty(uId)) {
    //         Realm.Sync.User.all[uId].logout();
    //     }
    // }
    //
    // // Realm.Sync.setFeatureToken(realmSettings.apiToken);
    // await Realm.Sync.User.login(`https://${realmSettings.url}`, realmSettings.user, realmSettings.password);

    realm = await Realm.open({
        sync: {
            url: `realms://${realmSettings.url}/~/users`,
            user: Realm.Sync.User.current
        },
        schema: [Author, User, Login, Session,
            Book, BookInstance,
            Journal, Article, JournalInstance,
            Media, MediaInstance],
        deleteRealmIfMigrationNeeded: true
    });

    console.log(moment().format('[\[]DD/MM/YYYY HH:mm:ss[\]] [Realm initialization completed]'));
}

if (!initialised) {
    init().then(() => initialised = true).catch(e => console.error(e));
}

/**
 * Prints the message to the log and executes callback
 * @param msg a message to be logged
 * @param callback a function to be executed
 */
const smoothShutdown = function (msg, callback) {
    if (realm) realm.close();
    console.log(moment().format(`[\[]DD/MM/YYYY HH:mm:ss[\]] [Shutting down. Reason: ${msg}]`));
    callback();
};

/**
 * On app termination
 */
process.on('SIGINT', function () {
    smoothShutdown('app terminated', function () {
        process.exit(0);
    });
});

/**
 * On app shutdown
 */
process.on('SIGTERM', function () {
    smoothShutdown('app shutdown', function () {
        process.exit(0);
    });
});

/**
 * On nodemon restart
 */
process.once('SIGUSR2', function () {
    smoothShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    })
});

/**
 * Module exports
 * @public
 */

module.exports.url = realmSettings.url;
module.exports.realm = realm;