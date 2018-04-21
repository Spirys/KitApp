/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const moment = require('moment');

/**
 * Module functions
 * @private
 */

/**
 * Checks whether the value corresponds to the rule
 * @param value What to check
 * @param rule {String|function} The rule, one of the following:
 * <ul>
 *     <li>function — a function returning boolean value, checks the correspondence itself</li>
 *     <li>'NES' — non-empty string</li>
 *     <li>'NESArray' — array, all elements are non-empty strings</li>
 *     <li>'NESArray' — array with length 1+, all elements are non-empty strings</li>
 *     <li>'number' — integer number starting from 0</li>
 *     <li>'number+' — integer number greater than 0</li>
 *     <li>'DATE' — NES in format 'DD-MM-YYYY' or 'MM-YYYY' or 'YYYY'</li>
 *     <li>'boolean' — boolean value</li>
 * </ul>
 * To make value optional (i.e. allow <code>undefined</code> and <code>null</code>),
 *  `?` is inserted after the rule.
 * @return {boolean}
 */

function validate(value, rule) {
    if (typeof rule === 'function') {
        return rule(value)
    }

    switch (rule) {
        case 'NES': return typeof value === 'string' && value.length > 0;
        case 'NESArray': return Array.isArray(value) && value.every(x => validate(x, 'NES'));
        case 'NESArray+': return Array.isArray(value) && value.length && value.every(x => validate(x, 'NES'));
        case 'number': return isInteger(value) && value >= 0;
        case 'number+': return isInteger(value) && value > 0;
        case 'DATE': return moment(value, ['YYYY', 'MM-YYYY', 'DD-MM-YYYY'], true).isValid();
        case 'boolean': return typeof value === 'boolean';

        case 'NES?': return typeof value === 'undefined' || value == null || validate(value, 'NES');
        case 'NESArray?': return typeof value === 'undefined' || value == null || validate(value, 'NESArray');
        case 'number?': return typeof value === 'undefined' || value == null || validate(value, 'number');
        case 'number+?': return typeof value === 'undefined' || value == null || validate(value, 'number+');
        // case 'DATE?': return typeof value === 'undefined' || value == null || validate(value, 'DATE');
        case 'boolean?': return typeof value === 'undefined' || value == null || validate(value, 'boolean');

        default: return false
    }
}

/**
 * Checks whether the value provided is an integer number
 * @param nVal
 * @return {boolean}
 */

function isInteger (nVal) {
    return typeof nVal === 'number'
        && isFinite(nVal)
        && nVal > -9007199254740992
        && nVal < 9007199254740992
        && Math.floor(nVal) === nVal;
}

/**
 * Filters and validates the input fields of the book
 * @param query
 * @param rules
 */

function filterFields(query, rules) {

}

/**
 * Module exports
 * @public
 */

module.exports.stringOrDefault = (s, defaultValue) =>
    s && typeof s === 'string'
        ? s
        : defaultValue;

module.exports.number = (value) => {
    let result = parseInt(value);
    return (!Number.isNaN(result) && (result >= 0))? result : false
};

module.exports.numberOrDefault = (number, defaultValue, isPositive) =>
    number && typeof number === 'number'
    && !(isPositive && number < 0)
        ? number
        : defaultValue;

/**
 * Checks whether the fields correspond to given rules
 * @param fields {*} The actual fields to validate. For example, <code>{prop1: 1, prop2: 'two'}</code>
 * @param rules {*} The rules. For example, <code>{prop1: 'number+', prop2: 'NES'}</code>
 * @return {*}
 */

module.exports.validate = function (fields, rules) {
    let wrong = [];

    for (let field in fields) {
        if (fields.hasOwnProperty(field) && !validate(fields[field], rules[field]))
            wrong.push(field)
    }

    return wrong.length > 0 ? wrong : true
};

module.exports.filterFields = filterFields;