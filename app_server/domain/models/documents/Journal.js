/*!
 * Journal
 * Copyright(c) 2018 KitApp project
 */

'use strict';

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

        issue_editors: 'Author[]',
        issue_date: 'string',
        instances: 'JournalInstance[]',
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