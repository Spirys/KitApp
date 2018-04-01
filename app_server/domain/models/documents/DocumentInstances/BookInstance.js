/*!
 * An implementation of a book instance
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */


/**
 * Model of the document instance. May be used as-is
 * @private
 */

const BookInstance = {
    name: 'BookInstance',
    primaryKey: 'id',
    properties: {
        id: 'int',
        status: {type: 'string', indexed: true},
        book: {type: 'linkingObjects', objectType: 'Book', property: 'instances'},
        taker: 'User',
        due_back: 'string?',
        take_due: 'string?'
    }
};

/**
 * Module exports a class {@link BookInstance}
 * @type {BookInstance}
 * @private
 */

module.exports = BookInstance;