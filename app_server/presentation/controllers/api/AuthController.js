/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const responseComposer = require('../../composers/ResponseComposer').auth;
const usersInteractor = require('../../../domain/interactors/UsersInteractor');
const config = require('../../../util/config');

/**
 * Module functions
 * @private
 */

function setCookie(remember, session, response) {
    let cookie = {
        domain: '.kitapptatar.ru',
    };
    if (config.COOKIE_HTTPS_ONLY) cookie.secure = true;
    if (remember) {
        cookie.expires = new Date(Date.now() + config.COOKIE_EXPIRES);
    }
    response.cookie(config.COOKIE_NAME, session, cookie);
}

function randomSession() {
    return random(268435456, 4294967295).toString(16);
}

function random(low, high) {
    let a = Math.random() * (high - low) / 2 + low;
    let b = Math.random() * (high - low) / 2;
    return Math.floor(a + b);
}

/**
 * Module exports
 * @public
 */

module.exports.login = async function (req, res) {
    let login = req.body.login;
    let password = req.body.password;
    let remember = req.body.remember;
    let locale = config.getLocale(req);

    if (!login || !password) {
        responseComposer.error(config.errors.WRONG_LOGIN_PASSWORD, locale);
    }

    const response = await usersInteractor.login(login, password);

    if (response.err) {
        res.json(responseComposer.error(response.err, locale));
        return
    }

    let session = randomSession();
    await usersInteractor.createSession(session, response.user);

    setCookie(remember, session, res);

    res.json(responseComposer.format({user: response.user.id}, locale, response.err))
};

module.exports.logout = async function (req, res) {
    let session = req.body.token || req.cookies[config.COOKIE_NAME];
    let locale = config.getLocale(req);

    const response = await usersInteractor.logout(session);
    res.json(responseComposer.format({}, locale, response.error))
};