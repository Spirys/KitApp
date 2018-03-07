/*
 * Copyright (c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const config = require('../../../util/config');
const defaultFields = config.DEFAULT_MEDIA_RESPONSE_FIELDS;
const error = require('./ErrorResponse');
const authorsFormatter = require('./AuthorsResponse');
const instancesFormatter = require('./InstanceResponse');

/**
 * Module functions
 * @private
 */


/**
 * Formats the single media
 * @param media {Media}
 * @param librarianAccess
 * @param fields {Array<string>}
 * @param locale {string=}
 * @param err {string=}
 * @return {*}
 */

function format(media, librarianAccess, fields, locale, err) {
    if (err) {
        return error(err, locale)
    }

    const response = {};
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (defaultFields.includes(field)) {
            let sel;

            switch (field) {
                case 'bestseller': sel = media.isBestseller; break;
                case 'authors':
                    sel = authorsFormatter.formatMultiple(media.authors);
                    break;
                case 'instances':
                    sel = instancesFormatter.formatMultiple(media.instances, librarianAccess);
                    break;
                default: sel = media[field];
            }

            if (typeof sel !== 'undefined') response[field] = sel;
        }
    }
    return response
}

function formatMultiple(media, librarianAccess, fields, page, length, locale, err) {
    if (err) {
        return error(err, locale)
    }

    let response = {
        page,
        length: media.length,
        medias: []
    };

    for (let i = 0; i < media.length; i++) {
        response.medias.push(format(media[i], librarianAccess, fields))
    }

    return response
}

/**
 * Module exports
 * @public
 */

module.exports.format = format;
module.exports.formatMultiple = formatMultiple;