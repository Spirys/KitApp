/*!
 * Article
 * Copyright(c) 2018 Marsel Shaihin
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const Errors = require('../../Errors');
const validator = require('../../validation/SetterValidation.js');
const mongoose = require('mongoose');

/**
 * An article model
 */

class Article {

    /**
     * Constructor for the book object
     * @param name
     * @param authors
     */
    constructor(name, authors) {
        this.name = name;
        this._authors = authors;
    }

    get authors() {
        return this._authors
    }

    set authors(value) {
        this._authors = value
    }

    get name() {
        return this._name
    }

    set name(name) {
        const valid = validator.validateString(name);
        if (valid) {
            this._name = name
        } else {
            throw new TypeError(Errors.TITLE_INVALID)
        }
    }
}

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

module.exports = Book;
module.exports.models = {
    raw: articleRawModel,
    mongo: mongoose.model('Article', articleSchema)
};