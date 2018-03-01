/**
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const BookResponseComposer = require('./BookResponse');
const UserResponseComposer = require('./UserResponse');
const AuthResponseComposer = require('./AuthResponse');

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
    auth:  AuthResponseComposer
};