'use strict';

/**
 * Module dependencies
 * @private
 */

const Realm = require('realm');
const realmSettings = require('../util/config').realm;
const logger = require('../util/Logger');

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

/**
 * Module functions
 * @private
 */

let realm;

async function init() {
    for (let uId in Realm.Sync.User.all) {
        if (Realm.Sync.User.all.hasOwnProperty(uId)) {
            Realm.Sync.User.all[uId].logout();
        }
    }

    // Realm.Sync.setFeatureToken(realmSettings.apiToken);
    await Realm.Sync.User.login(`https://${realmSettings.url}`, realmSettings.user, realmSettings.password);

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

    logger.info('Realm initialization completed');
}

/**
 * Prints the message to the log and executes callback
 * @param msg a message to be logged
 * @param callback a function to be executed
 */
function smoothShutdown (msg, callback) {
    if (realm) realm.close();
    logger.info(`Shutting down. Reason: ${msg}`);
    callback();
}

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

module.exports.init = async function () {
    await init();
    module.exports.realm = realm;
};