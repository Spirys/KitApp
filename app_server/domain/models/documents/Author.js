/*!
 * Author
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 */

const validator = require('../../validation/SetterValidation.js');
const Errors = require('../../Errors');

/**
 * Author model
 */

const Author = {
    name: 'Author',
    primaryKey: 'id',
    properties: {
        id: 'int',

        first_name: {type: 'string', indexed: true},
        last_name: {type: 'string', indexed: true},

        books: {type: 'linkingObjects', objectType: 'Book', property: 'authors'},
        journals: {type: 'linkingObjects', objectType: 'Journal', property: 'issue.editors'},
        articles: {type: 'linkingObjects', objectType: 'Article', property: 'authors'},
        media: {type: 'linkingObjects', objectType: 'Media', property: 'authors'},

        middle_name: 'string?',
        birth_date: 'string?',
        death_date: 'string?'
    }
};
// greek question mark
// happy debugging!
// ;

module.exports = Author;