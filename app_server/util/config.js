/*!
 * Configuration file
 * Copyright (c) 2018 KitApp project
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const MESSAGES = require('./messages/messages');
const cns = require('./constants');
const functions = require('./functions');

/**
 * Module exports
 * @public
 */

/**
 * Universal messages and constants
 * @type {{okCode: string, errorCode: string, errors: {INTERNAL: string, ERROR2: string, ERROR3: string, WRONG_LOGIN_PASSWORD: string, INVALID_TOKEN: string, INVALID_ID: string, DOCUMENT_NOT_FOUND: string, DOCUMENT_ALREADY_TAKEN: string, DOCUMENT_NOT_AVAILABLE: string, DOCUMENT_NOT_TAKEN: string, USER_NOT_FOUND: string}, general: {PASSWORD: string, LMS_DESCRIPTION_SHORT: string}, login: {LOGIN: string, REMEMBER_ME: string, SIGN_IN: string, REGISTER: string, FORGOT_PASSWORD: string, ISSUES: string}, user: {DASHBOARD: string, CATALOG: string, USER_CARD: string, DATABASE: string, READERS: string, LOGOUT: string}} & {NEWCNS: Array<String>}}
 * @public
 */
module.exports = Object.assign({}, MESSAGES, cns);

module.exports.statuses = {
    AVAILABLE: 'Available',
    LOANED: 'Loaned',
    MAINTENANCE: 'Maintenance',
    REFERENCE: 'Reference',
    RESERVED: 'Reserved'
};

module.exports.userTypes = {
    STUDENT: 'Student',
    FACULTY: 'Faculty', // Deprecated
    VISITING_PROFESSOR: 'Visiting professor',
    FACULTY_TA: 'Teaching assistant',
    FACULTY_INSTRUCTOR: 'Instructor',
    FACULTY_PROFESSOR: 'Professor',
    LIBRARIAN: 'Librarian', // Deprecated
    LIBRARIAN_1: 'Jr librarian',
    LIBRARIAN_2: 'Middle librarian',
    LIBRARIAN_3: 'Senior librarian',
    ADMIN: 'Admin'
};

/**
 * Calculates fine for a document
 * @param instance
 * @return {number}
 */

module.exports.fine = functions.fine;

/**
 * Gets the locale from the request
 * @return {string}
 * @public
 */

module.exports.getLocale = functions.getLocale;

/**
 * Provides messages by locales. By default all messages are in 'EN' locale
 * @param locale {string} Code of the locale in ISO 639-1 format
 * @return {MESSAGES}
 */

module.exports.messages = functions.messages;

/**
 * Database connection address
 * @public
 */

// module.exports.realm = {
//     url: 'kitapp-dev.us1a.cloud.realm.io',
//     apiToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSZWFsbSIsIk5vdGlmaWVyIjp0cnVlLCJTeW5jIjp0cnVlLCJpYXQiOjE1MTI2NTY3Nzh9.iKhiNXtCT5HtEZc0SKlNnZOaCU8XSpbVYCyGm6RKgw3_tQogN5Ln5oG7bfFTBNJKi0zbjKVJcFGtBhxus27BWYgdVUTH_AHswfEY4BuaRKWK1dvUPn1mx7Fp7lQHnCPwp_nvhaqDAu5h7k3w2qIrbZfojAFhOHip_TbYHN4sI_EE7xO97IXv3Ya7bbKUZnuI_W1qWrQHw3pGH8TNyRTDaqS-xk7ko-S7iNm4HLTrt9562gbMItB_yHC2_7w7jOqd8ZRxPhpehEb6sWbQxyOFzOreClmC1JB_9mYlFmb1QsgqhY-VIKvdpUca98h_0zsEcyaVqGYalpbqb6Un7vAQ6w',
//     user: 'dev',
//     password: '12346',
// };