/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../util/config');

/**
 * Module functions
 * @private
 */

function error(err, locale) {
    return {
        code: config.errorCode,
        message: config.messages(locale)[err]
    }
}

/**
 * Module exports
 * @public
 */

module.exports.format = function (data, locale, err) {
    if (err) {
        return error(err, locale)
    } else {
        return {
            code: config.okCode,
            response: data
        }
    }
};

module.exports.error = error;