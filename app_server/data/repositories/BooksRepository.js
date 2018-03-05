/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

// TODO: add error handlers

'use strict';

/**
 * Module exports
 * @public
 */

module.exports.create = create;
module.exports.read = get;
module.exports.get = get;
module.exports.getAll = getAll;
module.exports.update = updateBook;
module.exports.delete = remove;
module.exports.remove = remove;
module.exports.checkout = checkout;
module.exports.returnBook = returnBook;

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
    let bookDb = await BookDB.findOne({
        $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
    }, err => {
        if (err) console.log(err);
        // found!
    })
        .populate('instances')
        .populate('authors')
        .exec();

    if (bookDb.instances) {
        for (let i = 0; i < bookDb.instances.length; i++) {
            if (bookDb.instances[i].taker) {
                await UserDB.populate(bookDb.instances[i], {
                    path: 'taker'
                });
            }
        }
    }

    let book = BookClass(bookDb);

    return book;
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

// FIXME: add errors
async function checkout(book, user) {
    for (let i = 0; i < book.instances.length; i++) {
        if (book.instances[i].status === 'Available') {
            let date_now = Date.now();

            let instance = book.instances[i];
            instance.status = 'Loaned';
            instance.taker = user;
            instance.takeDue = new Date(date_now);
            if (user.type === 'Student') {
                if (book.isBestseller) {
                    instance.dueBack = new Date(date_now + config.DEFAULT_CHECKOUT_TIME_STUDENT_BESTSELLER);
                } else {
                    instance.dueBack = new Date(date_now + config.DEFAULT_CHECKOUT_TIME_STUDENT_NOT_BESTSELLER);
                }
            } else {
                instance.dueBack = date_now + config.DEFAULT_CHECKOUT_TIME_FACULTY;
            }

            await updateInstance(instance);
            break;
        }
    }

    return book;
}

async function returnBook(book, user) {
    for (let i = 0; i < book.instances.length; i++) {
        if (book.instances[i].status === 'Loaned') {
            let instance = book.instances[i];
            if (instance.taker.id === user.id) {
                instance.status = 'Available';
                instance.taker = undefined;
                instance.dueBack = undefined;
                instance.takeDue = undefined;

                await updateInstance(instance);
                break;
            }
        }
    }

    return book;
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