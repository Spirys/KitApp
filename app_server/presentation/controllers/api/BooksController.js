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
const interactor = require('../../../domain/interactors/BooksInteractor');
const usersInteractor = require('../../../domain/interactors/UsersInteractor');
const defaultNumberOfBooks = require('../../../util/config').DEFAULT_DOCS_NUMBER;
const defaultFields = require('../../../util/config').DEFAULT_BOOK_RESPONSE_FIELDS;

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

};

module.exports.getById = async function (req, res) {

};

module.exports.updateById = async function (req, res) {

};

module.exports.deleteById = async function (req, res) {

};

module.exports.checkoutById = async function (req, res) {
    
};

/**
 * Marks the book with given id as returned by user
 * @param req
 * @param res
 * @return {Promise<void>}
 */

module.exports.returnById = async function (req, res) {

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