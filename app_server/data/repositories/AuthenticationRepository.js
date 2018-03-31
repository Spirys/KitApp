/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module exports
 * @public
 */

module.exports.read = getLogin;
module.exports.getLogin = getLogin;
module.exports.getSession = getSession;
module.exports.update = update;
module.exports.delete = removeLogin;
module.exports.remove = removeLogin;

/**
 * Module dependencies
 * @private
 */

const config = require('../../util/config');
const realm = require('../db').realm;

async function getLogin(login) {
    await check_init();

    return realm.objectForPrimaryKey('Login', login);
}

async function getSession(token) {
    await check_init();

    return realm.objectForPrimaryKey('Session', token);
}

/**
 * CRUD functions
 * @private
 */

async function login(login, password) {
    await check_init();
    let response = {};
    try {
        let _login = await getLogin(login);

        if (!_login) {
            // The user is absent in database
            response = {err: config.errors.WRONG_LOGIN_PASSWORD};
        } else {
            response = (_login.password === password)
                ? {user: _login.user}
                : {err: config.errors.WRONG_LOGIN_PASSWORD};
        }
    } catch (err) {
        console.error(err);
        response = {err: err.message};
    }
    return response;
}

async function logout(token) {
    await check_init();
    let response = {};

    try {
        let session = await getSession(token);

        if (!session) {
            response = {err: config.errors.INVALID_TOKEN};
        } else {
            realm.write(() => {
                realm.delete(session);
            });

            response = {code: 'ok'};
        }
    } catch (err) {
        console.log(err);
        response = {err: err.message};
    }
    return response;
}

async function verifyToken(token) {
    await check_init();
    let response = {};

    try {
        let session = await getSession(token);

        if (!session) {
            response = {
                err: config.errors.INVALID_TOKEN
            };
        } else {
            response = session.user;
        }
    } catch (err) {
        console.log(err);
        response = {err: err.message};
    }
    return response;
}

async function createLogin(login, password, user) {
    await check_init();
    let _login = await getLogin(login);

    if (!_login) {
        realm.write(() => {
            _login = realm.create('Login', {
                login: login,
                password: password,
                user: user
            });
        });
    }

    return {
        login: _login.login,
        password: _login.password
    };
}

function update() {

}

async function createSession(session, user) {
    await check_init();
    let newSession = {
        user: user,
        token: session,
        expires: new Date(Date.now() + config.COOKIE_EXPIRES)
    };

    try {
        let response;
        realm.write(() => {
            response = realm.create('Session', newSession);
        });

        if (!response) {
            return {err: config.errors.INTERNAL};
        } else {
            return {code: config.okCode, session};
        }
    } catch (err) {
        return {err: err.message};
    }
}

async function removeLogin(login) {
    await check_init();
    let _login = await getLogin(login);

    if (!_login) {
        return {err: config.errors.USER_NOT_FOUND};
    } else {
        realm.write(() => {
            realm.delete(_login);
        });

        return {code: 'ok'};
    }
}

module.exports.login = login;
module.exports.logout = logout;
module.exports.verifyToken = verifyToken;
module.exports.createSession = createSession;
module.exports.createLogin = createLogin;