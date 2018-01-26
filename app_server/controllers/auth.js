'use strict';

// TODO Write the connection to the database
// TODO Generate session id and put it to the database
// TODO Write documentation and decouple logic from controller

const mongoose = require("mongoose");
const config = require("../config/config");

const Login = mongoose.model("Login", require("../models/auth/Login"));
const Session = mongoose.model("Session", require("../models/auth/Session"));

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

/*
    Private functions
 */

function sendData(data) {
    response.send(data);
}

function verifyPassword(login) {
    if (login.password === password) {
        if (remember) {
            response.cookie('_sessionId', randomSession(), {
                domain: '.kitapptatar.ru',
                secure: config.cookieHttpsOnly,
                expires: new Date(Date.now() + 604800 * 1000)
            });
        }
        sendData({code: config.okCode, email: req.body.email, password: req.body.password});
    } else {
        sendData({code: JSON.stringify(login.code)});
        // res.send({code: config.wrongPassword})
    }
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

// noinspection JSUnusedLocalSymbols
function getSession(sessionId) {
    Session.findOne({ _sessionId: sessionId })
        .select('_sessionId userId')
        .exec(function (err, session) {
            if (err) {
                return {code: config.errorCode, error: err};
            }
            return {code: config.okCode, session: session._sessionId, userId: session.userId};
        });
}

function randomSession() {
    return random(268435456, 4294967295).toString(16);
}

function random(low, high) {
    let a = Math.random() * (high - low) / 2 + low;
    let b = Math.random() * (high - low) / 2;
    return Math.floor(a + b);
}