/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

// TODO: add error handlers

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../util/config');

const BookDB = require('../models/documents/Book');
const BookInstanceDB = require('../models/documents/DocumentInstance');
const UserDB = require('../models/users/Patron');

const AuthorRepo = require('./AuthorsRepository');
const UserRepo = require('./UsersRepository');

const BookClass = require('../converters/model_to_class/documents/BookModelToClass');
const AuthorClass = require('../../domain/models/documents/Author');
const BookInstanceClass = require('../converters/model_to_class/documents/DocumentInstanceModelToClass');
const UserClass = require('../../domain/models/users/Patron');

const BookModel = require('../converters/class_to_model/documents/BookClassToModel');
const BookInstanceModel = require('../converters/class_to_model/documents/DocumentInstanceClassToModel');

/**
 * CRUD functions
 * @private
 */

async function get(id) {

    const query = {
        $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
    };

    let book = await BookDB.findOne(query)
        .populate('instances')
        .populate('authors')
        .exec();

    if (!book) {
        return {err: config.errors.DOCUMENT_NOT_FOUND}
    }

    if (book.instances) {
        for (let i = 0; i < book.instances.length; i++) {
            if (book.instances[i].taker) {
                await UserDB.populate(book.instances[i], {
                    path: 'taker'
                });
            }
        }
    }

    return BookClass(book);
}

async function search(query) {
    let books = await BookDB.find(query)
        .populate('authors')
        .populate('instances')
        .exec();

    let bookClasses = [];
    for (let i = 0; i < books.length; i++) {
        let b = books[i];

        for (let j = 0; j < b.instances.length; j++) {
            if (b.instances[j].taker) {
                await UserDB.populate(b.instances[j], {
                    path: 'taker'
                });
            }
        }
        bookClasses.push(BookClass(b));
    }

    return bookClasses;
}

async function getAll(page, length) {
    let books = await BookDB.find()
        .skip((page - 1) * length)
        .limit(length)
        .populate('authors')
        .populate('instances')
        .exec();

    let bookClasses = [];
    for (let i = 0; i < books.length; i++) {
        let b = books[i];

        for (let j = 0; j < b.instances.length; j++) {
            if (b.instances[j].taker) {
                await UserDB.populate(b.instances[j], {
                    path: 'taker'
                });
            }
        }
        bookClasses.push(BookClass(b));
    }

    return bookClasses;
}

async function updateBook(book) {
    let bookModel = BookModel(book);

    await BookDB.findByIdAndUpdate(book.innerId, bookModel).exec();

    return book;
}

async function create(query) {
    let book = await search({
        title: query.title,
        edition: query.edition,
        publisher: query.publisher
    });

    if (book.length === 0) {
        let bookDb = await BookDB.create({
            title: query.title,
            authors: [],
            instances: [],
            cost: query.cost,
            edition: query.edition,
            publisher: query.publisher,
            keywords: query.keywords,
            bestseller: query.bestseller,
            description: query.description,
            isbn: query.isbn,
            image: query.image,
            published: query.published
        });

        book = BookClass(bookDb);

        let authors = [];
        for (let i = 0; i < query.authors.length; i++) {
            let author = await AuthorRepo.search(query.authors[i]);
            if (author.length === 0) {
                author = await AuthorRepo.create(query.authors[i]);
            } else {
                author = author[0];
            }
            authors.push(author);
        }
        book.authors = authors;
    }

    if (query.available) {
        for (let i = 0; i < query.available; i++) {
            let instance = await createInstance('Available');
            book.addInstance(instance);
        }
    }

    if (query.reference) {
        for (let i = 0; i < query.reference; i++) {
            let instance = await createInstance('Reference');
            book.addInstance(instance);
        }
    }

    if (query.maintenance || 1) {
        let count = query.maintenance ? query.maintenance : 1;
        for (let i = 0; i < count; i++) {
            let instance = await createInstance('Maintenance');
            book.addInstance(instance);
        }
    }

    await updateBook(book);

    return book;
}

async function remove(id) {
    let book = await get(id);

    if (book) {
        for (let i = 0; i < book.instances.length; i++) {
            await removeInstance(book.instances[i]);
        }

        await BookDB.remove({_id: book.innerId});

        book.instances = [];
        return {
            success: true,
            book
        };
    }
    return {
        success: false
    };
}

async function createInstance(status) {
    let instance = await BookInstanceDB.create({
        status: status
    });

    return BookInstanceClass(instance);
}

async function updateInstance(instance) {
    let instanceModel = BookInstanceModel(instance);

    await BookInstanceDB.findByIdAndUpdate(instance.innerId, instanceModel).exec();

    return instance;
}

async function removeInstance(instance) {
    let instanceModel = BookInstanceModel(instance);

    await BookInstanceDB.remove({_id: instance.innerId});

    return true;
}

/**
 * Module exports
 * @public
 */

module.exports.create = create;
module.exports.read = get;
module.exports.get = get;
module.exports.getAll = getAll;
module.exports.update = updateBook;
module.exports.updateInstance = updateInstance;
module.exports.delete = remove;
module.exports.remove = remove;