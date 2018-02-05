'use strict';

// TODO Write the connection to the database
// TODO Generate session id and put it to the database
// TODO Write documentation and decouple logic from controller

const config = require('../config/config');
const Session = require('../models/auth/Session');
const UserRepository = require('../repository/UsersRepository');


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

    // Set global-scope private variables for convenience
    response = res;
    login = req.body.email;
    password = req.body.password;
    remember = req.body.remember;

    // Verify fields
    if (!login) {
        sendData({code: config.errorCode, message: config.noLoginProvided});
        return;
    }
    if (!password) {
        sendData({code: config.errorCode, message: config.noPassProvided});
        return;
    }

    // Verify the password of the user
    if (!!await verifyPassword(login, password)) {
        let session = randomSession();
        let user = await getUser(login);
        let response = await saveSession(session, user.user._id);
        if (response.code === config.okCode) {
            // Everything is OK
            setCookie(remember, session);
            sendData(user);
        } else {
            sendData(response);
        }
    } else {
        sendData({code: config.errorCode, message: config.wrongPassword});
    }
};

/**
 * Verifies the session. Checks the input, then looks it up on the database.
 * @param session The ID of the session
 * @return {Promise<{
 *      code: config.okCode | config.errorCode | config.permissionDeniedCode | string,
 *      [message]: messages.invalidSession | string
 *  }>}
 */
module.exports.verifySession = async function (session) {
    if (!session) {
        return {code: config.permissionDeniedCode, message: config.invalidSession};
    } else {
        return await verifySession(session)
    }
};

/**
 * Verifies the token. Checks the input, then looks it up on the database.
 * @param token The token
 * @return {Promise<{
 *      code: config.okCode | config.errorCode | config.permissionDeniedCode | string,
 *      [message]: messages.invalidToken | string
 *  }>}
 */
module.exports.verifyToken = async function (token) {
    if (!token) {
        return {code: config.permissionDeniedCode, message: config.invalidToken};
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

        if (!session) {
            response = {
                code: config.permissionDeniedCode,
                message: config.invalidSession
            }
        } else {
            response = {code: config.okCode, session: session};
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

async function verifyPassword(login, password) {
    let result = await UserRepository.verifyPassword(login, password);
    return result
        ? result.code === config.okCode
            ? result.equal
            : false
        : false;
}

async function saveSession(session, userId) {
    console.log(session);
    console.log(userId);
    let newSession = {
        user: userId,
        _sessionId: session,
        expires: Date.now() + config.sessionExpires
    };

    try {
        let response = await Session.create(newSession);
        if (!response) {
            return {code: config.errorCode, message: config.errorCode};
        } else {
            return {code: config.okCode, session};
        }
    } catch (err) {
        return {code: config.errorCode, message: err.toString()};
    }
}

async function getUser(login) {
    return await UserRepository.getUserByLogin(login);
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