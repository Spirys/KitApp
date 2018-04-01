/*!
 * An implementation of a journal instance
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

const JournalInstance = {
    name: 'JournalInstance',
    primaryKey: 'id',
    properties: {
        id: 'int',
        status: {type: 'string', indexed: true},
        journal: {type: 'linkingObjects', objectType: 'Journal', property: 'instances'},
        taker: 'User',
        due_back: 'string?',
        take_due: 'string?'
    }
};

/**
 * Module exports a class {@link JournalInstance}
 * @type {JournalInstance}
 * @private
 */

module.exports = JournalInstance;