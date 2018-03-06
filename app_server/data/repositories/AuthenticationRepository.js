/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module exports
 * @public
 */

module.exports.read = get;
module.exports.get = get;
module.exports.update = update;
module.exports.delete = remove;
module.exports.remove = remove;

/**
 * Module dependencies
 * @private
 */

const LoginDB = require('../models/auth/Login');
const SessionDB = require('../models/auth/Session');
const usersRepository = require('./UsersRepository.js');
const userConverter = require('../converters/model_to_class/user/PatronModelToClass');
const config = require('../../util/config');

/**
 * CRUD functions
 * @private
 */

async function login(login, password) {
    let response = {};
    try {
        let user = await LoginDB.findOne({login})
            .select('user password')
            .populate('user')
            .exec();

        if (!user) {
            // The user is absent in database
            response = {err: config.errors.WRONG_LOGIN_PASSWORD};
        } else {
            response = (user.password === password)
                ? {user: userConverter(user.user)}
                : {err: config.errors.WRONG_LOGIN_PASSWORD}
        }
    } catch (err) {
        console.error(err);
        response = {err: err.message}
    }
    return response;
}

function logout(token) {
    return {id: 1, err: null}
}

async function verifyToken(token) {
    let response = {};

    try {
        let session = await SessionDB.findOne({token: token})
            .select('token user')
            .populate('user')
            .exec();

        if (!session) {
            response = {
                err: config.errors.INVALID_TOKEN
            }
        } else {
            response = userConverter(session.user);
        }
    } catch (err) {
        console.log(err);
        response = {err: err.message}
    }
    return response;
}

function get() {

}

function update() {

}

async function createSession(session, user) {
    let newSession = {
        user: user.innerId,
        token: session,
        expires: Date.now() + config.COOKIE_EXPIRES
    };

    try {
        let response = await SessionDB.create(newSession);
        if (!response) {
            return {err: config.errors.INTERNAL};
        } else {
            return {code: config.okCode, session};
        }
    } catch (err) {
        return {err: err.toString()};
    }
}

function remove() {

}

module.exports.login = login;
module.exports.logout = logout;
module.exports.verifyToken = verifyToken;
module.exports.createSession = createSession;