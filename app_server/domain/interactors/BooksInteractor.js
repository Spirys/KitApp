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
const AuthorsRepository = require('../../data/RepositoryProvider').AuthorsRepository;
const DocumentInstance = require('../models/documents/DocumentInstance.js');

const config = require('../../util/config');
const logger = require('../../util/Logger');
const moment = require('moment');

/**
 * Module functions
 * @private
 */

/**
 * Finds the available copy of the book and also checks whether a user has a copy
 * @param book {Book}
 * @param [user] {User}
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

        if (instance.taker && instance.taker.id === user.id) return {err: config.errors.DOCUMENT_ALREADY_TAKEN};
    }

    if (indexAvailable === -1) return {err: config.errors.DOCUMENT_NOT_AVAILABLE};
    return indexAvailable;
}

/**
 * Adds instances to the book
 * @param book {Book} An object where to add instances
 * @param startId {number} The id from which to start enumerating instances
 * @param available {number} The amount of available copies to add
 * @param reference {number} The amount of reference copies to add
 * @param maintenance {number} The amount of maintenance copies to add
 */

function addInstances(book, startId, available, reference, maintenance) {
    addInstancesFunc(book, startId, available, reference, maintenance)()
}

/**
 * Wraps the parameters into a function which can be applied later
 * @see addInstances
 * @return {function()}
 */

function addInstancesFunc(book, startId, available, reference, maintenance) {
    return () => {
        for (let i = 0; i < available; i++) {
            book.instances.push({
                id: ++startId,
                status: config.statuses.AVAILABLE
            })
        }
        for (let i = 0; i < reference; i++) {
            book.instances.push({
                id: ++startId,
                status: config.statuses.REFERENCE
            })
        }
        for (let i = 0; i < maintenance; i++) {
            book.instances.push({
                id: ++startId,
                status: config.statuses.MAINTENANCE
            })
        }
    }
}

/**
 * Calculates the time in which the document must be returned
 * @param userType {string} The type of the user
 * @param bestseller {boolean} Whether the book is bestseller or not
 * @return {string} String in {@link config.DATE_FORMAT_EXT extended date format}
 */

function timeDue(userType, bestseller) {
    return moment()
        .add((userType === config.userTypes.STUDENT)
            ? (bestseller)
                ? config.CHECKOUT_TIME_STUDENT_BESTSELLER
                : config.CHECKOUT_TIME_STUDENT_NOT_BESTSELLER
            : config.CHECKOUT_TIME_FACULTY, 'ms')
        .format(config.DATE_FORMAT_EXT)
}

/**
 * Module exports
 * @public
 */

/**
 * Gets all books from the repository starting from (page - 1) * length till the length - 1
 * @param page
 * @param length
 * @return {Array<Book>}
 */

module.exports.getAll = (page, length) => Repository.getAll(page, length);

module.exports.search = async function () {

};

module.exports.new = function (query) {

    /*
        Set defaults if instance parameters are missing
    */

    let book,

        available = (query.available)
            ? typeof query.available === 'number' ? query.available : 0
            : (query.reference || query.maintenance) ? 0 : 1,

        reference = (query.reference)
            ? typeof query.reference === 'number' ? query.reference : 0
            : (available || query.maintenance) ? 0 : 1,

        maintenance = (query.maintenance)
            ? typeof query.maintenance === 'number' ? query.maintenance : 0
            : (available || reference) ? 0 : 1,

        books = Repository.searchExact({
            title: query.title,
            edition: query.edition,
            publisher: query.publisher
        });

    /*
        Update the existing book, add number of instances
     */
    if (books.length) {
        book = books[0];
        try {
            Repository.write(addInstancesFunc(book, Repository.maxInstanceId(), available, reference, maintenance))
        } catch (error) {
            logger.error(error);
            return {err: config.errors.INTERNAL}
        }
    }

    /*
        Create a new book
     */
    else {
        let id = Repository.maxId() + 1;

        book = Object.assign({}, query);
        book.id = id;
        book.authors = [];

        // Find the requested authors or create them
        for (let author of query.authors) {
            // let [first_name, last_name] = author.trim().split(' ');
            book.authors.push(AuthorsRepository.findOrCreate({
                first_name: author.first_name,
                last_name: author.last_name
                // middle_name: author.middle_name,
                // birth_date: author.birth_date,
                // death_date: author.death_date
            }));
        }

        /*
            Fill the instances
         */

        book.instances = [];
        addInstances(book, Repository.maxInstanceId(), available, reference, maintenance);

        try {
            Repository.create(book);
        } catch (error) {
            logger.error(error);
            return {err: config.errors.INTERNAL}
        }
    }

    return book
};

