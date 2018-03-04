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

module.exports[errors.ERROR1] = 'Error 1 occurred';
module.exports[errors.ERROR2] = 'Error 2 occurred';
module.exports[errors.ERROR3] = 'Error 3 occurred';
module.exports[errors.WRONG_LOGIN_PASSWORD] = 'Wrong login/password';