/*
 * Copyright (c) 2018 KitApp project
 * Author: Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */


/**
 * Module exports
 * @public
 */

module.exports.book = {
    title: 'NES',
    authors: 'NESArray+',
    cost: 'number',
    edition: 'NES',
    publisher: 'NES',
    published: 'DATE',

    keywords: 'NESArray',

    bestseller: 'boolean?',
    description: 'NES?',

    available: 'number+?',

    reference: 'number?',
    maintenance: 'number?',
    isbn: (value) => {
        return typeof value === 'undefined'
            || value == null
            || (typeof value === 'number' // number
                && isFinite(value) // not NaN
                && value > -9007199254740992 // within range
                && value < 9007199254740992
                && Math.floor(value) === value // integer check
                && (value >= Math.pow(10, 9) && value < Math.pow(10, 10) // 10 digits
                    || value >= Math.pow(10, 12) && value < Math.pow(10, 13))) // 13 digits
    },
    image: (value) => {
        return typeof value === 'undefined'
            || value == null
            || (typeof value === 'string'
                && value.length > 0
                && value.startsWith('https://'))
    }
};