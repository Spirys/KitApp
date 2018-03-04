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
 * Module exports
 * @public
 */

module.exports.login = async function (req, res) {
    let login = req.body.login;
    let password = req.body.password;
    let locale = config.getLocale(req);

    if (!login || !password) {
        responseComposer.error(config.errors.WRONG_LOGIN_PASSWORD, locale);
    }

    const response = await usersInteractor.login(login, password);
    res.json(responseComposer.format({user: response.user.id}, locale, response.error))
};

module.exports.logout = async function (req, res) {
    let session = req.body.token || req.cookies[config.COOKIE_NAME];
    let locale = config.getLocale(req);

    const response = await usersInteractor.logout(session);
    res.json(responseComposer.format({}, locale, response.error))
};