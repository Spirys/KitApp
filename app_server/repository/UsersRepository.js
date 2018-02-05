'use strict';
const beautifier = require('../util/beautifier');
const config = require('../config/config');
const Librarian = require('../models/users/Librarian');
const Patron = require('../models/users/Patron');
const Login = require('../models/auth/Login');

async function getUserById(id) {
    let response = {};
    try {
        let patron = await Patron.findById(id);
        if (patron && patron !== null) {
            response = {
                code: config.okCode,
                user: beautifier.composeUser(patron)
            };
        } else {
            let librarian = await Librarian.findById(id);
            if (librarian && librarian !== null) {
                response = {
                    code: config.okCode,
                    user: beautifier.composeUser(librarian)
                };
            } else {
                response = {
                    code: config.errorCode,
                    message: config.userNotRegistered
                };
            }
        }
    } catch (err) {
        console.log(err);
        response = {code: config.errorCode, message: err}
    }
    return response;
}

async function getUserByLogin(login) {
    let response = {};
    try {
        let user = await Login.findOne({login: login}).exec();

        if (!user || typeof user === 'undefined' || user === null) {
            // The user is absent in database
            response = {code: config.errorCode, message: config.userNotRegistered};
        } else {
            response = await getUserById(user.user);
        }
    } catch (err) {
        console.log(err);
        response = {code: config.errorCode, message: JSON.stringify(err)};
    }
    return response;
}

async function verifyPassword(login, password) {
    let response = {};
    try {
        let user = await Login.findOne({login}).select('user password').exec();
        if (!user || typeof user === 'undefined' || user === null) {
            // The user is absent in database
            response = {code: config.errorCode, message: config.userNotRegistered};
        } else {
            response = (user.password === password)
                ? {code: config.okCode, equal: true}
                : {code: config.okCode, equal: false}
        }
    } catch (err) {
        console.error(err);
        response = {code: config.errorCode, message: err}
    }
    return response;
}

module.exports.getUserById = getUserById;
module.exports.getUserByLogin = getUserByLogin;
module.exports.verifyPassword = verifyPassword;