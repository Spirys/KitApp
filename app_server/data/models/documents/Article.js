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

/**
 * An article model
 */

const articleRawModel = {
    name: {type: String, required: true},
    authors: [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
    published: String
};

const articleSchema = mongoose.Schema(articleRawModel);
articleSchema.virtual('id').get(() => {
    let bytes = this._id.valueOf()
        .toString()
        .substring(18);
    return parseInt(bytes, 16);
});

/**
 * Module exports a {@link Book} class
 * @type {Book}
 */

module.exports.models = {
    raw: articleRawModel,
    mongo: mongoose.model('Article', articleSchema)
};