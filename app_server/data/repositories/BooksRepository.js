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
module.exports.update = update;
module.exports.delete = remove;
module.exports.remove = remove;

/**
 * Module dependencies
 * @private
 */

const Book = require('../models/documents/Book').models.mongo;
const AuthorRepo = require('./AuthorsRepository');
const BookInstance = require('../models/documents/DocumentInstance').models.mongo.book;
const User = require('../models/users/Patron');
const UserRepo = require('./UsersRepository');

/**
 * CRUD functions
 * @private
 */

// TODO: returns class
async function get(id = null, query = null, count = 1) {
    if (id) {
        return await Book.findOne({
            $where: `parseInt(this._id.valueOf().toString().substring(18), 16) === ${id}`
        }, err => {
            if (err) console.log(err);
            // found!
        })
            .populate('instances')
            .populate('authors')
            .exec();
    }
    else if (query) {
        let books = await Book.find({}, err => {
            if (err) console.log(err);
            // found!
        })
            .limit(count)
            .populate('instances')
            .populate('authors')
            .exec();

        if (books && count === 1) {
            return books[0];
        } else if (books && count !== -1) {
            return books.slice(0, count);
        } else {
            return books;
        }
    }
    else {
        return null;
    }
}

// TODO: get all books
async function getAll(page, length, fields) {
    return await get(null, fields, length);
}

// FIXME: MAKE BETTER!!!!

async function update(id, query) {
    let book = await get(id);

    if (!book) {
        return null;
    }

    if (query.title) book.title = query.title;
    if (query.bestseller) book.bestseller = query.bestseller;
    if (query.cost) book.cost = query.cost;
    if (query.publisher) book.publisher = query.publisher;
    if (query.edition) book.edition = query.edition;
    if (query.isbn) book.isbn = query.isbn;
    if (query.keywords) book.keywords = query.keywords;
    if (query.description) book.description = query.description;
    if (query.image) book.image = query.image;
    if (query.published) book.published = query.published;

    if (query.authors) {
        let authors = [];
        for (let i = 0; i < query.authors.length; i++) {
            let author = await AuthorRepo.get(null, query.authors[i]);
            if (!author) {
                author = await AuthorRepo.create(query.authors[i]);
            }
            authors.push(author);
        }
        book.authors = authors;
    }

    return await book.save(err => {
        if (err) console.log(err);
        // saved!
    });
}

async function create(query) {
    let book = await get(null, query);

    if (!book) {
        book = {
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
        };

        for (let i = 0; i < query.authors.length; i++) {
            let author = await AuthorRepo.get(null, query.authors[i]);
            if (!author) {
                author = await AuthorRepo.create(query.authors[i]);
            }
            book.authors.push(author);
        }

        book = await Book.create(book, err => {
            if (err) console.log(err);
            // created!
        });
    }

    if (query.available) {
        for (let i = 0; i < query.available; i++) {
            let instance = await createInstance('Available', book);
            book.instances.push(instance);
        }
    }

    if (query.reference) {
        for (let i = 0; i < query.reference; i++) {
            let instance = await createInstance('Reference', book);
            book.instances.push(instance);
        }
    }

    if (query.maintenance || 1) {
        let count = query.maintenance ? query.maintenance : 1;
        for (let i = 0; i < count; i++) {
            let instance = await createInstance('Maintenance', book);
            book.instances.push(instance);
        }
    }

    return await book.save(err => {
        if (err) console.log(err);
        // saved!
    });
}

async function remove(id) {
    let book = await get(id);
    if (book) {
        await Book.remove({_id: book._id}, err => {
            if (err) {
                console.log(err);
                return false;
            }
            // removed!
        });

        return true;
    }
    return false;
}

// FIXME: add errors
async function checkout(id, query) {
    let book = await get(id);
    if (!book) {
        return 'SOME ERROR';
    }

    let user = UserRepo.get(query.user_id);
    let time = query.time * 24 * 60 * 60 * 1000;
    if (user.type === 'Student') {
        if (book.bestseller) {
            // 2 weeks
            time = (14 * 24 * 60 * 60 * 1000) > time ? time : (14 * 24 * 60 * 60 * 1000);
        } else {
            // 3 weeks
            time = (21 * 24 * 60 * 60 * 1000) > time ? time : (21 * 24 * 60 * 60 * 1000);
        }
    } else {
        // 4 weeks
        time = (28 * 24 * 60 * 60 * 1000) > time ? time : (28 * 24 * 60 * 60 * 1000);
    }

    // FIXME: return something
    for (let i = 0; i < book.instances.length; i++) {
        if (book.instances[i].status === 'Available') {
            let date_now = Date.now();
            await BookInstance.update({_id: book.instances[i]._id}, {
                $set: {
                    status: 'Loaned',
                    taker: user,
                    take_due: date_now,
                    due_back: date_now + time
                }
            }, err => {
                if (err) console.log(err);
                // updated!
            });
            break;
        }
    }
}

async function returnBook(id, query) {
    let book = await get(id);
    if (!book) {
        return 'SOME ERROR';
    }

    // FIXME: return something
    for (let i = 0; i < book.instances.length; i++) {
        if (book.instances[i].status === 'Loaned') {
            let instance = book.instances[i];
            await User.populate(instance, {
                path: 'taker'
            });
            if (instance.taker.id === query.id) {
                instance.status = 'Available';
                instance.taker = undefined;
                instance.take_due = undefined;
                instance.due_back = undefined;

                await instance.save();
                break;
            }
        }
    }
}

async function createInstance(status, book) {
    let instance = await BookInstance.create({
        status: status,
        document: {
            kind: 'Book',
            doc: book
        }
    }, err => {
        if (err) console.log(err);
        // created!
    });

    return instance;
}