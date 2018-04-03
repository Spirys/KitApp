/*!
 * Book
 * Copyright(c) 2018 KitApp project
 */

'use strict';

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
        keywords: 'string?[]',

        awaiting: 'User[]',
        outstanding_request: 'bool'
    }
};

module.exports = Book;