module.exports.getById = (id) => {
    try {
        let book = Repository.get(id);
        return book || {err: config.errors.DOCUMENT_NOT_FOUND}
    } catch (error) {
        logger.error(error);
        return {err: config.errors.DOCUMENT_NOT_FOUND}
    }
};

module.exports.updateById = function (id, fields) {
    let book = Repository.get(id);

    // TODO: add authors

    const action = () => {
        if (fields.title) book.title = fields.title;
        if (fields.cost) book.cost = fields.cost;
        if (fields.edition) book.edition = fields.edition;
        if (fields.isbn) book.isbn = fields.isbn;
        if (typeof fields.bestseller === 'boolean') book.bestseller = fields.bestseller;
        if (fields.publisher) book.publisher = fields.publisher;
        if (fields.keywords) book.keywords = fields.keywords;
        if (fields.description) book.description = fields.description;
        if (fields.image) book.image = fields.image;
        if (fields.published) book.published = fields.published;
    };

    try {
        Repository.write(action);
        return book
    } catch (error) {
        logger.error(error);
        return {err: config.errors.INTERNAL}
    }

};

module.exports.deleteById = async function (id) {
    return await Repository.delete(id);
};

module.exports.reserveById = function (bookId, user) {
    let book = Repository.get(bookId);
    if (!book) return {err: config.errors.DOCUMENT_NOT_FOUND};

    // Finding an available copy
    let indexAvailable = findAvailable(book, user);
    if (indexAvailable.err) return {err: indexAvailable.err};

    /*
        Marking the instance as reserved
    */

    let instance = book.instances[indexAvailable];

    // Applying business logic
    let dueBack = timeDue(user.type, book.bestseller);

    const action = () => {
        instance.status = config.statuses.RESERVED;
        instance.taker = user;
        instance.take_due = moment().add(config.DOCUMENT_RESERVATION_TIME, 'ms').format(config.DATE_FORMAT_EXT);

        instance.due_back = dueBack;
    };

    try {
        Repository.write(action);
        return book
    } catch (error) {
        logger.error(error);
        return {err: error.message}
    }
};

module.exports.checkoutById = async function (bookId, user) {

    // Getting the book
    let book = Repository.get(bookId);
    if (!book) return {err: book.err};

    // Finding an available copy
    let indexAvailable = findAvailable(book, user);
    if (indexAvailable.err) return {err: indexAvailable.err};

    /*
        Marking the instance as loaned
    */

    let instance = book.instances[indexAvailable];

    // Applying business logic
    let dueBack = timeDue(user.type, book.bestseller);

    const action = () => {
        instance.status = config.statuses.LOANED;
        instance.taker = user;
        instance.due_back = dueBack;
    };

    try {
        Repository.write(action);
        return book
    } catch (error) {
        logger.error(error);
        return {err: error.message}
    }
};

/**
 * Marks the book with given id as returned by user
 * @public
 */

module.exports.returnById = function (bookId, userId) {

    // Getting the book
    let book = Repository.get(bookId);
    if (!book) return {err: config.errors.DOCUMENT_NOT_FOUND};

    // Finding the loaned book which is taken by the user
    let instance = book.instances.find(i => i.taker && i.taker.id === userId);

    if (!instance) return {err: config.errors.DOCUMENT_NOT_TAKEN};

    const action = () => {
        instance.status = 'Available';
        delete instance.taker;
        delete instance.due_back;
        delete instance.take_due;
    };

    try {
        Repository.write(action);
        return book
    } catch (error) {
        logger.error(error);
        return {err: error.message}
    }
};

/**
 * Gets all instances of the book
 * @return {Promise<void>}
 */

module.exports.getAllInstances = async function (book) {

};

module.exports.newInstance = async function (id, request) {

    // TODO REFACTOR
    const inst = new DocumentInstance(request.status);
    inst.due_back = request.due_back;
    inst.taker = request.taker;

    let book = await Repository.get(id);
    if (book.err) return {err: book.err};

    book.addInstance(inst);
    return book;
};

module.exports.getInstanceById = async function () {

};

module.exports.updateInstanceById = async function () {

};

module.exports.deleteInstanceById = async function () {

};