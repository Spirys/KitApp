/*!
 * Authentication repository
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const defaultFields = require('../../util/config').DEFAULT_BOOK_REQ_FIELDS;

const realm = require('../db').realm;
const Book = require('../../domain/models/documents/Book');

/**
 * CRUD functions
 * @private
 */

const get = (id) => realm.objectForPrimaryKey('Book', id);

/**
 * Searches for the books which match the criterion
 * @param query {*} A JSON. Every resulting object will contain the specified fields with specified values.<br>
 *      E.g. passing <code>{publisher: 'Renowned publisher', cost: 1000}</code>
 *      will result in all books which have 'Renowned publisher' as publisher and 100 as cost.
 * @param page
 * @param length
 * @return {Realm.Results<Book>}
 */

function searchLenient(query, page, length) {
    let searchFields = [], searchParams = [];

    // Validate fields
    for (let item in query) {
        if (query.hasOwnProperty(item)) {
            searchFields.push(item);
            searchParams.push(query[item]);
        }
    }

    if (searchFields.length) {
        let searchQuery = '';
        for (let i = 0; i < searchFields.length; i++) {
            switch (searchFields[i]) {
                case 'title':
                case 'edition':
                case 'publisher':
                case 'description':
                    if (searchQuery) {
                        searchQuery += ' OR ';
                    }
                    searchQuery += searchFields[i] + ' CONTAINS[c] $' + i;
                    break;

                case 'published':
                case 'bestseller':
                case 'cost':
                case 'isbn':
                    if (searchQuery) {
                        searchQuery += ' OR ';
                    }
                    searchQuery += searchFields[i] + ' == $' + i;
                    break;

                case 'available':
                case 'loaned':
                case 'reference':
                    if (searchQuery) {
                        searchQuery += ' OR ';
                    }
                    searchQuery += searchFields[i] + ' >= $' + i;
                    break;

                // FIXME: PRIMITIVE LISTS ARE NOT SUPPORTED (e.g. 'strings[]')
                case 'keywords':
                    break;
                    if (searchQuery) {
                        searchQuery += ' OR ';
                    }
                    searchQuery += 'keywords ==[c] $' + i;
                    break;

                case 'author':
                    if (searchQuery) {
                        searchQuery += ' OR ';
                    }
                    if (searchParams[i].indexOf(' ') > -1) {
                        let tmp = searchParams[i].split(' ');
                        searchParams[i] = tmp[0];

                        // just a crutch
                        searchParams.splice(i + 1, 0, tmp[1]);
                        searchFields.splice(i + 1, 0, 'tmp');
                    } else {
                        searchParams.splice(i + 1, 0, searchParams[i]);
                        searchFields.splice(i + 1, 0, 'tmp');
                    }
                    searchQuery += 'authors.first_name CONTAINS[c] $' + i + ' OR authors.first_name CONTAINS[c] $' + (i + 1)
                        + ' OR authors.last_name CONTAINS[c] $' + (i + 1) + ' OR authors.last_name CONTAINS[c] $' + i;
                    i++;
                    break;
            }
        }

        return realm.objects('Book')
            .filtered(searchQuery, ...searchParams)
            .slice((page - 1) * length, page * length);

    } else return realm.objects('Book').slice((page - 1) * length, page * length);
}

/**
 * Searches for the books which match the criterion
 * @param query {*} A JSON. Every resulting object will contain the specified fields with specified values.<br>
 *      E.g. passing <code>{publisher: 'Renowned publisher', cost: 1000}</code>
 *      will result in all books which have 'Renowned publisher' as publisher and 100 as cost.
 * @return {Realm.Results<Book>}
 */

function searchExact(query) {
    let searchFields = [], searchParams = [];

    // Validate fields
    for (let item in query) {
        if (query.hasOwnProperty(item) && defaultFields.includes(item)) {
            searchFields.push(item);
            searchParams.push(query[item])
        }
    }

    if (searchFields.length) {
        let searchQuery = searchFields[0] + ' == $0';

        for (let i = 1; i < searchFields.length; i++) {
            searchQuery += ' AND ' + searchFields[i] + '== $' + i
        }

        return realm.objects('Book')
            .filtered(searchQuery, ...searchParams);

    } else return realm.objects('Book');
}

function getAll(page, length) {
    return realm.objects('Book').slice((page - 1) * length, page * length);
}

// TODO
const updateBook = (book) => create(book, true);

/**
 *
 * @param book
 * @param update
 * @return {Book}
 */

function create(book, update) {
    realm.write(() => {
        if (update) realm.create('Book', book, true);
        else realm.create('Book', book)
    });

    return realm.objectForPrimaryKey('Book', book.id);
}

function remove(book) {
    realm.write(() => {
        for (let i of book.instances) {
            realm.delete(i)
        }
        realm.delete(book)
    });

    return true
}

async function createInstance(status) {
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
module.exports.searchExact = searchExact;
module.exports.findExact = searchExact;
module.exports.search = searchLenient;

module.exports.write = (action) => realm.write(action);

module.exports.maxId = () => realm.objects('Book').max('id') || 0;
module.exports.maxInstanceId = () => realm.objects('BookInstance').max('id') || 0;