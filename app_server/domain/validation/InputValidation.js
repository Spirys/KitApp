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
 * @param rule {String} The rule, one of the following:
 * <ul>
 *     <li>'NES' — non-empty string</li>
 *     <li>'NESArray' — array, all elements are non-empty strings</li>
 *     <li>'number' — integer number starting from 0</li>
 *     <li>'number+' — integer number greater than 0</li>
 *     <li>'DATE' — NES in format 'DD-MM-YYYY' or 'MM-YYYY' or 'YYYY'</li>
 *     <li>'boolean' — boolean value</li>
 * </ul>
 * @return {boolean}
 */

function validate(value, rule) {
    switch (rule) {
        case 'NES': return typeof value === 'string' && value.length > 0;
        case 'NESArray': return Array.isArray(value) && value.all(x => validate(x, 'NES'));
        case 'number': return isInteger(value) && value >= 0;
        case 'number+': return isInteger(value) && value > 0;
        case 'DATE': return moment(value, 'DD-MM-YYYY').isValid();
        case 'boolean': return typeof value === "boolean";
        // case 'NES?': return typeof value === 'undefined' || value == null || typeof value === 'string' && value.length > 0 ;
        // case 'NESArray?': return true;
        // case 'number?': return typeof value === 'undefined' || value == null || isInteger(value) && value >= 0;
        // case 'number+?': return typeof value === 'undefined' || value == null || isInteger(value) && value > 0;
        // case 'DATE?': return typeof value === 'undefined' || value == null || moment(value, 'DD-MM-YYYY').isValid();
    }
}

function isInteger (nVal) {
    return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
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

module.exports.validate = function (fields, rules) {
    let wrong = [];

    for (let field in fields) {
        if (fields.hasOwnProperty(field) && !validate(fields[field], rules[field]))
            wrong.push(field)
    }

    return wrong.length > 0 ? wrong : true
};