/*!
 * Controller for the book requests.
 * Copyright (c) 2018 KitApp project
 * Author: Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const responseComposer = require('../../composers/ResponseComposer').book;
const sendJson = require('../../composers/ResponseComposer').sendJson;
const error = require('../../composers/ResponseComposer').error;

const interactor = require('../../../domain/interactors/BooksInteractor');
const usersInteractor = require('../../../domain/interactors/UsersInteractor');

const val = require('../../../domain/validation/InputValidation');
const perm = require('../../../domain/permissions/Permissions');

const config = require('../../../util/config');
const defaultNumberOfBooks = config.DEFAULT_DOCS_NUMBER;
const defaultFields = config.DEFAULT_BOOK_RESPONSE_FIELDS;

/**
 * Module functions
 * @private
 */

/**
 * Gets the locale from the request
 * @param req
 * @return {string}
 * @private
 */

function getLocale(req) {
    return req.cookies.locale || req.body.locale || 'en'
}

/**
 * Traversing the request
 * @param req
 * @param res
 * @param needBookId {boolean=} Is book id needed?
 * @param action {Action} What action is to be performed?
 * @return {*}
 */

function traverseRequest(req, res, needBookId, action) {
    // Traversing request
    const bookId = val.number(req.params.id),
        locale = getLocale(req),
        token = req.body.token || req.query.token;

    const response = {locale};

    // Checking whether the session is correct
    let user = usersInteractor.verifyToken(token);
    if (user.err) {
        sendJson(res, error(user.err, locale));
        return false
    }

    // Checking the permissions
    if (action && !perm.hasAccess(user, action)) {
        sendJson(res, error(config.errors.NO_ACCESS, locale));
        return false
    } else response.user = user;

    // Checking whether the id is valid (if needed)
    if (needBookId && !bookId) {
        sendJson(res, error(config.errors.INVALID_ID, locale));
        return false
    } else response.bookId = bookId;

    return response
}

/**
 * Module exports
 * @public
 */

module.exports.getAll = async function (req, res) {

    const r = traverseRequest(req, res, false, perm.SEE_DOCUMENT);
    if (!r) return;

    // Traversing request
    const page = val.numberOrDefault(req.query.page, 1, true);
    const length = val.numberOrDefault(req.query.length, defaultNumberOfBooks, true);
    const fields = (typeof req.query.fields === 'string')
        ? req.query.fields.split(',')
        : defaultFields;

    // Getting the books
    const books = interactor.getAll(page, length);

    let response = responseComposer.formatMultiple(
        books,
        perm.hasAccess(r.user, perm.SEE_DOCUMENT_EXT),
        fields,
        page, length,
        r.locale,
        books.err,
        r.user);

    sendJson(res, response);
};

module.exports.search = async function (req, res) {
    const r = traverseRequest(req, res, false, perm.SEE_DOCUMENT);
    if (!r) return;

    // Traversing request
    let {length, page, fields, ...query} = req.query;
    length = val.numberOrDefault(length, 1, true);
    page = val.numberOrDefault(page, defaultNumberOfBooks, true);
    fields = (typeof fields === 'string')
        ? fields.split(',')
        : defaultFields;

    let books = interactor.search(query, page, length);

    let response = responseComposer.formatMultiple(
        books,
        perm.hasAccess(r.user, perm.SEE_DOCUMENT_EXT),
        fields,
        page, length,
        r.locale,
        books.err,
        r.user);

    sendJson(res, response);
};

module.exports.new = async function (req, res) {
    const r = traverseRequest(req, res, false, perm.ADD_DOCUMENT);
    if (!r) return;

    const book = interactor.new(req.body);

    let response = responseComposer.format(book,
        true,
        defaultFields,
        r.locale,
        book.err);

    if (book.new === true)
        response.notification = config.messages(r.locale)[config.success.DOCUMENT_CREATED]
    else if (book.new === false)
        response.notification = config.messages(r.locale)[config.success.DOCUMENT_UPDATED];

    sendJson(res, response);
};

module.exports.getById = async function (req, res) {
    const r = traverseRequest(req, res, true, perm.SEE_DOCUMENT);
    if (!r) return;

    const book = interactor.getById(r.bookId);

    let response = responseComposer.format(book,
        r.user.type === config.userTypes.LIBRARIAN,
        defaultFields,
        r.locale,
        book.err,
        r.user);
    sendJson(res, response);
};

