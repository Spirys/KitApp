/*!
 * Article
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const mongoose = require('mongoose');
const virtualSetter = require('../VirtualSetter');

/**
 * An article model
 */

const articleRawModel = {
    name: {type: String, required: true},
    authors: [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
    published: String
};

const articleSchema = mongoose.Schema(articleRawModel);
virtualSetter.addId(articleSchema);

/**
 * Module exports an {@link articleSchema} model
 * @type {Model}
 */

module.exports = mongoose.model('Article', articleSchema);
module.exports.raw = articleRawModel;