'use strict';

// TODO Write the connection to the database
// TODO Generate session id and put it to the database
// TODO Write documentation and decouple logic from controller

const config = require('../config/config');

const Login = require('../models/auth/Login');
const Session = require('../models/auth/Session');
const Patron = require('../models/users/Patron');
const Librarian = require('../models/users/Librarian');

/*
    Private fields
 */
let response;
let login;
let password;
let remember;

/*
    Public function
 */

module.exports.login = function (req, res) {

    response = res;
    login = req.body.email;
    password = req.body.password;
    remember = req.body.remember;

    if (!(login)) {
        sendData({code: config.errorCode, message: config.noLoginProvided});
        return;
    }
    if (!(password)) {
        sendData({code: config.errorCode, message: config.noPassProvided});
        return;
    }

    getUser(login);
};

module.exports.verifySession = async function (sessionId) {
    if (!sessionId || sessionId === null || sessionId === "") {
        return {message: config.invalidSession};
    } else {
        return await verifySession(sessionId)
    }
};

/**
 * Token verification is equal to session verification
 */
module.exports.verifyToken = async function (token) {
    if (!token || token === null || token === "") {
        return {code: config.errorCode, message: config.invalidToken};
    } else {
        return await verifySession(token);
    }
};

/*
    Private functions
 */
async function verifySession(sessionId) {

    let response = {};

    try {
        let session = await Session.findOne({_sessionId: sessionId})
            .select('_sessionId user')
            .exec();

        if (!session || typeof session === 'undefined' || session === null) {

        } else {
            let patron = await Patron.findById(session.user);
            response = {
                code: config.okCode,
                session: session._sessionId,
                user: patron
            };
        }
    } catch (err) {
        console.log(err);
        response = {code: config.errorCode, message: err}
    } finally {
        return response;
    }
}

function sendData(data) {
    response.send(data);
}

function verifyPassword(login) {
    if (login.password === password) {
        let session = randomSession();
        saveSession(session, login);
        setCookie(remember, session);
    } else {
        sendData({code: config.wrongPassword});
    }
}

function saveSession(session, login) {
    let newSession = {
        user: login.user,
        _sessionId: session,
        expires: Date.now() + config.sessionExpires
    };
    Session.create(newSession, function (err, session) {
        if (err) {
            return {code: config.errorCode, message: err};
        } else if (!session || typeof session === 'undefined' || session === null) {
            return {code: config.errorCode, message: config.invalidSession};
        } else {
            sendData({code: config.okCode, user: login.user, email: login.login});
        }
    });
}

function getUser(login) {
    // noinspection JSIgnoredPromiseFromCall
    Login.findOne({login: login})
        .select('userId password')
        .exec(function (err, login) {
            if (err) {
                sendData({error: true, code: config.errorCode});
            } else if (!login || typeof login === 'undefined' || login === null) {
                // The user is absent in database
                sendData({error: true, code: config.userNotRegistered});
            } else {
                verifyPassword(login);
            }
        });
}

function setCookie(remember, session) {
    let cookie = {
        domain: '.kitapptatar.ru',
        secure: config.cookieHttpsOnly,
    };
    if (remember) {
        cookie.expires = new Date(Date.now() + config.sessionExpires);
    }
    response.cookie('_sessionId', session, cookie);
    return session;
}

function randomSession() {
    return random(268435456, 4294967295).toString(16);
}

function random(low, high) {
    let a = Math.random() * (high - low) / 2 + low;
    let b = Math.random() * (high - low) / 2;
    return Math.floor(a + b);
}