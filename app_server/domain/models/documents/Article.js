/*!
 * Article
 * Copyright(c) 2018 KitApp project
 */

'use strict';

/**
 * An article model
 */

const Article = {
    name: 'Article',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: {type: 'string', indexed: true},
        publisher: {type: 'string', indexed: true},
        authors: 'Author[]'
    }
};

module.exports = Article;