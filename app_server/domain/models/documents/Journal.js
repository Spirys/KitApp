/*!
 * Journal
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const JournalInstance = require('./DocumentInstance').journal;
const Errors = require('../../Errors');

/**
 * A journal model
 */

const Journal = {
    name: 'Journal',
    primaryKey: 'id',
    properties: {
        id: 'int',

        title: {type: 'string', indexed: true},
        publisher: {type: 'string', indexed: true},

        bestseller: {type: 'bool', default: false},

        issue: {
            editors: 'Author[]',
            date: 'string'
        },
        instances: 'JournalInstances[]',
        articles: 'Article[]',

        cost: 'int?',
        issn: 'string?',
        description: 'string?',
        image: 'string?',
        keywords: 'string?[]'
    }
};

/**
 * Module exports a {@link Journal} class
 * @type {Journal}
 */

module.exports = Journal;