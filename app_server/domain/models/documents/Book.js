/*!
 * Book
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const BookInstance = require("./DocumentInstance").book;
const Errors = require('../../Errors');
const validator = require('../../validation/SetterValidation');

/**
 * A book model
 */

const Book = {
    name: 'Book',
    primaryKey: 'id',
    properties: {
        id: 'int',

        title: {type: 'string', indexed: true},
        edition: {type: 'string', indexed: true},
        publisher: {type: 'string', indexed: true},
        published: {type: 'string', indexed: true},

        bestseller: {type: 'bool', default: false},

        authors: 'Author[]',
        instances: 'BookInstance[]',

        cost: 'int?',
        description: 'string?',
        image: 'string?',
        isbn: 'string?',
        keywords: 'string?[]'
    }
};

/**
 * Module exports a {@link Book} class
 * @type {Book}
 * @public
 */

module.exports = Book;