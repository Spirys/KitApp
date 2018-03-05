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

/**
 * An article model
 */

class Article {

    /**
     * Constructor for the book object
     * @param name
     * @param authors
     */
    constructor(name, authors, id, innerId) {
        this.name = name;
        this._authors = authors;
        this._id = id;
        this._innerId = innerId;
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

    get id () {
        return this._id;
    }

    get innerId(){
        return this._innerId;
    }

    get published() {
        return this._published;
    }

    set published(published) {
        const valid = validator.validateDate(published);
        if (valid) {
            this._published = published;
        } else {
            throw new TypeError(Errors.TITLE_INVALID);
        }
    }
}

/**
 * Module exports an {@link Article} class
 * @type {Article}
 */

module.exports = Article;