/*!
 * Validation for setter methods
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const moment = require('moment');

/**
 * @return {boolean}
 * @private
 */
function stringValidation (s) {
    return !!(s && typeof s === 'string');
}

/**
 * Checks whether a string passed corresponds to the format DD-MM-YYYY
 * @param date {String}
 * @private
 */

function validateDate(date) {
    return moment(date, 'DD-MM-YYYY').isValid();
    // return (/^\d{2}-\d{2}-\d{4}$/.test(date))
}

function validateYear(year) {
    return moment(date, 'YYYY').isValid();
}

// TODO Write author validation

/**
 *
 * @type {function}
 */

module.exports.validateString = stringValidation;
module.exports.validateDate = validateDate;
module.exports.validateYear = validateYear;