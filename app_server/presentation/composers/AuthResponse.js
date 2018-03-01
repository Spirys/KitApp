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
 * Module exports
 * @public
 */

module.exports.format = function (data, locale, err) {
    if (err) {
        return {
            code: config.errorCode,
            message: config.messages(locale)[err]
        }
    } else {
        return {
            code: config.okCode,
            response: {
                user: data.userId
            }
        }
    }
};