/*!
 * Article
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const Errors = require('../../Errors');
const validator = require('../../validation/SetterValidation.js');

/**
 * An article model
 */

const Article = {
    name: 'Article',
    primaryKey: 'id',
    properties: {
        id: 'int',

        name: {type: 'string', indexed: true},
        publisher: {type: 'string', indexed: true},

        authors: 'Author[]'
    }
};

/**
 * Module exports an {@link Article} class
 * @type {Article}
 */

module.exports = Article;