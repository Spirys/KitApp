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
const MESSAGES_DE = require('./messages/messages_de');
const MESSAGES_ES = require('./messages/messages_es');
const MESSAGES_FR = require('./messages/messages_fr');
const MESSAGES_IT = require('./messages/messages_it');
const MESSAGES_JA = require('./messages/messages_ja');
const MESSAGES_KO = require('./messages/messages_ko');
const MESSAGES_PT = require('./messages/messages_pt');
const MESSAGES_ZH = require('./messages/messages_zh');

/**
 * Module utilities
 * @private
 */

const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;

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
    if (locale && locale.toLowerCase) {
        switch(locale.toLowerCase()) {
            case 'ru': return MESSAGES_RU;
            case 'de': return MESSAGES_DE;
            case 'es': return MESSAGES_ES;
            case 'fr': return MESSAGES_FR;
            case 'it': return MESSAGES_IT;
            case 'ja': return MESSAGES_JA;
            case 'ko': return MESSAGES_KO;
            case 'pt': return MESSAGES_PT;
            case 'zh': return MESSAGES_ZH;
            default: return MESSAGES_EN;
        }
    } else return MESSAGES_EN;
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

// Security concerns
module.exports.COOKIE_NAME = '_sessionId';
module.exports.COOKIE_HTTPS_ONLY = false; // todo change when in production!
module.exports.COOKIE_EXPIRES = WEEK;

/**
 * Business logic parameters
 * @public
 */

module.exports.DOCUMENT_RESERVATION_TIME = 3 * DAY;
module.exports.CHECKOUT_TIME_STUDENT_NOT_BESTSELLER = 3 * WEEK;
module.exports.CHECKOUT_TIME_STUDENT_BESTSELLER = 2 * WEEK;
module.exports.CHECKOUT_TIME_FACULTY = 4 * WEEK;

module.exports.statuses = {
    AVAILABLE: 'Available',
    LOANED: 'Loaned',
    MAINTENANCE: 'Maintenance',
    REFERENCE: 'Reference',
    RESERVED: 'Reserved'
};

module.exports.userTypes = {
    STUDENT: 'Student',
    FACULTY: 'Faculty',
    LIBRARIAN: 'Librarian'
};

/**
 * API parameters
 * @public
 */

module.exports.DEFAULT_DOCS_NUMBER = 25;
module.exports.DEFAULT_USERS_NUMBER = 25;
module.exports.DEFAULT_BOOK_REQ_FIELDS = ['title', 'authors', 'cost', 'edition', 'id', 'publisher', 'isbn', 'keywords', 'description', 'available', 'loaned', 'reference'];
module.exports.DEFAULT_BOOK_RESPONSE_FIELDS = ['id', 'authors', 'bestseller', 'cost', 'image', 'instances', 'title', 'edition', 'publisher', 'keywords', 'isbn'];
module.exports.DEFAULT_AUTHOR_RESPONSE_FIELDS = ['id', 'first_name', 'last_name', 'birth_date', 'death_date'];
module.exports.DEFAULT_MEDIA_RESPONSE_FIELDS = ['title', 'authors', 'cost', 'id', 'keywords', 'description', 'available', 'loaned', 'reference'];
// TODO: add some privacy
module.exports.DEFAULT_USER_RESPONSE_FIELDS = ['name', 'id', 'type', 'birth_date', 'email', 'occupation', 'address', 'about', 'telegram', 'avatar', 'phone'];

/**
 * Database connection address
 * @public
 */

module.exports.realm = {
    url: 'kitapp-dev.us1a.cloud.realm.io',
    // for what? IDK
    apiToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSZWFsbSIsIk5vdGlmaWVyIjp0cnVlLCJTeW5jIjp0cnVlLCJpYXQiOjE1MTI2NTY3Nzh9.iKhiNXtCT5HtEZc0SKlNnZOaCU8XSpbVYCyGm6RKgw3_tQogN5Ln5oG7bfFTBNJKi0zbjKVJcFGtBhxus27BWYgdVUTH_AHswfEY4BuaRKWK1dvUPn1mx7Fp7lQHnCPwp_nvhaqDAu5h7k3w2qIrbZfojAFhOHip_TbYHN4sI_EE7xO97IXv3Ya7bbKUZnuI_W1qWrQHw3pGH8TNyRTDaqS-xk7ko-S7iNm4HLTrt9562gbMItB_yHC2_7w7jOqd8ZRxPhpehEb6sWbQxyOFzOreClmC1JB_9mYlFmb1QsgqhY-VIKvdpUca98h_0zsEcyaVqGYalpbqb6Un7vAQ6w',
    // one way to log in
    user: 'dev',
    password: '12346',
    // another way
    userToken: ''
};
// module.exports.mongoURI = 'mongodb://dev:MLiF58v31DuOB6mRpJ2lNh9PY@ds046667.mlab.com:46667/kitapp-dev';
// module.exports.mongoURI = 'mongodb://dev:12346@ds012058.mlab.com:12058/kitapp-tests';
// module.exports.mongoURI = 'mongodb://innoproject:YASFbay5kpjQ@ds046677.mlab.com:46677/kitapp';
