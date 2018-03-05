/**
 * Response composer. Builds the JSON response for the client.
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const BookResponseComposer = require('./formatting/BookResponse');
const UserResponseComposer = require('./formatting/UserResponse');
const AuthResponseComposer = require('./formatting/AuthResponse');
const AuthorsResponseComposer = require('./formatting/AuthorsResponse');
const ErrorResponseComposer = require('./formatting/ErrorResponse');

/**
 * Module exports
 * @public
 */

/**
 * Gets the needed response composer
 * @param type Specifies the response composer
 */
module.exports = {
    book:  BookResponseComposer,
    user:  UserResponseComposer,
    auth:  AuthResponseComposer,
    author: AuthorsResponseComposer,
    error: ErrorResponseComposer
};