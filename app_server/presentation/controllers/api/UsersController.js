/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const responseComposer = require('../../composers/ResponseComposer').user;
const sendJson = require('../../composers/ResponseComposer').sendJson;
const error = require('../../composers/ResponseComposer').error;
const interactor = require('../../../domain/interactors/UsersInteractor');

const config = require('../../../util/config');
const defaultNumberOfUsers = config.DEFAULT_USERS_NUMBER;
const defaultFields = config.DEFAULT_USER_RESPONSE_FIELDS;

/**
 * Gets the locale from the request
 * @param req
 * @return {string}
 * @private
 */

function getLocale(req) {
    return req.cookies.locale || 'en';
}

/**
 * Module exports
 * @public
 */

module.exports.getAll = async function (req, res) {
    // Traversing request
    const page = req.query.page || 1;
    const length = req.query.length || defaultNumberOfUsers;
    const fields = (typeof req.query.fields === 'string')
        ? req.query.fields.split(',')
        : defaultFields;
    const locale = getLocale(req);

    // Getting the users
    const users = await interactor.getAll(page, length);

    let response = responseComposer.formatMultiple(users, true, fields, page, length, locale, users.err);

    sendJson(res, response);
};

// TODO
module.exports.search = async function (req, res) {

};

module.exports.new = async function (req, res) {
    let query = req.body;
    const fields = {
        first_name: query.first_name,
        last_name: query.last_name,
        type: query.type,
        email: query.email,
        address: query.address,
        birth_date: query.birth_date,
        occupation: query.occupation,
        about: query.about,
        telegram: query.telegram,
        avatar: query.avatar,
        phone: query.phone,
        password: query.password
    };
    const locale = getLocale(req);

    const user = await interactor.new(fields);

    let response = responseComposer.format(user, true, defaultFields, locale, user.err);
    sendJson(res, response);
};

module.exports.getById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);

    const user = await interactor.getById(id);

    let response = responseComposer.format(user, true, defaultFields, locale, user.err);
    sendJson(res, response);
};

module.exports.updateById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);
    const fields = req.body;

    const user = await interactor.updateById(id, fields);

    let response = responseComposer.format(user, true, defaultFields, locale, user.err);
    sendJson(res, response);

};

module.exports.deleteById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);

    const user = await interactor.deleteById(id);

    let response = responseComposer.format(user, true, defaultFields, locale, user.err);
    sendJson(res, response);
};