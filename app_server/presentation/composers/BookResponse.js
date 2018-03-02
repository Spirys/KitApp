/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../util/config');

/**
 * Module functions
 * @private
 */

function format(book, fields, locale, err) {
    // TODO
    return book
}

function formatMultiple(books, fields, page, length, locale, err) {
    if (err) {
        return {
            code: config.errorCode,
            message: config.messages(locale)[err]
        }
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