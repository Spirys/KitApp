'use strict';

// TODO Write the connection to the database
// TODO Generate session id and put it to the database
// TODO Write documentation and decouple logic from controller

const config = require("../config/config");

const Login = require("../models/auth/Login");
const Session = require("../models/auth/Session");
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

module.exports.verifySession = function (sessionId, next, onError) {
    // noinspection JSIgnoredPromiseFromCall
    Session.findOne({_sessionId: sessionId})
        .select('_sessionId user')
        .exec(function (err, session) {
            if (err) {
                console.log(err);
                onError();
            } else if (!session || typeof session === "undefined" || session === null) {
                onError();
            } else {
                Patron.findById(session.user, function (err, user) {
                    if (err) {
                        console.log(err);
                        onError();
                    } else {
                        return next({
                            code: config.okCode,
                            session: session._sessionId,
                            user: user
                        });
                    }
                });
            }
        });
};

/*
    Private functions
 */

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
        } else if (!session || typeof session === "undefined" || session === null) {
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
            } else if (!login || typeof login === "undefined" || login === null) {
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