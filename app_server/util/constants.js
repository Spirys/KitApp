/*!
 * Constants. Does not have dependencies.
 * Copyright (c) 2018 KitApp project
 */

'use strict';

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
 * Business logic parameters
 * @public
 */

module.exports.DOCUMENT_RESERVATION_TIME = 3 * DAY;
module.exports.CHECKOUT_TIME_STUDENT_NOT_BESTSELLER = 3 * WEEK;
module.exports.CHECKOUT_TIME_STUDENT_BESTSELLER = 2 * WEEK;
module.exports.CHECKOUT_TIME_FACULTY = 4 * WEEK;
module.exports.FINE_FOR_DELAY = 100;

/**
 * Short date format ('DD-MM-YYYY')
 * @type {string}
 */
module.exports.DATE_FORMAT = 'DD-MM-YYYY';

/**
 * Extended date format ('DD-MM-YYYY HH:mm')
 * @type {string}
 */
module.exports.DATE_FORMAT_EXT = 'DD-MM-YYYY HH:mm';

/**
 * Front-end parameters
 * @public
 */

module.exports.DEFAULT_USER_IMAGE = '/images/user-no-image.jpg';
module.exports.DEFAULT_DOCUMENT_IMAGE = '/images/document-no-image.png';

/**
 * API parameters
 * @public
 */

module.exports.DEFAULT_DOCS_NUMBER = 25;
module.exports.DEFAULT_USERS_NUMBER = 25;
module.exports.DEFAULT_BOOK_REQ_FIELDS = ['title', 'authors', 'cost', 'edition', 'id', 'publisher', 'isbn', 'keywords', 'description', 'available', 'loaned', 'reference'];
module.exports.DEFAULT_BOOK_RESPONSE_FIELDS = ['id', 'authors', 'bestseller', 'cost', 'image', 'instances', 'title', 'edition', 'publisher', 'keywords', 'isbn', 'description', 'awaiting'];
module.exports.DEFAULT_AUTHOR_RESPONSE_FIELDS = ['id', 'first_name', 'last_name', 'birth_date', 'death_date'];
module.exports.DEFAULT_MEDIA_RESPONSE_FIELDS = ['title', 'authors', 'cost', 'id', 'keywords', 'description', 'available', 'loaned', 'reference'];
// TODO: add some privacy
module.exports.DEFAULT_USER_RESPONSE_FIELDS = ['name', 'id', 'type', 'birth_date', 'email', 'occupation', 'address', 'about', 'telegram', 'avatar', 'phone'];

/**
 * Security concerns
 * @public
 */

module.exports.COOKIE_NAME = '_sessionId';
module.exports.COOKIE_HTTPS_ONLY = true; // todo change when in production!
module.exports.COOKIE_EXPIRES = WEEK;