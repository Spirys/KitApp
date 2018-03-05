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
    return locale && locale.toLowerCase
        ? (locale.toLowerCase() === 'ru') ? MESSAGES_RU : MESSAGES_EN
        : MESSAGES_EN
};

/**
 * Gets the locale from the request
 * @return {string}
 * @public
 */

module.exports.getLocale = function (req) {
    return req.cookies.locale;
};

/**
 * Specific parameters
 * @public
 */

module.exports.COOKIE_NAME = '_sessionId';
module.exports.COOKIE_HTTPS_ONLY = true;

module.exports.DEFAULT_DOCS_NUMBER = 25;
module.exports.DEFAULT_BOOK_REQ_FIELDS = ['title', 'authors', 'cost', 'edition', 'id', 'publisher', 'isbn', 'keywords', 'description', 'available', 'loaned', 'reference'];
module.exports.DEFAULT_BOOK_RESPONSE_FIELDS = ['id', 'authors', 'bestseller', 'cost', 'image', 'instances', 'title', 'edition', 'publisher', 'keywords'];
module.exports.DEFAULT_AUTHOR_RESPONSE_FIELDS = ['id', 'name', 'birth_date', 'death_date'];

module.exports.DEFAULT_CHECKOUT_TIME_STUDENT_NOT_BESTSELLER = 3 * 7 * 24 * 60 * 60 * 1000;
module.exports.DEFAULT_CHECKOUT_TIME_STUDENT_BESTSELLER = 2 * 7 * 24 * 60 * 60 * 1000;
module.exports.DEFAULT_CHECKOUT_TIME_FACULTY = 4 * 7 * 24 * 60 * 60 * 1000;

// module.exports.mongoURI = 'mongodb://dev:12346@ds012058.mlab.com:12058/kitapp-tests';
module.exports.mongoURI = 'mongodb://innoproject:YASFbay5kpjQ@ds046677.mlab.com:46677/kitapp';