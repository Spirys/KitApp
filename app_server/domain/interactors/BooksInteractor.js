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

const Repository = require('../../data/RepositoryProvider').BooksRepository;
const DocumentInstance = require('../models/documents/DocumentInstance.js');
const config = require("../../util/config");

/**
 * Module functions
 * @private
 */

/**
 * Finds the available copy of the book and also checks whether a user has a copy
 * @param book {Book}
 * @param [user]
 * @return {*}
 */

function findAvailable(book, user) {
    if (!user || !user.id) user = {id: -1}; // Do not consider user if not sent

    let indexAvailable = -1;

    for (let i = 0; i < book.instances.length; i++) {
        let instance = book.instances[i];

        // Searching for available copies
        if (indexAvailable === -1 && instance.status === config.statuses.AVAILABLE) {
            indexAvailable = i;
        }

        if (instance.taker && instance.taker.id === user.id) return {err: config.errors.DOCUMENT_ALREADY_TAKEN}
    }

    if (indexAvailable === -1) return {err: config.errors.DOCUMENT_NOT_AVAILABLE};
    return indexAvailable;
}

/**
 * Module exports
 * @public
 */

/**
 * Gets all books from the repository starting from (page - 1) * length till the length - 1
 * @param page
 * @param length
 * @return {Promise<Array<Book>>}
 */

module.exports.getAll = async function (page, length) {
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
    if (typeof fields.bestseller === 'boolean') book.isBestseller = fields.bestseller;
    if (fields.publisher) book.publisher = fields.publisher;
    if (fields.keywords) book.keywords = fields.keywords;
    if (fields.description) book.description = fields.description;
    if (fields.image) book.image = fields.image;
    if (fields.published) book.published = fields.published;

    return await Repository.update(book);
};

module.exports.deleteById = async function (id) {
    return await Repository.delete(id);
};

module.exports.reserveById = async function (bookId, user) {
    let book = await Repository.get(bookId);
    if (book.err) return {err: book.err};

    // Finding an available copy
    let indexAvailable = findAvailable(book, user);
    if (indexAvailable.err) return {err: indexAvailable.err};

    /*
        Marking the instance as reserved
    */

    let currentTime = Date.now(),
        instance = book.instances[indexAvailable];

    instance.status = config.statuses.RESERVED;
    instance.taker = user;
    instance.takeDue = new Date(currentTime + config.DOCUMENT_RESERVATION_TIME);

    // Applying business logic
    let timeDue = currentTime;
    timeDue += (user.type === config.userTypes.STUDENT)
        ? (book.isBestseller)
            ? config.CHECKOUT_TIME_STUDENT_BESTSELLER
            : config.CHECKOUT_TIME_STUDENT_NOT_BESTSELLER
        : config.CHECKOUT_TIME_FACULTY;

    instance.dueBack = new Date(timeDue);

    await Repository.updateInstance(instance);
    return book;
};

module.exports.checkoutById = async function (bookId, user) {

    // Getting the book
    let book = await Repository.get(bookId);
    if (book.err) return {err: book.err};

    // Finding an available copy
    let indexAvailable = findAvailable(book, user);
    if (indexAvailable.err) return {err: indexAvailable.err};

    /*
        Marking the instance as loaned
    */

    let currentTime = Date.now(),
        instance = book.instances[indexAvailable];

    instance.status = config.statuses.LOANED;
    instance.taker = user;

    // Applying business logic
    let timeDue = currentTime;
    timeDue += (user.type === config.userTypes.STUDENT)
        ? (book.isBestseller)
            ? config.CHECKOUT_TIME_STUDENT_BESTSELLER
            : config.CHECKOUT_TIME_STUDENT_NOT_BESTSELLER
        : config.CHECKOUT_TIME_FACULTY;

    instance.dueBack = new Date(timeDue);

    await Repository.updateInstance(instance);
    return book;
};

/**
 * Marks the book with given id as returned by user
 */

module.exports.returnById = async function (bookId, userId) {

    // Getting the book
    let book = await Repository.get(bookId);
    if (book.err) return {err: config.errors.DOCUMENT_NOT_FOUND};

    // Finding the loaned book which is taken by the user
    let instance = book.instances.find(i => i.taker && i.taker.id === userId);

    if (!instance) return {err: config.errors.DOCUMENT_NOT_TAKEN};

    instance.status = 'Available';
    instance.taker = undefined;
    instance.dueBack = undefined;
    instance.takeDue = undefined;

    await Repository.updateInstance(instance);

    return book;
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
    if (book.err) return {err: book.err};

    book.addInstance(inst);
    return await Repository.update(book);
};

module.exports.getInstanceById = async function () {

};

module.exports.updateInstanceById = async function () {

};

module.exports.deleteInstanceById = async function () {

};