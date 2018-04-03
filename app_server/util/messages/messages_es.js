/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const errors = require('./messages').errors;

/**
 * Module exports. Designed to strictly match error definitions in config file
 * @public
 */

module.exports[errors.INTERNAL] = 'Internal error occurred';
module.exports[errors.NO_ACCESS] = 'Error 2 occurred';
module.exports[errors.ERROR3] = 'Error 3 occurred';
module.exports[errors.WRONG_LOGIN_PASSWORD] = 'Wrong login/password';
module.exports[errors.INVALID_TOKEN] = 'Invalid token';
module.exports[errors.DOCUMENT_NOT_FOUND] = 'Requested document not found';
module.exports[errors.DOCUMENT_ALREADY_TAKEN] = 'Requested document is already taken by the user';
module.exports[errors.DOCUMENT_NOT_AVAILABLE] = 'Requested document is not available';
module.exports[errors.DOCUMENT_NOT_TAKEN] = 'Requested document is not taken by the user';
module.exports[errors.USER_NOT_FOUND] = 'User was not found';