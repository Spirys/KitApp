/*!
 * An implementation of a media instance
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */


/**
 * Model of the document instance. May be used as-is
 * @private
 */

const MediaInstance = {
    name: 'MediaInstance',
    primaryKey: 'id',
    properties: {
        id: 'int',
        status: {type: 'string', indexed: true},
        media: {type: 'linkingObjects', objectType: 'Media', property: 'instances'},
        taker: 'User',
        due_back: 'date?',
        take_due: 'date?'
    }
};

/**
 * Module exports a class {@link MediaInstance}
 * @type {MediaInstance}
 * @private
 */

module.exports = MediaInstance;