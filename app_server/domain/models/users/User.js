/*
 * The patron model
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */


/**
 * The model for User
 * @see Patron#constructor
 * @private
 */

const User = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'int',

        first_name: {type: 'string', indexed: true},
        last_name: {type: 'string', indexed: true},
        type: {type: 'string', indexed: true},

        books: {type: 'linkedObjects', objectType: 'BookInstance', property: 'taker'},
        journals: {type: 'linkedObjects', objectType: 'JournalInstance', property: 'taker'},
        media: {type: 'linkedObjects', objectType: 'MediaInstance', property: 'taker'},

        birth_date: 'string?',
        email: 'string',
        phone: 'string?',
        occupation: 'string?',
        about: 'string?',
        telegram: 'string?',
        avatar: 'string?',
        address: 'string?'
    }
};

/**
 * Module exports a {@link Patron} class
 * @type {Patron}
 * @public
 */

module.exports = User;