/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module exports
 * @public
 */

/**
 * Universal messages
 * @public
 */
module.exports = {
    okCode: 'ok',
    errorCode: 'error',
    errors: {
        'INTERNAL' : 'INT',
        'ERROR2' : 'ERR2', // Reserved errors
        'ERROR3' : 'ERR3',
        'WRONG_LOGIN_PASSWORD' : 'WLP',
        'INVALID_TOKEN' : 'INV_TOK',
        'INVALID_ID': 'INVALID_ID',
        'DOCUMENT_NOT_FOUND' : 'DNF',
        'DOCUMENT_ALREADY_TAKEN' : 'DAT',
        'DOCUMENT_NOT_AVAILABLE' : 'DNA',
        'DOCUMENT_NOT_TAKEN' : 'DNT',
        'DOCUMENT_ALREADY_RENEWED' : 'DAR',
        'USER_NOT_FOUND' : 'UNF',
    },
    general: {
        'PASSWORD': 'PASSWORD',
        'LMS_DESCRIPTION_SHORT': 'LMS_DESCRIPTION_SHORT',
    },
    login: {
        'LOGIN': 'LOGIN',
        'REMEMBER_ME': 'REMEMBER_ME',
        'SIGN_IN': 'SIGN_IN',
        'REGISTER': 'REGISTER',
        'FORGOT_PASSWORD': 'FORGOT_PASSWORD',
        'ISSUES': 'ISSUES',
    },
    user: {
        'DASHBOARD': 'DASHBOARD',
        'CATALOG': 'CATALOG',
        'USER_CARD': 'USER_CARD',
        'DATABASE': 'DATABASE',
        'READERS': 'READERS',
        'LOGOUT': 'LOGOUT'
    }
};