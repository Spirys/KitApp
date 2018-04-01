'use strict';

/**
 * Module dependencies
 * @private
 */

const Realm = require('realm');
const config = require('../util/config');
const logger = require('../util/Logger');
const realmSettings = config.realm;
const moment = require('moment');

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
        // sync: {
        //     url: `realms://${realmSettings.url}/~/kitapp`,
        //     user: Realm.Sync.User.current
        // },
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
function smoothShutdown(msg, callback) {
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

    // wipe();
    //
    // await createUser('librarian@kitapptatar.ru',
    //     '5f4dcc3b5aa765d61d8327deb882cf99',
    //     'Tony',
    //     'Stark',
    //     'Librarian',
    //     'i_am_librarian');
    //
    // await createUser('test@kitapptatar.ru',
    //     '5f4dcc3b5aa765d61d8327deb882cf99',
    //     'John',
    //     'Snow',
    //     'Student',
    //     'j_snow');
};

/**
 * Miscellaneous functions
 * @private
 */

function wipe() {
    let sessions = realm.objects('Session');
    let logins = realm.objects('Login');
    let users = realm.objects('User');

    realm.write(() => {
        for (let session of sessions) {
            realm.delete(session)
        }
        for (let login of logins) {
            realm.delete(login)
        }
        for (let user of users) {
            realm.delete(user)
        }

        logger.info('Wipe complete')
    });
}

async function createUser(login, password, first_name, last_name, type, telegram) {
    const UserRepo = require('./RepositoryProvider').UsersRepository;

    await UserRepo.create({
        first_name,
        last_name,
        type,

        birth_date: '01-01-2018',
        email: login,
        phone: '1234567890',
        occupation: 'Nah, occupation',
        about: 'About me, blah blah blah',
        telegram,
        address: 'Some address',

        password // '5f4dcc3b5aa765d61d8327deb882cf99'
    });

    logger.info('User was created');
}