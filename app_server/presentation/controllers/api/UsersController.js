/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const ResponseComposer = require('../../composers/ResponseComposer').user;
const BookResponseComposer = require('../../composers/ResponseComposer').book;
const sendJson = require('../../composers/ResponseComposer').sendJson;
const error = require('../../composers/ResponseComposer').error;
const interactor = require('../../../domain/interactors/UsersInteractor');

const config = require('../../../util/config');
const val = require('../../../domain/validation/InputValidation');
const defaultNumberOfUsers = config.DEFAULT_USERS_NUMBER;
const defaultFields = config.DEFAULT_USER_RESPONSE_FIELDS;

/**
 * Gets the locale from the request
 * @param req
 * @return {string}
 * @private
 */

function getLocale(req) {
    return req.cookies.locale || req.body.locale || 'en';
}

/**
 * Traversing the request
 * @param req
 * @param res
 * @param needLibrarianAccess {boolean=} Is librarian access needed?
 * @return {*}
 */

function traverseRequest(req, res, needLibrarianAccess) {
    // Traversing request
    const locale = getLocale(req),
        token = req.body.token || req.query.token;

    const response = {locale};

    // Checking whether the session is correct
    let user = interactor.verifyToken(token);
    if (user.err) {
        sendJson(res, error(user.err, locale));
        return false
    }

    // Checking the permissions
    if (needLibrarianAccess && user.type !== config.userTypes.LIBRARIAN) {
        sendJson(res, error(config.errors.NO_ACCESS, locale));
        return false
    } else response.user = user;

    return response
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

    let response = ResponseComposer.formatMultiple(users, true, fields, page, length, locale, users.err);

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

    let response = ResponseComposer.format(user, true, defaultFields, locale, user.err);
    sendJson(res, response);
};

module.exports.getById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);

    const user = await interactor.getById(id);

    let response = ResponseComposer.format(user, true, defaultFields, locale, user.err);
    sendJson(res, response);
};

module.exports.updateById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);
    const fields = req.body;

    const user = await interactor.updateById(id, fields);

    let response = ResponseComposer.format(user, true, defaultFields, locale, user.err);
    sendJson(res, response);

};

module.exports.deleteById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);

    const user = await interactor.deleteById(id);

    let response = ResponseComposer.format(user, true, defaultFields, locale, user.err);
    sendJson(res, response);
};

/**
 * Books of the user
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.myBooks = async function (req, res) {
    const r = traverseRequest(req, res);
    if (!r) return;

    let books = interactor.booksOfUser(r.user, 1, 25);

    let response = BookResponseComposer.formatMultiple(books,
        r.user.type === config.userTypes.LIBRARIAN,
        null,
        1, books.length,
        r.locale,
        books.err,
        r.user);
    sendJson(res, response)
};