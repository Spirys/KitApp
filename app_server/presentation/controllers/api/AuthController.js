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

/**
 * Module exports
 * @public
 */

module.exports.login = async function (req, res) {
    const response = await usersInteractor.login(req.body.login, req.body.password);
    res.json(responseComposer.format({user: response.user}, req.cookies.locale, response.error))
};

module.exports.logout = async function (req, res) {

};