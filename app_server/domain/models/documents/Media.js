/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const DocumentParent = require('./Document');
const Errors = require('../../Errors');
const validator = require('../../validation/SetterValidation');

/**
 * A Media model
 */

const Media = {
    name: 'Media',
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: {type: 'string', indexed: true},

        bestseller: {type: 'bool', default: false},

        authors: 'Author[]',
        instances: 'MediaInstance[]',

        cost: 'int?',
        description: 'string?',
        image: 'string?',
        published: 'string?',
        keywords: 'string?[]'
    }
};

/**
 * Module exports
 * @public
 */

module.exports = Media;