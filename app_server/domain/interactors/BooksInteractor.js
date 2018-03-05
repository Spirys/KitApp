/*
 * Books Interactor
 * An intermediary that checks all the inputs
 * and either returns an error or performs the required action
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

//const validator = require('../validation/InputValidation');
const Repository = require('../../data/RepositoryProvider').BooksRepository;
const DocumentInstance = require('../models/documents/DocumentInstance.js');

/**
 * Module exports
 * @public
 */

/**
 * Gets all books from the repository starting from (page - 1) * length till the length - 1
 * @param page
 * @param length
 * @param fields the fields to include
 * @return {Promise<Array>}
 */

// TODO: returns class
module.exports.getAll = async function (page, length, fields) {
    return await Repository.getAll(page, length);
};

module.exports.search = async function () {

};

module.exports.new = async function (fields) {
    return await Repository.create(fields);
};

module.exports.getById = async function (id) {
    return await Repository.get(id);
};

module.exports.updateById = async function (id, fields) {
    let book = await Repository.get(id);

    // TODO: add authors
    if (fields.title) book.title = fields.title;
    if (fields.cost) book.cost = fields.cost;
    if (fields.edition) book.edition = fields.edition;
    if (fields.isbn) book.isbn = fields.isbn;
    if (fields.bestseller != null && fields.bestseller !== undefined) book.isBestseller = fields.bestseller;
    if (fields.publisher) book.publisher = fields.publisher;
    if (fields.keywords) book.keywords = fields.keywords;
    if (fields.description) book.description=fields.description;
    if (fields.image) book.image = fields.image;
    if (fields.published) book.published = fields.published;

    return await Repository.update(book);
};

module.exports.deleteById = async function () {
    return await Repository.delete(id);
};

module.exports.checkoutById = async function () {

};

/**
 * Marks the book with given id as returned by user
 */

module.exports.returnById = async function (id, user) {

};

/**
 * Gets all instances of the book
 * @return {Promise<void>}
 */

module.exports.getAllInstances = async function (book) {

};

module.exports.newInstance = async function (id, request) {
    const inst = new DocumentInstance(request.status);
    inst.dueBack = request.due_back;
    inst.taker = request.taker;

    let book = await Repository.get(id);
    book.addInstance(inst);
    return await Repository.update(book);
};

module.exports.getInstanceById = async function () {

};

module.exports.updateInstanceById = async function () {

};

module.exports.deleteInstanceById = async function () {

};