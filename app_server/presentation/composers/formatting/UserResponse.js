/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../../util/config');
const defaultFields = config.DEFAULT_USER_RESPONSE_FIELDS;
const error = require('./ErrorResponse');

/**
 * Module functions
 * @private
 */

function format(user, librarianAccess, fields, locale, err) {
    if (err) {
        return error(err, locale)
    }

    const response = {};
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (defaultFields.includes(field)) {
            let sel;
            switch (field){
                case 'name':
                    response.first_name = user.firstName;
                    response.last_name = user.lastName;
                    continue;
                case 'birth_date':
                    response.birth_date = user.birthDate;
                    break;

            }
            sel = user[field];

            if (typeof sel !== 'undefined' || sel != null) response[field] = sel;
        }
    }
    return response
}

function formatMultiple(users, librarianAccess, fields, page, length, locale, err) {

}

/**
 * Module exports
 * @public
 */

module.exports.format = format;