/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const MESSAGES = require('./messages/messages');
const MESSAGES_RU = require('./messages/messages_ru');
const MESSAGES_EN = require('./messages/messages_en');

/**
 * Module exports
 * @public
 */

/**
 * Universal messages
 * @public
 */
module.exports = MESSAGES;

/**
 * Provides messages by locales. By default all messages are in 'EN' locale
 * @param locale {string} Code of the locale in ISO 639-1 format
 * @return {*}
 */

module.exports.messages = function (locale) {
    return (locale.toLowerCase() === 'ru') ? MESSAGES_RU : MESSAGES_EN
};

/**
 * Specific parameters
 */
module.exports.COOKIE_NAME = '_sessionId';
module.exports.COOKIE_HTTPS_ONLY = true;

module.exports.DEFAULT_DOCS_NUMBER = 25;
module.exports.DEFAULT_BOOK_FIELDS = ['title', 'authors', 'cost', 'edition', 'id', 'publisher', 'isbn', 'keywords', 'description', 'available', 'loaned', 'reference'];

module.exports.mongoURI = 'mongodb://innoproject:YASFbay5kpjQ@ds046677.mlab.com:46677/kitapp';