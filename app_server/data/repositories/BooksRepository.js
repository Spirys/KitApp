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

// const AuthorRepo = require('./AuthorsRepository');
// const UserRepo = require('./UsersRepository');

const Realm = require('realm');
const Book = require('../../domain/models/documents/Book');
const BookInstance = require('../../domain/models/documents/DocumentInstance').book;
const Author = require('../../domain/models/documents/Author');
const errors = require('../../util/config').errors;

let realm;

async function init() {
    realm = await Realm.open({
        sync: {
            url: `realms://${config.realm.url}/~/documents`,
            user: Realm.Sync.User.current
        },
        schema: [Book, Author, BookInstance]
    });
}

async function check_init() {
    if (realm === undefined || realm.isClosed) {
        await init();
    }
}

/**
 * CRUD functions
 * @private
 */

async function get(id) {
    await check_init();

    let book = realm.objectForPrimaryKey('Book', id);

    return book ? book : {err: errors.DOCUMENT_NOT_FOUND};
}

// TODO
async function search(query) {
    // let books = await BookDB.find(query)
    //     .populate('authors')
    //     .populate('instances')
    //     .exec();
    //
    // let bookClasses = [];
    // for (let i = 0; i < books.length; i++) {
    //     let b = books[i];
    //
    //     for (let j = 0; j < b.instances.length; j++) {
    //         if (b.instances[j].taker) {
    //             await UserDB.populate(b.instances[j], {
    //                 path: 'taker'
    //             });
    //         }
    //     }
    //     bookClasses.push(BookClass(b));
    // }
    //
    // return bookClasses;
}

async function getAll(page, length) {
    await check_init();
    let books = realm.objects('Book').slice((page - 1) * length + 1, length + 1);

    return books;
}

// TODO
async function updateBook(book) {
    // let bookModel = BookModel(book);
    //
    // await BookDB.findByIdAndUpdate(book.innerId, bookModel).exec();
    //
    // return book;
}

// TODO Place logic into the interactor
async function create(query) {
    await check_init();
    let book;

    // Set defaults if instance parameters are missing
    let available, reference, maintenance;

    available = (query.available)
        ? typeof query.available === 'number' ? query.available : 0
        : (query.reference || query.maintenance) ? 0 : 1;

    reference = (query.reference)
        ? typeof query.reference === 'number' ? query.reference : 0
        : (available || query.maintenance) ? 0 : 1;

    maintenance = (query.maintenance)
        ? typeof query.maintenance === 'number' ? query.maintenance : 0
        : (available || reference) ? 0 : 1;

    let books = realm.objects('Book')
        .filtered('title == $0 AND edition == $1 AND publisher == $2 AND published CONTAINS[c] $3',
            query.title, query.edition, query.publisher, query.published);

    // FIXME: split 'write' block to many
    realm.write(() => {
        if (books.length === 0) {
            let id = realm.objects('Book').max('id') + 1 || 0;
            book = realm.create('Book', {
                id: id,
                title: query.title,
                // authors: [],
                // instances: [],
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

            let autId = realm.objects('Author').max('id') + 1 || 0;
            let authors = realm.objects('Author');

            for (let i = 0; i < query.authors; i++) {
                let author = authors.filtered('first_name == $0 AND last_name == $1',
                    query.authors[i].first_name, query.authors[i].last_name);

                if (author.length === 0) {
                    book.authors.push({
                        id: autId,
                        first_name: query.first_name,
                        last_name: query.last_name,

                        middle_name: query.middle_name,
                        birth_date: query.birth_date,
                        death_date: query.death_date
                    });
                    autId++;
                } else {
                    book.authors.push(author[0]);
                }
            }
        } else {
            book = books[0];
        }

        let instId = realm.objects('BookInstance').max('id') + 1 || 0;
        for (let i = 0; i < available; i++) {
            book.instances.push({
                id: instId,
                status: 'Available'
            });
            instId++;
        }

        for (let i = 0; i < reference; i++) {
            book.instances.push({
                id: instId,
                status: 'Reference'
            });
            instId++;
        }

        for (let i = 0; i < maintenance; i++) {
            book.instances.push({
                id: instId,
                status: 'Maintenance'
            });
            instId++;

        }
    });


    return book;
}


async function addInstances(book, available, reference, maintenance) {
    await check_init();

    let id = realm.objects('BookInstances').max('id') + 1 || 0;
    for (let i = 0; i < available; i++) {
        realm.write(() => {
            book.instances.push({
                id: id,
                status: 'Available'
            });
        });
        id++;
    }

    for (let i = 0; i < reference; i++) {
        realm.write(() => {
            book.instances.push({
                id: id,
                status: 'Reference'
            });
        });
        id++;
    }

    for (let i = 0; i < maintenance; i++) {
        realm.write(() => {
            book.instances.push({
                id: id,
                status: 'Maintenance'
            });
        });
        id++;
    }

    return book;
}

async function remove(id) {
    await check_init();
    let book = await get(id);
    if (book.err) return {err: book.err};

    realm.write(() => {
        realm.delete(book.instances);
        realm.delete(book);
    });

    return book;
}

async function createInstance(status) {
    await check_init();
    let instance;
    realm.write(() => {
        instance = realm.create('BookInstance', {
            status: status
        });
    });

    return instance;
}

// TODO
async function updateInstance(instance) {
    // let instanceModel = BookInstanceModel(instance);
    //
    // await BookInstanceDB.findByIdAndUpdate(instance.innerId, instanceModel).exec();
    //
    // return instance;
}

async function removeInstance(instance) {
    await check_init();

    realm.write(() => {
        realm.delete(instance);
    });

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