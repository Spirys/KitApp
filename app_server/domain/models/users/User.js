/*
 * The user model
 * Copyright (c) 2018 KitApp project
 */

'use strict';

/**
 * The model for User
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

        books: {type: 'linkingObjects', objectType: 'BookInstance', property: 'taker'},
        journals: {type: 'linkingObjects', objectType: 'JournalInstance', property: 'taker'},
        media: {type: 'linkingObjects', objectType: 'MediaInstance', property: 'taker'},

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

module.exports = User;