/*!
 * Validation for setter methods
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * @return {boolean}
 */
function STRING_VALIDATION (s) {
    return !!(s && typeof s === 'string');
}

// TODO Write author validation

/**
 *
 * @type {STRING_VALIDATION}
 */

module.exports.validateString = STRING_VALIDATION;