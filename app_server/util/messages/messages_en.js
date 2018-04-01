/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const msg = require('./messages');

/**
 * Module exports. Designed to strictly match error definitions in config file
 * @public
 */

module.exports[msg.errors.INTERNAL] = 'Internal error occurred';
module.exports[msg.errors.ERROR2] = 'Error 2 occurred';
module.exports[msg.errors.ERROR3] = 'Error 3 occurred';
module.exports[msg.errors.WRONG_LOGIN_PASSWORD] = 'Wrong login/password';
module.exports[msg.errors.INVALID_TOKEN] = 'Invalid token';
module.exports[msg.errors.INVALID_ID] = 'Invalid id';
module.exports[msg.errors.DOCUMENT_NOT_FOUND] = 'Requested document not found';
module.exports[msg.errors.DOCUMENT_ALREADY_TAKEN] = 'Requested document is already taken by the user';
module.exports[msg.errors.DOCUMENT_NOT_AVAILABLE] = 'Requested document is not available';
module.exports[msg.errors.DOCUMENT_NOT_TAKEN] = 'Requested document is not taken by the user';
module.exports[msg.errors.USER_NOT_FOUND] = 'User was not found';


// General messages
module.exports[msg.general.PASSWORD] = 'Password';
module.exports[msg.general.LMS_DESCRIPTION_SHORT] = 'Innopolis University Library Management System';

// Login page labels
module.exports[msg.login.LOGIN] = 'Login';
module.exports[msg.login.REMEMBER_ME] = 'Remember me';
module.exports[msg.login.SIGN_IN] = 'Sign In';
module.exports[msg.login.REGISTER] = 'Sign Up';
module.exports[msg.login.FORGOT_PASSWORD] = 'Forgot password';
module.exports[msg.login.ISSUES] = 'Have issues?';

// User interface labels
module.exports[msg.user.DASHBOARD] = 'Dashboard';
module.exports[msg.user.CATALOG] = 'Catalog';
module.exports[msg.user.USER_CARD] = 'User Card';
module.exports[msg.user.DATABASE] = 'Database';
module.exports[msg.user.READERS] = 'Readers';
module.exports[msg.user.LOGOUT] = 'Logout';