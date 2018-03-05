/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const error = require('./ErrorResponse');
const defaultFields = require('../../../util/config').DEFAULT_AUTHOR_RESPONSE_FIELDS;

/**
 * Module functions
 * @private
 */

/**
 * Formats the author to match API definition
 * @param author {Author}
 * @param fields {Array<string>}
 */

function format(author, fields) {
    let response = {};

    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (defaultFields.includes(field)) {
            let sel;
            switch (field) {
                case 'name':
                    response.first_name = author.firstName;
                    response.last_name = author.lastName;
                    continue;
                case 'birth_date': sel = author.birthDate; break;
                case 'death_date': sel = author.deathDate; break;
                default: sel = author[field];
            }

            if (typeof sel !== 'undefined') response[field] = sel;
        }
    }

    return response
}

/**
 * Module exports
 * @public
 */

module.exports.format = function (author, fields, locale, err) {
    return (err) ? error(err, locale) : format(author, fields || defaultFields)
};

module.exports.formatMultiple = function (authors, fields, locale, err) {
    if (err) return error(err, locale);

    if (!fields) fields = defaultFields;

    let response = new Array(authors.length);

    for (let i = 0; i < authors.length; i++) {
        response[i] = format(authors[i], fields)
    }

    return response
};