module.exports.updateById = async function (req, res) {
    const r = traverseRequest(req, res, true, perm.MODIFY_DOCUMENT);
    if (!r) return;

    const fields = req.body;
    const book = interactor.updateById(r.bookId, fields);

    let response = responseComposer.format(book, true, defaultFields, r.locale, book.err);
    sendJson(res, response);
};

module.exports.deleteById = async function (req, res) {
    const r = traverseRequest(req, res, true, perm.DELETE_DOCUMENT);
    if (!r) return;

    const book = interactor.deleteById(r.bookId);

    let response = responseComposer.format(book, true, defaultFields, r.locale, book.err);
    sendJson(res, response);
};

/**
 * An interface for checking out or reserving a book
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.checkoutById = async function (req, res) {
    const r = traverseRequest(req, res, true, perm.RESERVE_DOCUMENT);
    if (!r) return;

    const userId = val.number(req.body.user);

    let user = r.user;
    const isLibrarian = user.type === config.userTypes.LIBRARIAN;

    let book;
    if (isLibrarian && userId) {
        user = usersInteractor.getById(userId);
        if (user.err) {
            sendJson(res, error(user.err, r.locale));
            return;
        }

        // Checking out the book
        book = interactor.checkoutById(r.bookId, user);
    } else {
        // Reserving the book
        book = interactor.reserveById(r.bookId, user);
    }

    if (book.err) {
        sendJson(res, error(book.err, r.locale));
        return;
    }

    let response = responseComposer.format(book, isLibrarian, defaultFields);
    sendJson(res, response);
};

/**
 * Marks the book with given id as returned by user
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.returnById = async function (req, res) {
    const r = traverseRequest(req, res, true, perm.RETURN_DOCUMENT);
    if (!r) return;

    const book = interactor.returnById(r.bookId, val.number(req.body.user) || r.user.id);
    if (book.err) {
        sendJson(res, error(book.err, r.locale));
        return;
    }

    let response = responseComposer.format(book, true, defaultFields);
    sendJson(res, response);
};

/**
 * Handles the book renewal
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.renewById = async function (req, res) {
    const r = traverseRequest(req, res, true, perm.RENEW_DOCUMENT);
    if (!r) return;
    let user = r.user;

    const userId = val.number(req.body.user),
        isLibrarian = user.type === config.userTypes.LIBRARIAN;

    // Selecting the user
    if (isLibrarian && userId) {
        user = usersInteractor.getById(userId);
        if (user.err) {
            sendJson(res, error(user.err, r.locale));
            return;
        }
    }

    // Renewing the book
    let book = interactor.renewById(r.bookId, user);
    if (book.err) {
        sendJson(res, error(book.err, r.locale));
        return;
    }

    let response = responseComposer.format(book, isLibrarian, defaultFields);
    sendJson(res, response);
};

/**
 * Handles the outstanding request
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.outstandingRequest = async function (req, res) {
    const r = traverseRequest(req, res, true, perm.PLACE_OUTSTANDING);
    if (!r) return;

    // Posting request
    let book = interactor.outstandingRequest(r.bookId, true);
    if (book.err) {
        sendJson(res, error(book.err, r.locale));
        return
    }

    let response = responseComposer.format(book, true, defaultFields);
    sendJson(res, response);
};

/**
 * Cancels the outstanding request
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.cancelOutstandingRequest = async function (req, res) {
    const r = traverseRequest(req, res, true, perm.CANCEL_OUTSTANDING);
    if (!r) return;

    // Cancelling request
    let book = interactor.outstandingRequest(r.bookId, false);
    if (book.err) {
        sendJson(res, error(book.err, r.locale));
        return
    }

    let response = responseComposer.format(book, true, defaultFields);
    sendJson(res, response);
};

/**
 * Gets all instances of the book
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.getAllInstances = async function (req, res) {

};

module.exports.newInstance = async function (req, res) {

};

module.exports.getInstanceById = async function (req, res) {

};

module.exports.updateInstanceById = async function (req, res) {

};

module.exports.deleteInstanceById = async function (req, res) {

};