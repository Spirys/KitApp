/*!
 * A basic implementation of a document instance
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const validator = require('../../validation/SetterValidation');
const BookInstance = require('./DocumentInstances/BookInstance');
const JournalInstance = require('./DocumentInstances/JournalInstance');
const MediaInstance = require('./DocumentInstances/MediaInstance');


/**
 * Module exports a class {@link DocumentInstance}
 * @type {DocumentInstance}
 * @private
 */

module.exports = {
    book: BookInstance,
    journal: JournalInstance,
    media: MediaInstance
};