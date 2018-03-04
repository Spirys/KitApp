/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../util/config');
const defaultFields = config.DEFAULT_BOOK_RESPONSE_FIELDS;

/**
 * Module functions
 * @private
 */

function error(err, locale) {
    return {
        code: config.errorCode,
        message: config.messages(locale)[err]
    }
}

/**
 * Module functions
 * @private
 */

function format(book, fields, locale, err) {
    if (err) {
        return error(err, locale)
    }

    const response = {};
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (defaultFields.find((s) => s === field)) {
            let sel = (field === 'bestseller')
                ? book.isBestseller
                : book[field];

            if (typeof sel !== 'undefined') response[field] = sel;
        }
    }
    return response
}

function formatMultiple(books, fields, page, length, locale, err) {
    if (err) {
        return error(err, locale)
    }

    let response = {
        page,
        length: books.length,
        books: []
    };

    for (let i = 0; i < books.length; i++) {
        response.books.push(format(books[i], fields))
    }

    return response
}

/**
 * Module exports
 * @public
 */

module.exports.format = format;
module.exports.formatMultiple = formatMultiple;