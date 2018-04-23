/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../../util/config');
const defaultFields = config.DEFAULT_BOOK_RESPONSE_FIELDS;
const error = require('./ErrorResponse');
const authorsFormatter = require('./AuthorsResponse');
const instancesFormatter = require('./InstanceResponse');

/**
 * Module functions
 * @private
 */

/**
 * Formats the single book
 * @param book {Book}
 * @param librarianAccess
 * @param fields {Array<string>}
 * @param locale {string=}
 * @param err {string=}
 * @param user {User=} The user. If sent, available actions would be added
 * @return {*}
 */

function format(book, librarianAccess, fields, locale, err, user) {
    if (err) {
        return error(err, locale)
    }

    const response = {};
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (defaultFields.includes(field)) {
            let sel;

            switch (field) {
                case 'image': sel = book.image || config.DEFAULT_DOCUMENT_IMAGE; break;
                case 'authors':
                    sel = authorsFormatter.formatMultiple(book.authors);
                    break;
                case 'instances':
                    if (!librarianAccess) {
                        if (user) {
                            let renewed = false, taken = false, canQueue = false;
                            for (let i of book.instances) {
                                if (i.status !== config.statuses.MAINTENANCE && i.status !== config.statuses.RESERVED)
                                    response[i.status] = (response[i.status] || 0) + 1;
                                if (!taken && i.taker && i.taker.id === user.id) {
                                    taken = true;
                                    renewed = i.renewed;
                                }
                                canQueue = canQueue || (i.status !== config.statuses.MAINTENANCE && i.status !== config.statuses.REFERENCE);
                            }

                            // Generating possible action to apply
                            canQueue = !book.outstanding_request && canQueue;
                            response.action = (renewed)
                                ? (user.type === config.userTypes.VISITING_PROFESSOR)
                                    ? config.actions.RENEW_DOCUMENT
                                    : config.actions.DOCUMENT_TAKEN
                                : (taken)
                                    ? config.actions.RENEW_DOCUMENT
                                    : response[config.statuses.AVAILABLE]
                                        ? config.actions.RESERVE_DOCUMENT
                                        : canQueue
                                            ? config.actions.QUEUE_DOCUMENT
                                            : config.actions.NO_ACTION;

                            response.action_msg = config.messages(locale)[response.action];
                        } else {
                            for (let i of book.instances) {
                                response[i.status] = (response[i.status] || 0) + 1
                            }
                        }
                        sel = null;
                    }
                    else sel = instancesFormatter.formatMultiple(book.instances, librarianAccess);
                    break;
                case 'keywords':
                    sel = [];
                    for (let i of book.keywords) sel.push(i.key);
                    break;
                case 'awaiting':
                    sel = book.awaiting.length;
                    break;
                default: sel = book[field];
            }

            if (typeof sel !== 'undefined' && sel !== null) response[field] = sel;
        }
    }
    return response
}

function formatMultiple(books, librarianAccess, fields, page, length, locale, err, user) {
    if (err) {
        return error(err, locale)
    }

    fields = fields || defaultFields;

    let response = {
        page,
        length: books.length,
        books: []
    };

    for (let i = 0; i < books.length; i++) {
        response.books.push(format(books[i], librarianAccess, fields, locale, '', user))
    }

    return response
}

/**
 * Module exports
 * @public
 */

module.exports.format = format;
module.exports.formatMultiple = formatMultiple;