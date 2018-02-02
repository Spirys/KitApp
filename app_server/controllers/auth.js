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
let response,
    login,
    password,
    remember;

/*
    Public function
 */

module.exports.login = async function (req, res) {

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

    let user = await getUser(login);
    sendData(user);
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
    }
    return response;
}

function sendData(data) {
    response.send(data);
}

async function verifyPassword(login) {
    if (login.password === password) {
        let session = randomSession();
        let response = await saveSession(session, login);
        if (response.code === config.okCode) {
            setCookie(remember, session);
        }
        return response;
    } else {
        return {code: config.errorCode, message: config.wrongPassword};
    }
}

async function saveSession(session, login) {
    let newSession = {
        user: login.user,
        _sessionId: session,
        expires: Date.now() + config.sessionExpires
    };
    try {
        let response = await Session.create(newSession);
        if (!response || typeof response === 'undefined' || response === null) {
            return {code: config.errorCode, message: config.invalidSession};
        } else {
            return {code: config.okCode, session};
        }
    } catch (err) {
        return {code: config.errorCode, message: err.toString()};
    }
}

async function getUser(login) {
    try {
        let user = await Login.findOne({login: login})
            .select('user password')
            .exec();

        if (!user || typeof user === 'undefined' || user === null) {
            // The user is absent in database
            return {code: config.errorCode, message: config.userNotRegistered};
        } else {
            let response = await verifyPassword(user);
            if (response.code === config.okCode) {
                return {code: config.okCode, user: user.id, session: response.session};
            } else {
                return response;
            }
        }
    } catch (err) {
        console.log(err);
        return {code: config.errorCode, message: JSON.stringify(err)};
    }
}

function setCookie(remember, session) {
    let cookie = {
        domain: '.kitapptatar.ru',
    };
    if (config.cookieHttpsOnly) cookie.secure = true;
    if (remember) {
        cookie.expires = new Date(Date.now() + config.sessionExpires);
    }
    response.cookie('_sessionId', session, cookie);
}

function randomSession() {
    return random(268435456, 4294967295).toString(16);
}

function random(low, high) {
    let a = Math.random() * (high - low) / 2 + low;
    let b = Math.random() * (high - low) / 2;
    return Math.floor(a + b);
}