/*
 * Module creates the error response in JSON
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../../util/config');

/**
 * Module exports
 * @public
 */

module.exports = function (err, locale) {
    return {
        code: config.errorCode,
        message: config.messages(locale)[err]
    }
};