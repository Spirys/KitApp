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
const error = require('../../composers/ResponseComposer').error;
const interactor = require('../../../domain/interactors/BooksInteractor');
const usersInteractor = require('../../../domain/interactors/UsersInteractor');

const config = require('../../../util/config');
const defaultNumberOfBooks = config.DEFAULT_DOCS_NUMBER;
const defaultFields = config.DEFAULT_BOOK_RESPONSE_FIELDS;

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
    const length = req.query.length || defaultNumberOfBooks;
    const fields = (typeof req.query.fields === 'string')
        ? req.query.fields.split(',')
        : defaultFields;
    const locale = getLocale(req);

    // Getting the books
    const books = await interactor.getAll(page, length, fields);

    let response = responseComposer.formatMultiple(books, true, fields, page, length, locale, books.err);

    // TODO Get rid of maintenance copies for patron
    // TODO Get rid of 'taker' and 'due_back' for patron

    res.json(response);
};

module.exports.search = async function (req, res) {

};

module.exports.new = async function (req, res) {

    let query = req.body;
    const fields = {
        title: query.title,
        authors: query.authors,
        cost: query.cost,
        edition: query.edition,
        publisher: query.publisher,
        keywords: query.keywords,
        bestseller: query.bestseller,
        description: query.description,
        isbn: query.isbn,
        image: query.image,
        published: query.published,
        available: query.available,
        reference: query.reference,
        maintenance: query.maintenance,
    };
    const locale = getLocale(req);

    const book = await interactor.new(fields);

    let response = responseComposer.format(book, true, defaultFields, locale, book.err);
    res.json(response);
};

module.exports.getById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);

    const book = await interactor.getById(id);

    let response = responseComposer.format(book, true, defaultFields, locale, book.err);
    res.json(response);
};

module.exports.updateById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);
    const fields = req.body;

    const book = await interactor.updateById(id, fields);

    let response = responseComposer.format(book, true, defaultFields, locale, book.err);
    res.json(response);
};

module.exports.deleteById = async function (req, res) {
    const id = req.params.id;
    const locale = getLocale(req);

    const book = await interactor.deleteById(id);

    let response = responseComposer.format(book.book, true, defaultFields, locale, book.err);
    res.json(response);
};

module.exports.checkoutById = async function (req, res) {

    // Traversing request
    const bookId = req.params.id;
    const locale = getLocale(req);

    // Checking permissions
    const user = await usersInteractor.verifyToken(req.body.token);
    if (user.err) {
        res.json(error(user.err, locale));
        return
    }

    // Checking out the book
    const book = await interactor.checkoutById(bookId, user.user);
    if (book.err) {
        res.json(error(book.err, locale));
        return
    }

    let response = responseComposer.format(book,
        user.user.type === config.userTypes.LIBRARIAN,
        defaultFields);
    res.json(response);
};

/**
 * Marks the book with given id as returned by user
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.returnById = async function (req, res) {
    const bookId = req.params.id,
        locale = getLocale(req),
        user = await usersInteractor.verifyToken(req.body.token);

    if (user.err) {
        res.json(error(user.err, locale));
        return
    }

    const book = await interactor.returnById(bookId, req.body.user || user.user.id);

    let response = responseComposer.format(book,
        user.user.type === config.userTypes.LIBRARIAN,
        defaultFields,
        locale,
        book.err);
    res.json(response);
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