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
        journal: {type: 'linkedObjects', objectType: 'Journal', property: 'instances'},
        taker: {type: 'linkedObjects', objectType: 'User', property: 'journals'},
        due_back: 'date?',
        take_due: 'date?'
    }
};

/**
 * Module exports a class {@link JournalInstance}
 * @type {JournalInstance}
 * @private
 */

module.exports = JournalInstance;