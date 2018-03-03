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
    _id: mongoose.Types.ObjectId,
    name: String,
    authors: [{type: mongoose.Types.ObjectId, ref: 'Author'}],
    published: {type: Date, required: false}
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