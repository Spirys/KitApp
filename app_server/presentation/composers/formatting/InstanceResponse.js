/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

const moment = require('moment');

/**
 * Module dependencies
 * @private
 */

const error = require('./ErrorResponse');

/**
 * Constants
 * @private
 */

const defaultFieldsPatron = ['status', 'id'];
const defaultFieldsLibrarian = ['status', 'id', 'due_back', 'taker'];

/**
 * Module functions
 * @private
 */

/**
 * Formats an instance
 * @param instance {DocumentInstance}
 * @param fields {Array<string>}
 * @param librarian The boolean value indicating whether document must include librarian-only fields
 * @return {*}
 */

function format(instance, librarian, fields) {

    const defaultFields = (librarian)
        ? defaultFieldsLibrarian
        : defaultFieldsPatron;

    if (!fields) fields = defaultFields;

    const response = {};
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (defaultFields.includes(field)) {
            let sel;

            switch (field) {
                case 'taker':
                    sel = instance.taker;
                    break;
                case 'due_back':
                    let due = moment(instance.dueBack);
                    sel = due.isValid()? due.format('DD-MM-YYYY') : undefined;
                    break;
                case 'take_due':
                    let take = moment(instance.takeDue);
                    sel = take.isValid()? take.format('DD-MM-YYYY') : undefined;
                    break;
                default:
                    sel = instance[field];
            }

            if (typeof sel !== 'undefined' && sel !== null) response[field] = sel;
        }
    }
    return response
}

/**
 * Module exports
 * @public
 */

module.exports.format = function (instance, librarianAccess, fields, locale, err) {
    return (err)
        ? error(err, locale)
        : format(instance, librarianAccess, fields)
};

module.exports.formatMultiple = function (instances, librarianAccess, fields, locale, err) {
    if (err) return error(err, locale);

    if (!fields) fields = (librarianAccess) ? defaultFieldsLibrarian : defaultFieldsPatron;

    let response = new Array(instances.length);

    for (let i = 0; i < instances.length; i++) {
        response[i] = format(instances[i], librarianAccess, fields)
    }

    return response
};