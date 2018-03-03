/*!
 * Book
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const DocumentParent = require('./Document');
const mongoose = require('mongoose');

/**
 * A book model
 */

const bookRawModel = Object.assign({}, DocumentParent.models.raw, {
    authors: [{type: mongoose.Schema.ObjectId, ref: 'Author'}],
    cost: Number,
    edition: String,
    isbn: String,
    keywords: [String],
    bestseller: {type: Boolean, default: false},
    description: String,
    image: String,
    publisher: String,
    published: String
});

const bookSchema = mongoose.Schema(bookRawModel);
bookSchema.virtual('id').get(() => {
    let bytes = this._id.valueOf()
        .toString()
        .substring(18);
    return parseInt(bytes, 16);
});

/**
 * Module exports a {@link Book} class
 * @type {Book}
 * @public
 */

module.exports.models = {
    raw: bookRawModel,
    mongo: mongoose.model('Book', bookSchema)
};