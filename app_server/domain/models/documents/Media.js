/*!
 * Copyright (c) 2018 KitApp project
 */

'use strict';

/**
 * A Media model
 */

const Media = {
    name: 'Media',
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: {type: 'string', indexed: true},

        bestseller: {type: 'bool', default: false},

        authors: 'Author[]',
        instances: 'MediaInstance[]',

        cost: 'int?',
        description: 'string?',
        image: 'string?',
        published: 'string?',
        keywords: 'Keyword[]'
    }
};

/**
 * Module exports
 * @public
 */

module.exports = Media;