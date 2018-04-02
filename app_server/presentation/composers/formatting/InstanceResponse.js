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
const config = require("../../../util/config");

/**
 * Constants
 * @private
 */

const defaultFieldsPatron = ['status', 'id', 'renewed'];
const defaultFieldsLibrarian = ['status', 'id', 'due_back', 'take_due', 'taker', 'fine', 'renewed'];

/**
 * Module functions
 * @private
 */

/**
 * Formats an instance
 * @param instance {DocumentInstance|BookInstance|JournalInstance|MediaInstance}
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
                    sel = instance.taker ? {
                        id: instance.taker.id,
                        first_name: instance.taker.first_name,
                        last_name: instance.taker.last_name,
                        type: instance.taker.type
                    } : undefined;
                    break;
                case 'due_back':
                    let due = moment(instance.due_back, config.DATE_FORMAT_EXT);
                    sel = due.isValid() ? due.format(config.DATE_FORMAT_EXT) : undefined;
                    break;
                case 'take_due':
                    let take = moment(instance.take_due, config.DATE_FORMAT_EXT);
                    sel = take.isValid() ? take.format(config.DATE_FORMAT_EXT) : undefined;
                    break;
                case 'fine':
                    sel = instance.taker ? config.fine(instance) : undefined;
                    break;
                case 'renewed':
                    sel = instance.taker ? instance.renewed : undefined;
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