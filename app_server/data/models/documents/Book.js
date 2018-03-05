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
const virtualSetter = require('../VirtualSetter');

/**
 * A book model
 */

const bookRawModel = Object.assign({}, DocumentParent.raw, {
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
virtualSetter.addId(bookSchema);

/**
 * Module exports a {@link Book} model
 * @type {Book}
 * @public
 */

module.exports = mongoose.model('Book', bookSchema);
module.exports.raw = bookRawModel;