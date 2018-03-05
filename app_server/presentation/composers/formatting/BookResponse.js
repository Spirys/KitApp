/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../../util/config');
const defaultFields = config.DEFAULT_BOOK_RESPONSE_FIELDS;
const error = require('./ErrorResponse');
const authorsFormatter = require('./AuthorsResponse');
const instancesFormatter = require('./InstanceResponse');

/**
 * Module functions
 * @private
 */


/**
 * Formats the single book
 * @param book {Book}
 * @param librarianAccess
 * @param fields {Array<string>}
 * @param locale {string=}
 * @param err {string=}
 * @return {*}
 */

function format(book, librarianAccess, fields, locale, err) {
    if (err) {
        return error(err, locale)
    }

    const response = {};
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (defaultFields.includes(field)) {
            let sel;

            switch (field) {
                case 'bestseller': sel = book.isBestseller; break;
                case 'authors':
                    sel = authorsFormatter.formatMultiple(book.authors);
                    break;
                case 'instances':
                    sel = instancesFormatter.formatMultiple(book.instances, librarianAccess);
                    break;
                default: sel = book[field];
            }

            if (typeof sel !== 'undefined') response[field] = sel;
        }
    }
    return response
}

function formatMultiple(books, librarianAccess, fields, page, length, locale, err) {
    if (err) {
        return error(err, locale)
    }

    let response = {
        page,
        length: books.length,
        books: []
    };

    for (let i = 0; i < books.length; i++) {
        response.books.push(format(books[i], librarianAccess, fields))
    }

    return response
}

/**
 * Module exports
 * @public
 */

module.exports.format = format;
module.exports.formatMultiple = formatMultiple;