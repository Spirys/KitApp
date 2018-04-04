/*
 * Controller for the book requests.
 * Copyright (c) 2018 Marsel Shaihin
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
 * @param needLibrarianAccess {boolean=} Is librarian access needed?
 * @return {*}
 */

function traverseRequest(req, res, needBookId, needLibrarianAccess) {
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
    if (needLibrarianAccess && user.type !== config.userTypes.LIBRARIAN) {
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

    // Traversing request
    const page = val.numberOrDefault(req.query.page, 1);
    const length = val.numberOrDefault(req.query.length, defaultNumberOfBooks);
    const fields = (typeof req.query.fields === 'string')
        ? req.query.fields.split(',')
        : defaultFields;
    const locale = getLocale(req);

    // Getting the books
    const books = interactor.getAll(page, length);

    let response = responseComposer.formatMultiple(books, true, fields, page, length, locale, books.err);

    sendJson(res, response);
};

// TODO
module.exports.search = async function (req, res) {

};

module.exports.new = async function (req, res) {
    const r = traverseRequest(req, res, false, true);
    if (!r) return;

    let query = req.body;

    // Todo: write validation
    const fields = {
        title: query.title,
        authors: query.authors,
        cost: query.cost,
        edition: query.edition,
        publisher: query.publisher,
        keywords: query.keywords,
        bestseller: query.bestseller || false,
        description: query.description,
        isbn: query.isbn,
        image: query.image,
        published: query.published,
        available: query.available,
        reference: query.reference,
        maintenance: query.maintenance,
    };

    const book = interactor.new(fields);

    let response = responseComposer.format(book,
        true,
        defaultFields,
        r.locale,
        book.err);
    sendJson(res, response);
};

module.exports.getById = async function (req, res) {
    const r = traverseRequest(req, res, true);
    if (!r) return;

    const book = interactor.getById(r.bookId);

    let response = responseComposer.format(book,
        r.user.type === config.userTypes.LIBRARIAN,
        defaultFields,
        r.locale,
        book.err);
    sendJson(res, response);
};

module.exports.updateById = async function (req, res) {
    const r = traverseRequest(req, res, true, true);
    if (!r) return;

    const fields = req.body;
    const book = interactor.updateById(r.bookId, fields);

    let response = responseComposer.format(book, true, defaultFields, r.locale, book.err);
    sendJson(res, response);
};

module.exports.deleteById = async function (req, res) {
    const r = traverseRequest(req, res, true, true);
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
    const r = traverseRequest(req, res, true);
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
 * Book renewal handler
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.renewById = async function (req, res) {
    const r = traverseRequest(req, res, true);
    if (!r) return;

    const userId = req.body.user;

    let user = r.user;
    const isLibrarian = user.type === config.userTypes.LIBRARIAN;

    let book;
    if (isLibrarian && userId) {
        user = usersInteractor.getById(userId);
        if (user.err) {
            sendJson(res, error(user.err, r.locale));
            return;
        }
    }

    book = interactor.renewById(r.bookId, user);

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
    const r = traverseRequest(req, res, true, true);
    if (!r) return;

    const book = interactor.returnById(r.bookId, val.number(req.body.user) || r.user.id);
    if (book.err) {
        sendJson(res, error(book.err, r.locale));
        return;
    }

    let response = responseComposer.format(book, true, defaultFields);
    sendJson(res, response);
};

module.exports.renewById = async function (req, res) {
    const r = traverseRequest(req, res, true);
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
    const r = traverseRequest(req, res, true, true);
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
    const r = traverseRequest(req, res, true, true);
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